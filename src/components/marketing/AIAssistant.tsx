'use client'

import React from 'react'
import { Button } from '../ui'

type Role = 'user' | 'assistant'

type ChatMessage = { role: Role; content: string }

export default function AIAssistant() {
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    { role: 'assistant', content: "Ask me anything about Brandon's engineering work, projects, or availability." },
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
    if (!input.trim()) return
    if (isLoading || sessionLimitReached) return

    const userMessage: ChatMessage = { role: 'user', content: input.trim() }
    setMessages((m) => [...m, userMessage])
    setInput('')
    setIsLoading(true)

    // Add placeholder assistant message
    setMessages((m) => [...m, { role: 'assistant', content: '' }])

    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage], sessionId: sessionIdRef.current }),
      })

      if (res.status === 429) {
        const json = await res.json()
        setMessages((m) => [...m, { role: 'assistant', content: json?.error ?? 'Rate limit exceeded' }])
        setIsLoading(false)
        return
      }

      if (!res.body) {
        setMessages((m) => {
          const copy = [...m]
          copy[copy.length - 1] = { role: 'assistant', content: "I'm having trouble responding right now. Please email edogola4@gmail.com directly." }
          return copy
        })
        setIsLoading(false)
        return
      }

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let done = false
      let accumulated = ''

      while (!done) {
        const { value, done: readerDone } = await reader.read()
        if (value) {
          const chunk = decoder.decode(value)
          accumulated += chunk
          // update last assistant message
          setMessages((m) => {
            const copy = [...m]
            copy[copy.length - 1] = { role: 'assistant', content: (copy[copy.length - 1]?.content ?? '') + chunk }
            return copy
          })
        }
        done = readerDone
      }

      setIsLoading(false)
      setSessionMessageCount((c) => c + 1)
    } catch (err) {
      setMessages((m) => {
        const copy = [...m]
        copy[copy.length - 1] = { role: 'assistant', content: "I'm having trouble responding right now. Please email edogola4@gmail.com directly." }
        return copy
      })
      setIsLoading(false)
    }
  }

  return (
    <section aria-label="AI assistant" className="max-w-3xl mx-auto">
      <div role="log" aria-live="polite" aria-label="AI assistant conversation" className="space-y-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`rounded-md p-3 ${m.role === 'user' ? 'bg-neutral-100' : 'bg-neutral-50 font-mono'}`}>
              <div>{m.content}</div>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSubmit} className="mt-4 flex gap-2 items-center">
        <label htmlFor="ai-input" className="sr-only">Message</label>
        <input id="ai-input" value={input} onChange={(e) => setInput(e.target.value)} disabled={isLoading || sessionLimitReached} className="flex-1 rounded-md border-neutral-200" />
        <Button variant="primary" loading={isLoading}>
          <button type="submit" aria-label="Send message">Send</button>
        </Button>
      </form>

      {sessionLimitReached && (
        <p className="mt-2">You've reached the session limit. Email edogola4@gmail.com for direct contact.</p>
      )}
    </section>
  )
}
