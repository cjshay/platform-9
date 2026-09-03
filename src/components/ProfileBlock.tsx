import { Badge } from '@/components/ui/badge'
import type { Profile } from '@/types'

export function ProfileBlock({ profile }: { profile: Profile }) {
  if (!profile.bio && !profile.location && profile.interests.length === 0) return null
  return (
    <div className="mt-2 border-t border-dashed border-line pt-2">
      {profile.location ? <div className="mb-1 font-mono text-xs text-teal">📍 {profile.location}</div> : null}
      {profile.bio ? <div className="font-serif text-sm leading-snug text-text-dim italic">{profile.bio}</div> : null}
      {profile.interests.length > 0 ? (
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          {profile.interests.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
      ) : null}
    </div>
  )
}
