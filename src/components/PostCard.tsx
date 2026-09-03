import { Avatar } from '@/components/Avatar'
import { timeAgo } from '@/lib/time'
import type { Post, Profile } from '@/types'

export function PostCard({
  post,
  authorProfile,
  claimCount,
  onOpen,
}: {
  post: Post
  authorProfile: Profile
  claimCount: number
  onOpen: () => void
}) {
  return (
    <article
      onClick={onOpen}
      className="relative cursor-pointer rounded-md border border-amber/20 bg-ink-soft p-5 shadow-lg transition-transform hover:-translate-y-0.5 hover:border-amber"
    >
      <span className="absolute -top-1.5 left-6 h-3.5 w-3.5 rounded-full bg-amber shadow-md" />
      <div className="mb-2 flex flex-wrap gap-2.5 font-mono text-xs tracking-wide text-text-dim uppercase">
        <span className="inline-flex items-center gap-1.5">
          <Avatar profile={authorProfile} size={16} /> {authorProfile.name}
        </span>
        <span className="text-teal">{post.location || 'somewhere'}</span>
        <span>{post.when_text}</span>
        <span>{timeAgo(post.created_at)}</span>
      </div>
      <p className="m-0 mb-2.5 font-serif text-[1.05rem] leading-relaxed italic">{post.description}</p>
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded border border-white/10 px-1.75 py-0.5 font-mono text-[0.65rem] text-text-dim uppercase"
            >
              {tag}
            </span>
          ))}
        </div>
        <span className={`font-mono text-xs ${claimCount ? 'text-amber' : 'text-text-dim opacity-40'}`}>
          {claimCount ? `${claimCount} claim${claimCount > 1 ? 's' : ''}` : 'no claims yet'}
        </span>
      </div>
    </article>
  )
}
