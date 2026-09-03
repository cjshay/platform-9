import { Avatar } from '@/components/Avatar'
import { Badge } from '@/components/ui/badge'
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
    <button
      type="button"
      onClick={onOpen}
      className="group grid w-full cursor-pointer grid-cols-[auto_1fr] items-start gap-x-4 gap-y-1 border-b border-line py-4 pl-3 text-left transition-colors hover:border-amber/40 sm:grid-cols-[64px_1fr_auto]"
    >
      <span className="row-span-2 self-start pt-1 font-mono text-[0.7rem] tracking-wide text-amber uppercase sm:block">
        {timeAgo(post.created_at)}
      </span>

      <div className="col-start-2 sm:col-start-2">
        <div className="mb-1 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs text-text-dim uppercase">
          <span className="text-teal">{post.location || 'somewhere'}</span>
          {post.when_text ? (
            <>
              <span className="opacity-40">&middot;</span>
              <span>{post.when_text}</span>
            </>
          ) : null}
        </div>
        <p className="m-0 font-serif text-[1.05rem] leading-snug italic transition-colors group-hover:text-amber">
          {post.description}
        </p>
        {post.tags.length > 0 ? (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        ) : null}
      </div>

      <div className="col-start-2 flex items-center gap-3 pt-1 sm:col-start-3 sm:flex-col sm:items-end sm:pt-0">
        <span className="inline-flex items-center gap-1.5 font-mono text-xs text-text-dim">
          <Avatar profile={authorProfile} size={16} /> {authorProfile.name}
        </span>
        <Badge variant={claimCount ? 'amber' : 'default'} className={claimCount ? '' : 'opacity-40'}>
          {claimCount ? `${claimCount} claim${claimCount > 1 ? 's' : ''}` : 'no claims'}
        </Badge>
      </div>
    </button>
  )
}
