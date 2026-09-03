import { useState } from 'react'
import { Avatar } from '@/components/Avatar'
import { ModalHeader } from '@/components/Modal'
import { btnClass, btnGhostClass, btnSmallClass, inputClass } from '@/components/ui'
import type { Identity } from '@/types'

export function IdentityList({
  identities,
  currentUid,
  onSwitch,
  onAdd,
  onClose,
}: {
  identities: Identity[]
  currentUid: string
  onSwitch: (uid: string) => void
  onAdd: (name: string) => void
  onClose: () => void
}) {
  const [newName, setNewName] = useState('')

  return (
    <>
      <ModalHeader title="your identities" onClose={onClose} />
      <p className="mb-3.5 text-sm leading-relaxed text-text-dim">
        Switch between saved identities to test both sides of a claim — post as one, claim as another, then switch
        back to reply.
      </p>
      <div className="mb-3 grid gap-2">
        {identities.map((identity) => {
          const isActive = identity.uid === currentUid
          return (
            <div
              key={identity.uid}
              className="flex items-center justify-between gap-2.5 rounded bg-ink-softer px-3 py-2.5"
            >
              <div className="flex flex-wrap items-center gap-1.5 font-mono text-sm text-text-dim">
                <Avatar profile={identity} size={18} /> {identity.name}
                {isActive ? <span className="text-amber"> &middot; this is you</span> : null}
              </div>
              {!isActive ? (
                <button
                  type="button"
                  className={`${btnGhostClass} ${btnSmallClass}`}
                  onClick={() => {
                    onSwitch(identity.uid)
                    onClose()
                  }}
                >
                  become this
                </button>
              ) : null}
            </div>
          )
        })}
      </div>
      <hr className="my-4 border-white/10" />
      <div className="grid gap-2.5">
        <input
          className={inputClass}
          placeholder="name for a new identity"
          maxLength={24}
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <button
          type="button"
          className={`${btnClass} ${btnSmallClass}`}
          onClick={() => {
            onAdd(newName)
            onClose()
          }}
        >
          + Add identity
        </button>
      </div>
    </>
  )
}
