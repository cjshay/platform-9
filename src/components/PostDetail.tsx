import { useState } from 'react'
import { Avatar } from '@/components/Avatar'
import { ProfileBlock } from '@/components/ProfileBlock'
import { Button } from '@/components/ui/button'
import { DialogTitle } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
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
}: {
  post: Post
  authorProfile: Profile
  claims: Claim[]
  currentUid: string
  profileFor: (uid: string, fallbackName?: string) => Profile
  onSubmitClaim: (note: string) => void
  onOpenThread: (claimId: string) => void
}) {
  const [note, setNote] = useState('')
  const isAuthor = post.author_id === currentUid
  const myClaim = claims.find((c) => c.claimant_id === currentUid)

  return (
    <>
      <DialogTitle>{post.location || 'somewhere'}</DialogTitle>
      <div className="mb-2 flex flex-wrap items-center gap-1.5 font-mono text-xs text-text-dim uppercase">
        <span>{post.when_text}</span> &middot; <span>{timeAgo(post.created_at)}</span> &middot; by{' '}
        <Avatar profile={authorProfile} size={16} /> {authorProfile.name}
      </div>
      <p className="m-0 mb-4 font-serif text-[1.15rem] leading-relaxed italic">{post.description}</p>
      <ProfileBlock profile={authorProfile} />

      {isAuthor ? (
        <>
          <hr className="my-4 border-line" />
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
                  <div key={claim.id} className="flex items-start justify-between gap-2.5 rounded bg-panel-soft px-3 py-2.5">
                    <div>
                      <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs text-text-dim">
                        <Avatar profile={claimantProfile} size={18} /> {claimantProfile.name} &middot;{' '}
                        {timeAgo(claim.created_at)}
                      </div>
                      <div className="mt-0.5 font-serif text-sm">{claim.note}</div>
                      <ProfileBlock profile={claimantProfile} />
                    </div>
                    <Button variant="ghost" size="small" className="shrink-0" onClick={() => onOpenThread(claim.id)}>
                      message
                    </Button>
                  </div>
                )
              })}
            </div>
          )}
        </>
      ) : myClaim ? (
        <>
          <hr className="my-4 border-line" />
          <h3 className="mb-2.5 font-display text-base font-semibold tracking-wide text-amber uppercase">
            your claim
          </h3>
          <div className="flex items-center justify-between gap-2.5 rounded bg-panel-soft px-3 py-2.5">
            <div className="font-serif text-sm">{myClaim.note}</div>
            <Button variant="ghost" size="small" onClick={() => onOpenThread(myClaim.id)}>
              message
            </Button>
          </div>
        </>
      ) : (
        <>
          <hr className="my-4 border-line" />
          <h3 className="mb-2.5 font-display text-base font-semibold tracking-wide text-amber uppercase">
            is this you?
          </h3>
          <div className="grid gap-2.5">
            <Textarea
              placeholder="prove it — what were you wearing, what did you say..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
            <Button
              onClick={() => {
                if (!note.trim()) return
                onSubmitClaim(note.trim().slice(0, 400))
                setNote('')
              }}
            >
              Send claim
            </Button>
          </div>
        </>
      )}
    </>
  )
}
