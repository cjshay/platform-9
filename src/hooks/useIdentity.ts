import { useCallback, useEffect, useState } from 'react'
import { createIdentity, ensureIdentities, getActiveUid, saveIdentities, setActiveUid } from '@/lib/identity'
import { supabase } from '@/lib/supabase'
import type { Identity } from '@/types'

async function syncProfile(identity: Identity): Promise<void> {
  const { error } = await supabase.from('profiles').upsert({
    uid: identity.uid,
    name: identity.name,
    avatar: identity.avatar,
    photo: identity.photo,
    bio: identity.bio,
    location: identity.location,
    interests: identity.interests,
    updated_at: new Date().toISOString(),
  })
  if (error) {
    // eslint-disable-next-line no-console
    console.error('profile sync failed', error)
  }
}

/** Manages the browser-local "identity" a person is currently posting as.
 * There's no real auth yet — each identity is a self-issued uid kept in
 * localStorage, mirrored to the `profiles` table so other viewers can see it. */
export function useIdentity() {
  const [identities, setIdentities] = useState<Identity[]>([])
  const [current, setCurrent] = useState<Identity | null>(null)

  useEffect(() => {
    const list = ensureIdentities()
    const activeUid = getActiveUid()
    const active = list.find((i) => i.uid === activeUid) ?? list[0]
    setIdentities(list)
    setCurrent(active)
    setActiveUid(active.uid)
    void syncProfile(active)
  }, [])

  const updateProfile = useCallback(
    (fields: Partial<Omit<Identity, 'uid'>>) => {
      if (!current) return
      const updated: Identity = { ...current, ...fields }
      setIdentities((list) => {
        const next = list.map((i) => (i.uid === updated.uid ? updated : i))
        saveIdentities(next)
        return next
      })
      setCurrent(updated)
      void syncProfile(updated)
    },
    [current],
  )

  const switchTo = useCallback(
    (uid: string) => {
      setIdentities((list) => {
        const found = list.find((i) => i.uid === uid)
        if (found) {
          setActiveUid(found.uid)
          setCurrent(found)
          void syncProfile(found)
        }
        return list
      })
    },
    [],
  )

  const addIdentity = useCallback((name: string) => {
    const created = createIdentity(name)
    setIdentities((list) => {
      const next = [...list, created]
      saveIdentities(next)
      return next
    })
    setActiveUid(created.uid)
    setCurrent(created)
    void syncProfile(created)
    return created
  }, [])

  return { identities, current, updateProfile, switchTo, addIdentity }
}
