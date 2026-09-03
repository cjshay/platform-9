import { AvatarFallback, AvatarImage, AvatarRoot } from '@/components/ui/avatar'

type AvatarSource = {
  avatar: string
  photo: string
}

export function Avatar({ profile, size = 22 }: { profile: AvatarSource; size?: number }) {
  return (
    <AvatarRoot style={{ width: size, height: size }}>
      {profile.photo ? <AvatarImage src={profile.photo} alt="" /> : null}
      <AvatarFallback style={{ fontSize: size * 0.85 }}>{profile.avatar || '🙂'}</AvatarFallback>
    </AvatarRoot>
  )
}
