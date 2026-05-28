'use client'

import React from 'react'

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

      {/* Chat window */}
      <div className="max-w-2xl border border-neutral-200 rounded-xl overflow-hidden shadow-sm">

        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 bg-neutral-900 border-b border-neutral-800">
          <div className="w-8 h-8 rounded-full bg-neutral-700 flex items-center justify-center shrink-0">
            <span className="text-xs font-semibold text-white" aria-hidden="true">B</span>
          </div>
          <div>
            <div className="text-sm font-medium text-white leading-none">Brandon&apos;s Assistant</div>
            <div className="text-xs text-neutral-400 mt-0.5">Answers questions about my work</div>
          </div>
          <div className="ml-auto flex items-center gap-1.5" aria-hidden="true">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-xs text-neutral-400">Online</span>
          </div>
        </div>

        {/* Message area */}
        <div
          role="log"
          aria-live="polite"
          aria-label="Conversation with AI assistant"
          className="h-80 overflow-y-auto px-4 py-4 space-y-3 bg-white"
        >
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex items-end gap-2 ${
                m.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {/* Assistant avatar */}
              {m.role === 'assistant' && (
                <div className="w-6 h-6 rounded-full bg-neutral-900 flex items-center justify-center shrink-0 mb-0.5">
                  <span className="text-[10px] font-semibold text-white" aria-hidden="true">B</span>
                </div>
              )}

              <div
                className={`rounded-2xl px-4 py-2.5 text-sm max-w-[75%] leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-neutral-900 text-white rounded-br-sm'
                    : 'bg-neutral-100 text-neutral-800 rounded-bl-sm'
                }`}
              >
                {m.content}
                {m.content === '' && isLoading && (
                  <span className="inline-flex gap-1" aria-label="Thinking">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-bounce [animation-delay:0ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-bounce [animation-delay:150ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-bounce [animation-delay:300ms]" />
                  </span>
                )}
              </div>

              {/* User avatar */}
              {m.role === 'user' && (
                <div className="w-6 h-6 rounded-full bg-neutral-300 flex items-center justify-center shrink-0 mb-0.5">
                  <span className="text-[10px] font-semibold text-neutral-700" aria-hidden="true">You</span>
                </div>
              )}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input row */}
        <div className="px-4 py-3 bg-white border-t border-neutral-100">
          <form onSubmit={handleSubmit} className="flex gap-2 items-center">
            <label htmlFor="ai-input" className="sr-only">Message</label>
            <input
              id="ai-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading || sessionLimitReached}
              placeholder={sessionLimitReached ? 'Session limit reached' : 'Ask about my work, stack, or availability…'}
              className="flex-1 rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isLoading || sessionLimitReached || !input.trim()}
              aria-label="Send message"
              className="w-9 h-9 rounded-full bg-neutral-900 flex items-center justify-center shrink-0 disabled:opacity-40 hover:bg-neutral-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
            >
              {isLoading ? (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" aria-hidden="true" />
              ) : (
                <svg className="w-4 h-4 text-white" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M14 8L2 2l3 6-3 6 12-6z" fill="currentColor" />
                </svg>
              )}
            </button>
          </form>

          {sessionLimitReached && (
            <p className="mt-2 text-xs text-neutral-400 text-center">
              Session limit reached.{' '}
              <a href="mailto:edogola4@gmail.com" className="underline hover:text-neutral-600">Email directly</a>.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
