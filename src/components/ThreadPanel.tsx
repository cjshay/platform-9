import { useState } from 'react'
import { Avatar } from '@/components/Avatar'
import { ModalHeader } from '@/components/Modal'
import { btnClass, btnSmallClass, inputClass } from '@/components/ui'
import { useThread } from '@/hooks/useThread'
import type { Claim, Post, Profile } from '@/types'

export function ThreadPanel({
  claim,
  post,
  currentUid,
  otherProfile,
  onClose,
}: {
  claim: Claim
  post: Post | undefined
  currentUid: string
  otherProfile: Profile
  onClose: () => void
}) {
  const { thread, sendMessage } = useThread(claim.id)
  const [text, setText] = useState('')
  const messages = thread?.messages ?? []

  function send() {
    const trimmed = text.trim()
    if (!trimmed) return
    setText('')
    const participants = [claim.claimant_id, post?.author_id].filter((v): v is string => Boolean(v))
    void sendMessage(currentUid, trimmed.slice(0, 500), claim.post_id, participants)
  }

  return (
    <>
      <ModalHeader
        title={
          <span className="inline-flex items-center gap-1.5">
            message &middot; <Avatar profile={otherProfile} size={18} /> {otherProfile.name}
          </span>
        }
        onClose={onClose}
      />
      <div className="mb-2.5 flex max-h-65 flex-col gap-2 overflow-y-auto pr-1">
        {messages.length === 0 ? (
          <div className="font-mono text-xs text-text-dim">no messages yet — say hi.</div>
        ) : (
          messages.map((m, i) => (
            <div
              key={i}
              className={`max-w-[80%] rounded-lg px-2.75 py-2 text-sm leading-snug ${
                m.from === currentUid ? 'self-end bg-amber text-[#1a1406]' : 'self-start bg-ink-softer'
              }`}
            >
              <span className="mb-0.5 block font-mono text-[0.62rem] uppercase opacity-70">
                {m.from === currentUid ? 'you' : otherProfile.name}
              </span>
              {m.text}
            </div>
          ))
        )}
      </div>
      <div className="flex gap-2">
        <input
          className={`${inputClass} flex-1`}
          placeholder="type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') send()
          }}
        />
        <button type="button" className={`${btnClass} ${btnSmallClass}`} onClick={send}>
          Send
        </button>
      </div>
    </>
  )
}
