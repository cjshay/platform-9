import { useState } from 'react'
import { Avatar } from '@/components/Avatar'
import { ModalHeader } from '@/components/Modal'
import { ProfileBlock } from '@/components/ProfileBlock'
import { btnClass, btnGhostClass, btnSmallClass, inputClass } from '@/components/ui'
import { timeAgo } from '@/lib/time'
import type { Claim, Post, Profile } from '@/types'

export function PostDetail({
  post,
  authorProfile,
  claims,
  currentUid,
  profileFor,
  onSubmitClaim,
  onOpenThread,
  onClose,
}: {
  post: Post
  authorProfile: Profile
  claims: Claim[]
  currentUid: string
  profileFor: (uid: string, fallbackName?: string) => Profile
  onSubmitClaim: (note: string) => void
  onOpenThread: (claimId: string) => void
  onClose: () => void
}) {
  const [note, setNote] = useState('')
  const isAuthor = post.author_id === currentUid
  const myClaim = claims.find((c) => c.claimant_id === currentUid)

  return (
    <>
      <ModalHeader title={post.location || 'somewhere'} onClose={onClose} />
      <div className="mb-2 flex flex-wrap items-center gap-1.5 font-mono text-xs text-text-dim uppercase">
        <span>{post.when_text}</span> &middot; <span>{timeAgo(post.created_at)}</span> &middot; by{' '}
        <Avatar profile={authorProfile} size={16} /> {authorProfile.name}
      </div>
      <p className="m-0 mb-4 font-serif text-[1.15rem] leading-relaxed italic">{post.description}</p>
      <ProfileBlock profile={authorProfile} />

      {isAuthor ? (
        <>
          <hr className="my-4 border-white/10" />
          <h3 className="mb-2.5 font-display text-base font-semibold tracking-wide text-amber uppercase">
            claims ({claims.length})
          </h3>
          {claims.length === 0 ? (
            <p className="font-mono text-sm text-text-dim">no one has claimed this yet.</p>
          ) : (
            <div className="grid gap-2">
              {claims.map((claim) => {
                const claimantProfile = profileFor(claim.claimant_id, claim.claimant_name)
                return (
                  <div key={claim.id} className="flex items-start justify-between gap-2.5 rounded bg-ink-softer px-3 py-2.5">
                    <div>
                      <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs text-text-dim">
                        <Avatar profile={claimantProfile} size={18} /> {claimantProfile.name} &middot;{' '}
                        {timeAgo(claim.created_at)}
                      </div>
                      <div className="mt-0.5 font-serif text-sm">{claim.note}</div>
                      <ProfileBlock profile={claimantProfile} />
                    </div>
                    <button
                      type="button"
                      className={`${btnGhostClass} ${btnSmallClass} shrink-0`}
                      onClick={() => onOpenThread(claim.id)}
                    >
                      message
                    </button>
                  </div>
                )
              })}
            </div>
          )}
        </>
      ) : myClaim ? (
        <>
          <hr className="my-4 border-white/10" />
          <h3 className="mb-2.5 font-display text-base font-semibold tracking-wide text-amber uppercase">
            your claim
          </h3>
          <div className="flex items-center justify-between gap-2.5 rounded bg-ink-softer px-3 py-2.5">
            <div className="font-serif text-sm">{myClaim.note}</div>
            <button type="button" className={`${btnGhostClass} ${btnSmallClass}`} onClick={() => onOpenThread(myClaim.id)}>
              message
            </button>
          </div>
        </>
      ) : (
        <>
          <hr className="my-4 border-white/10" />
          <h3 className="mb-2.5 font-display text-base font-semibold tracking-wide text-amber uppercase">
            is this you?
          </h3>
          <div className="grid gap-2.5">
            <textarea
              className={inputClass}
              placeholder="prove it — what were you wearing, what did you say..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
            <button
              type="button"
              className={btnClass}
              onClick={() => {
                if (!note.trim()) return
                onSubmitClaim(note.trim().slice(0, 400))
                setNote('')
              }}
            >
              Send claim
            </button>
          </div>
        </>
      )}
    </>
  )
}
