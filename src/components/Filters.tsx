import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { Filter } from '@/types'

const OPTIONS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'all' },
  { value: 'mine', label: 'my posts' },
  { value: 'claimed', label: 'claims on mine' },
]

export function Filters({ value, onChange }: { value: Filter; onChange: (filter: Filter) => void }) {
  return (
    <Tabs value={value} onValueChange={(v) => onChange(v as Filter)} className="mt-5.5 mb-1.5">
      <TabsList>
        {OPTIONS.map((opt) => (
          <TabsTrigger key={opt.value} value={opt.value}>
            {opt.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}
