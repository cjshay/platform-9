import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { Profile } from '@/types'

const FALLBACK_AVATAR = '🙂'

export function emptyProfile(uid: string, fallbackName?: string, fallbackAvatar?: string): Profile {
  return {
    uid,
    name: fallbackName || 'anon',
    avatar: fallbackAvatar || FALLBACK_AVATAR,
    photo: '',
    bio: '',
    location: '',
    interests: [],
  }
}

export function useProfiles() {
  const [profiles, setProfiles] = useState<Record<string, Profile>>({})

  useEffect(() => {
    let active = true

    async function load() {
      const { data, error } = await supabase.from('profiles').select('*').limit(500)
      if (!active) return
      if (error) {
        // eslint-disable-next-line no-console
        console.error('failed to load profiles', error)
        return
      }
      const map: Record<string, Profile> = {}
      for (const profile of (data ?? []) as Profile[]) {
        map[profile.uid] = profile
      }
      setProfiles(map)
    }
    void load()

    const channel = supabase
      .channel('profiles-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'profiles' }, () => void load())
      .subscribe()

    return () => {
      active = false
      void supabase.removeChannel(channel)
    }
  }, [])

  function profileFor(uid: string, fallbackName?: string, fallbackAvatar?: string): Profile {
    return profiles[uid] ?? emptyProfile(uid, fallbackName, fallbackAvatar)
  }

  return { profiles, profileFor }
}
