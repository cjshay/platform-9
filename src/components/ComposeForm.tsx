import { Plus } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export function ComposeForm({
  onSubmit,
}: {
  onSubmit: (fields: { location: string; whenText: string; description: string; tags: string[] }) => void
}) {
  const [open, setOpen] = useState(false)
  const [location, setLocation] = useState('')
  const [whenText, setWhenText] = useState('')
  const [description, setDescription] = useState('')
  const [tagsRaw, setTagsRaw] = useState('')

  function submit() {
    if (!description.trim()) return
    const tags = tagsRaw
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)
      .slice(0, 6)
    onSubmit({
      location: location.trim(),
      whenText: whenText.trim(),
      description: description.trim().slice(0, 600),
      tags,
    })
    setLocation('')
    setWhenText('')
    setDescription('')
    setTagsRaw('')
    setOpen(false)
  }

  return (
    <details
      open={open}
      onToggle={(e) => setOpen((e.target as HTMLDetailsElement).open)}
      className="mt-7 mb-2 rounded-md border border-line bg-panel p-5"
    >
      <summary className="flex cursor-pointer list-none items-center gap-2.5 font-display text-lg font-semibold tracking-wide text-amber uppercase [&::-webkit-details-marker]:hidden">
        <span
          className="inline-flex h-5.5 w-5.5 items-center justify-center rounded-full border border-amber transition-transform"
          style={{ transform: open ? 'rotate(45deg)' : undefined }}
        >
          <Plus size={13} />
        </span>
        post a missed connection
      </summary>
      <div className="mt-4 grid gap-3">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <Label htmlFor="f-loc">Where</Label>
            <Input id="f-loc" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="northbound 4 train, union sq" />
          </div>
          <div>
            <Label htmlFor="f-when">When</Label>
            <Input id="f-when" value={whenText} onChange={(e) => setWhenText(e.target.value)} placeholder="tue evening, ~6:40pm" />
          </div>
        </div>
        <div>
          <Label htmlFor="f-desc">What happened</Label>
          <Textarea
            id="f-desc"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="you: green jacket, reading a paperback. me: dropped my umbrella, you smiled. wish i'd said something."
          />
        </div>
        <div>
          <Label htmlFor="f-tags">Tags (comma separated, optional)</Label>
          <Input id="f-tags" value={tagsRaw} onChange={(e) => setTagsRaw(e.target.value)} placeholder="subway, morning commute, dog" />
        </div>
        <div>
          <Button onClick={submit}>Post it</Button>
        </div>
      </div>
    </details>
  )
}
