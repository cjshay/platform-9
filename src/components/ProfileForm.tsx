import { useState } from 'react'
import { Avatar } from '@/components/Avatar'
import { ModalHeader } from '@/components/Modal'
import { btnClass, btnGhostClass, btnSmallClass, inputClass, labelClass } from '@/components/ui'
import { resizeImageToDataUrl } from '@/lib/image'
import type { Identity } from '@/types'

export function ProfileForm({
  identity,
  onSave,
  onClose,
  onError,
}: {
  identity: Identity
  onSave: (fields: Partial<Omit<Identity, 'uid'>>) => void
  onClose: () => void
  onError: (message: string) => void
}) {
  const [avatar, setAvatar] = useState(identity.avatar)
  const [photo, setPhoto] = useState(identity.photo)
  const [name, setName] = useState(identity.name === 'anon' ? '' : identity.name)
  const [bio, setBio] = useState(identity.bio)
  const [location, setLocation] = useState(identity.location)
  const [interestsRaw, setInterestsRaw] = useState(identity.interests.join(', '))

  async function handlePhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      onError('please choose an image file')
      return
    }
    try {
      const dataUrl = await resizeImageToDataUrl(file, 128)
      setPhoto(dataUrl)
    } catch {
      onError('could not read that image')
    }
  }

  function submit() {
    const interests = interestsRaw
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)
      .slice(0, 8)
    onSave({ name, avatar, photo, bio, location, interests })
    onClose()
  }

  return (
    <>
      <ModalHeader title="edit your profile" onClose={onClose} />
      <p className="mb-3.5 text-sm text-text-dim">
        Shown to people you claim or get claimed by — helps them recognize you.
      </p>
      <div className="grid gap-3">
        <div className="flex items-center gap-3.5">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-ink-softer">
            <Avatar profile={{ avatar, photo }} size={44} />
          </div>
          <div className="flex-1">
            <label className={labelClass} htmlFor="pf-photo">
              Photo (optional, replaces avatar)
            </label>
            <input type="file" id="pf-photo" accept="image/*" onChange={handlePhoto} className="text-sm" />
            {photo ? (
              <button
                type="button"
                className={`${btnGhostClass} ${btnSmallClass} mt-1.5 block`}
                onClick={() => setPhoto('')}
              >
                Remove photo
              </button>
            ) : null}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="pf-avatar">
              Emoji avatar (used if no photo)
            </label>
            <input id="pf-avatar" className={inputClass} value={avatar} maxLength={4} onChange={(e) => setAvatar(e.target.value)} />
          </div>
          <div>
            <label className={labelClass} htmlFor="pf-name">
              Name
            </label>
            <input
              id="pf-name"
              className={inputClass}
              value={name}
              maxLength={24}
              placeholder="your handle"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div>
          <label className={labelClass} htmlFor="pf-bio">
            Say something about yourself
          </label>
          <textarea
            id="pf-bio"
            className={inputClass}
            maxLength={140}
            value={bio}
            placeholder="grad student, into climbing and bad puns"
            onChange={(e) => setBio(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="pf-location">
              General location
            </label>
            <input
              id="pf-location"
              className={inputClass}
              value={location}
              placeholder="brooklyn, near prospect park"
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="pf-interests">
              Interests (comma separated)
            </label>
            <input
              id="pf-interests"
              className={inputClass}
              value={interestsRaw}
              placeholder="climbing, jazz, dogs"
              onChange={(e) => setInterestsRaw(e.target.value)}
            />
          </div>
        </div>
        <button type="button" className={btnClass} onClick={submit}>
          Save profile
        </button>
      </div>
    </>
  )
}
