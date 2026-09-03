import type { Filter } from '@/types'

const OPTIONS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'all' },
  { value: 'mine', label: 'my posts' },
  { value: 'claimed', label: 'claims on mine' },
]

export function Filters({ value, onChange }: { value: Filter; onChange: (filter: Filter) => void }) {
  return (
    <div className="mt-5.5 mb-1.5 flex flex-wrap gap-2.5 font-mono text-xs tracking-wide uppercase">
      {OPTIONS.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`cursor-pointer rounded-full border px-3 py-1.5 ${
            value === opt.value ? 'border-amber text-amber' : 'border-white/10 text-text-dim'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
