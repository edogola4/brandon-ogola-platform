'use client'

import React from 'react'
import { Button } from '../ui'

type Role = 'user' | 'assistant'
type ChatMessage = { id: string; role: Role; content: string }

function makeId() {
  return Math.random().toString(36).slice(2)
}

export default function AIAssistant() {
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    { id: 'init', role: 'assistant', content: "Ask me anything about Brandon's engineering work, projects, or availability." },
  ])
  const [input, setInput] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const [sessionMessageCount, setSessionMessageCount] = React.useState(0)
  const sessionIdRef = React.useRef<string>(crypto.randomUUID())
  const bottomRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sessionLimitReached = sessionMessageCount >= 10

  async function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault()
    if (!input.trim() || isLoading || sessionLimitReached) return

    const userMessage: ChatMessage = { id: makeId(), role: 'user', content: input.trim() }
    const placeholderId = makeId()
    setMessages((m) => [...m, userMessage, { id: placeholderId, role: 'assistant', content: '' }])
    setInput('')
    setIsLoading(true)

    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(({ role, content }) => ({ role, content })),
          sessionId: sessionIdRef.current,
        }),
      })

      if (res.status === 429) {
        const json = await res.json() as { error?: string }
        setMessages((m) => m.map((msg) =>
          msg.id === placeholderId
            ? { ...msg, content: json.error ?? 'Rate limit reached. Try again later.' }
            : msg
        ))
        setIsLoading(false)
        return
      }

      if (!res.body) {
        setMessages((m) => m.map((msg) =>
          msg.id === placeholderId
            ? { ...msg, content: "I'm having trouble responding right now. Email edogola4@gmail.com directly." }
            : msg
        ))
        setIsLoading(false)
        return
      }

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let done = false

      while (!done) {
        const { value, done: readerDone } = await reader.read()
        if (value) {
          const chunk = decoder.decode(value)
          setMessages((m) => m.map((msg) =>
            msg.id === placeholderId
              ? { ...msg, content: msg.content + chunk }
              : msg
          ))
        }
        done = readerDone
      }

      setSessionMessageCount((c) => c + 1)
    } catch {
      setMessages((m) => m.map((msg) =>
        msg.id === placeholderId
          ? { ...msg, content: "I'm having trouble responding right now. Email edogola4@gmail.com directly." }
          : msg
      ))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section
      aria-labelledby="ai-heading"
      className="max-w-6xl mx-auto px-4 py-12 border-b border-neutral-100"
    >
      <h2
        id="ai-heading"
        className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-6"
      >
        Ask me anything
      </h2>

      <div className="max-w-2xl">
        <div
          role="log"
          aria-live="polite"
          aria-label="Conversation with AI assistant"
          className="space-y-3"
        >
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${
                m.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`rounded-md px-4 py-2.5 text-sm max-w-prose leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-neutral-900 text-white'
                    : 'bg-neutral-100 text-neutral-800'
                }`}
              >
                {m.content}
                {m.content === '' && isLoading && (
                  <span className="inline-flex gap-1 ml-1" aria-label="Thinking">
                    <span className="w-1 h-1 rounded-full bg-neutral-400 animate-bounce [animation-delay:0ms]" />
                    <span className="w-1 h-1 rounded-full bg-neutral-400 animate-bounce [animation-delay:150ms]" />
                    <span className="w-1 h-1 rounded-full bg-neutral-400 animate-bounce [animation-delay:300ms]" />
                  </span>
                )}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
          <label htmlFor="ai-input" className="sr-only">Message</label>
          <input
            id="ai-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading || sessionLimitReached}
            placeholder="Ask about my work, stack, or availability…"
            className="flex-1 rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent disabled:opacity-50"
          />
          <Button type="submit" variant="primary" size="sm" loading={isLoading}>
            Send
          </Button>
        </form>

        {sessionLimitReached && (
          <p className="mt-3 text-xs text-neutral-500">
            Session limit reached.{' '}
            <a href="mailto:edogola4@gmail.com" className="underline">Email directly</a>{' '}
            for further questions.
          </p>
        )}
      </div>
    </section>
  )
}
