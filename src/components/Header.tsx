import { Avatar } from '@/components/Avatar'
import { Button } from '@/components/ui/button'
import type { Identity } from '@/types'

export function Header({
  identity,
  onOpenProfile,
  onOpenIdentities,
}: {
  identity: Identity | null
  onOpenProfile: () => void
  onOpenIdentities: () => void
}) {
  return (
    <header className="border-b-2 border-amber bg-gradient-to-b from-panel to-transparent px-5 pt-7 pb-4.5">
      <div className="mx-auto flex max-w-[920px] flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="m-0 font-display text-4xl font-bold tracking-wide uppercase text-balance sm:text-5xl">
            <span className="text-text">Platform</span> <span className="text-amber">9</span>
          </h1>
          <div className="mt-1 font-mono text-xs tracking-wide text-text-dim uppercase">
            missed connections &middot; say it now, not never
          </div>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs text-text-dim">
          {identity ? <Avatar profile={identity} size={22} /> : null}
          <span>{identity?.name ?? 'anon'}</span>
          <Button variant="subtle" size="small" className="normal-case" onClick={onOpenProfile}>
            profile
          </Button>
          <Button
            variant="subtle"
            size="small"
            className="normal-case"
            onClick={onOpenIdentities}
            title="switch between saved test identities"
          >
            identities
          </Button>
        </div>
      </div>
    </header>
  )
}
