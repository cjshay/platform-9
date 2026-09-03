import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { Thread, ThreadMessage } from '@/types'

export function useThread(claimId: string | null) {
  const [thread, setThread] = useState<Thread | null>(null)

  useEffect(() => {
    if (!claimId) {
      setThread(null)
      return
    }
    let active = true

    async function load() {
      const { data, error } = await supabase.from('threads').select('*').eq('claim_id', claimId).maybeSingle()
      if (!active) return
      if (error) {
        // eslint-disable-next-line no-console
        console.error('failed to load thread', error)
        return
      }
      setThread((data as Thread | null) ?? null)
    }
    void load()

    const channel = supabase
      .channel(`thread-${claimId}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'threads', filter: `claim_id=eq.${claimId}` },
        () => void load(),
      )
      .subscribe()

    return () => {
      active = false
      void supabase.removeChannel(channel)
    }
  }, [claimId])

  async function sendMessage(fromUid: string, text: string, postId: string, participants: string[]) {
    if (!claimId) return
    const message: ThreadMessage = { from: fromUid, text, ts: Date.now() }
    const messages = [...(thread?.messages ?? []), message]
    const { error } = await supabase
      .from('threads')
      .upsert({ claim_id: claimId, post_id: postId, participants, messages }, { onConflict: 'claim_id' })
    if (error) {
      // eslint-disable-next-line no-console
      console.error('failed to send message', error)
    }
  }

  return { thread, sendMessage }
}
