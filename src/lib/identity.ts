import type { Identity } from '@/types'

const IDENTITIES_KEY = 'p9_identities'
const ACTIVE_UID_KEY = 'p9_active_uid'

function defaultIdentity(name = 'anon'): Identity {
  return {
    uid: crypto.randomUUID(),
    name,
    avatar: '🙂',
    photo: '',
    bio: '',
    location: '',
    interests: [],
  }
}

export function loadIdentities(): Identity[] {
  try {
    const raw = localStorage.getItem(IDENTITIES_KEY)
    return raw ? (JSON.parse(raw) as Identity[]) : []
  } catch {
    return []
  }
}

export function saveIdentities(identities: Identity[]): void {
  try {
    localStorage.setItem(IDENTITIES_KEY, JSON.stringify(identities))
  } catch {
    // localStorage unavailable — identities just won't persist across reloads
  }
}

export function getActiveUid(): string | null {
  try {
    return localStorage.getItem(ACTIVE_UID_KEY)
  } catch {
    return null
  }
}

export function setActiveUid(uid: string): void {
  try {
    localStorage.setItem(ACTIVE_UID_KEY, uid)
  } catch {
    // ignore
  }
}

/** Loads saved identities, creating a first one if none exist yet. */
export function ensureIdentities(): Identity[] {
  const existing = loadIdentities()
  if (existing.length > 0) return existing
  const created = [defaultIdentity()]
  saveIdentities(created)
  return created
}

export function createIdentity(name: string): Identity {
  return defaultIdentity(name.trim() || 'anon')
}
