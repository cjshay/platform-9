import { useState } from 'react'
import { Avatar } from '@/components/Avatar'
import { Button } from '@/components/ui/button'
import { DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
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
      <DialogTitle>your identities</DialogTitle>
      <DialogDescription>
        Switch between saved identities to test both sides of a claim — post as one, claim as another, then switch
        back to reply.
      </DialogDescription>
      <div className="mb-3 grid gap-2">
        {identities.map((identity) => {
          const isActive = identity.uid === currentUid
          return (
            <div key={identity.uid} className="flex items-center justify-between gap-2.5 rounded bg-panel-soft px-3 py-2.5">
              <div className="flex flex-wrap items-center gap-1.5 font-mono text-sm text-text-dim">
                <Avatar profile={identity} size={18} /> {identity.name}
                {isActive ? <span className="text-amber"> &middot; this is you</span> : null}
              </div>
              {!isActive ? (
                <Button
                  variant="ghost"
                  size="small"
                  onClick={() => {
                    onSwitch(identity.uid)
                    onClose()
                  }}
                >
                  become this
                </Button>
              ) : null}
            </div>
          )
        })}
      </div>
      <hr className="my-4 border-line" />
      <div className="grid gap-2.5">
        <Input placeholder="name for a new identity" maxLength={24} value={newName} onChange={(e) => setNewName(e.target.value)} />
        <Button
          size="small"
          onClick={() => {
            onAdd(newName)
            onClose()
          }}
        >
          + Add identity
        </Button>
      </div>
    </>
  )
}
