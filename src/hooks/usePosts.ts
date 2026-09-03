import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { Post } from '@/types'

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    async function load() {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(200)
      if (!active) return
      if (error) {
        // eslint-disable-next-line no-console
        console.error('failed to load posts', error)
      } else {
        setPosts((data ?? []) as Post[])
      }
      setLoading(false)
    }
    void load()

    const channel = supabase
      .channel('posts-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'posts' }, () => void load())
      .subscribe()

    return () => {
      active = false
      void supabase.removeChannel(channel)
    }
  }, [])

  return { posts, loading }
}
