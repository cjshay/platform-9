import { PostCard } from '@/components/PostCard'
import type { Claim, Filter, Post, Profile } from '@/types'

export function Feed({
  posts,
  currentUid,
  filter,
  claimsByPost,
  profileFor,
  onOpenPost,
}: {
  posts: Post[]
  currentUid: string | null
  filter: Filter
  claimsByPost: Record<string, Claim[]>
  profileFor: (uid: string, fallbackName?: string) => Profile
  onOpenPost: (id: string) => void
}) {
  const list = posts
    .filter((p) => {
      if (filter === 'mine') return p.author_id === currentUid
      if (filter === 'claimed') return p.author_id === currentUid && (claimsByPost[p.id]?.length ?? 0) > 0
      return true
    })
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

  if (list.length === 0) {
    return (
      <div className="mt-4.5 py-15 text-center font-mono text-sm text-text-dim">
        nothing posted here yet{filter !== 'all' ? ' — try "all"' : '. be the first to say something.'}
      </div>
    )
  }

  return (
    <div className="mt-4.5 grid gap-4">
      {list.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          authorProfile={profileFor(post.author_id, post.author_name)}
          claimCount={claimsByPost[post.id]?.length ?? 0}
          onOpen={() => onOpenPost(post.id)}
        />
      ))}
    </div>
  )
}
