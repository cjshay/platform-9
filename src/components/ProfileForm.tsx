import { type ChangeEvent, useState } from 'react'
import { Avatar } from '@/components/Avatar'
import { Button } from '@/components/ui/button'
import { DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
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

  async function handlePhoto(e: ChangeEvent<HTMLInputElement>) {
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
      <DialogTitle>edit your profile</DialogTitle>
      <DialogDescription>Shown to people you claim or get claimed by — helps them recognize you.</DialogDescription>
      <div className="grid gap-3">
        <div className="flex items-center gap-3.5">
          <div className="h-16 w-16 shrink-0 rounded-full bg-panel-soft">
            <Avatar profile={{ avatar, photo }} size={64} />
          </div>
          <div className="flex-1">
            <Label htmlFor="pf-photo">Photo (optional, replaces avatar)</Label>
            <input type="file" id="pf-photo" accept="image/*" onChange={handlePhoto} className="text-sm" />
            {photo ? (
              <Button type="button" variant="ghost" size="small" className="mt-1.5 block" onClick={() => setPhoto('')}>
                Remove photo
              </Button>
            ) : null}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <Label htmlFor="pf-avatar">Emoji avatar (used if no photo)</Label>
            <Input id="pf-avatar" value={avatar} maxLength={4} onChange={(e) => setAvatar(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="pf-name">Name</Label>
            <Input id="pf-name" value={name} maxLength={24} placeholder="your handle" onChange={(e) => setName(e.target.value)} />
          </div>
        </div>
        <div>
          <Label htmlFor="pf-bio">Say something about yourself</Label>
          <Textarea
            id="pf-bio"
            maxLength={140}
            value={bio}
            placeholder="grad student, into climbing and bad puns"
            onChange={(e) => setBio(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <Label htmlFor="pf-location">General location</Label>
            <Input
              id="pf-location"
              value={location}
              placeholder="brooklyn, near prospect park"
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="pf-interests">Interests (comma separated)</Label>
            <Input
              id="pf-interests"
              value={interestsRaw}
              placeholder="climbing, jazz, dogs"
              onChange={(e) => setInterestsRaw(e.target.value)}
            />
          </div>
        </div>
        <Button onClick={submit}>Save profile</Button>
      </div>
    </>
  )
}
