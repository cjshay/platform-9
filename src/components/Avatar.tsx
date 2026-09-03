type AvatarSource = {
  avatar: string
  photo: string
}

export function Avatar({ profile, size = 22 }: { profile: AvatarSource; size?: number }) {
  if (profile.photo) {
    return (
      <img
        src={profile.photo}
        alt=""
        className="inline-block rounded-full object-cover align-middle"
        style={{ width: size, height: size }}
      />
    )
  }
  return (
    <span className="inline-flex items-center justify-center leading-none" style={{ fontSize: size * 0.85 }}>
      {profile.avatar || '🙂'}
    </span>
  )
}
