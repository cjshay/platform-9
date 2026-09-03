import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { Claim } from '@/types'

export function useClaims() {
  const [claimsByPost, setClaimsByPost] = useState<Record<string, Claim[]>>({})

  useEffect(() => {
    let active = true

    async function load() {
      const { data, error } = await supabase.from('claims').select('*').limit(500)
      if (!active) return
      if (error) {
        // eslint-disable-next-line no-console
        console.error('failed to load claims', error)
        return
      }
      const map: Record<string, Claim[]> = {}
      for (const claim of (data ?? []) as Claim[]) {
        const list = map[claim.post_id] ?? []
        list.push(claim)
        map[claim.post_id] = list
      }
      setClaimsByPost(map)
    }
    void load()

    const channel = supabase
      .channel('claims-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'claims' }, () => void load())
      .subscribe()

    return () => {
      active = false
      void supabase.removeChannel(channel)
    }
  }, [])

  return claimsByPost
}
