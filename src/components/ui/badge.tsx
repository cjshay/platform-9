import { type VariantProps, cva } from 'class-variance-authority'
import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

const badgeVariants = cva('inline-flex items-center rounded border px-1.75 py-0.5 font-mono text-[0.65rem] uppercase', {
  variants: {
    variant: {
      default: 'border-line text-text-dim',
      amber: 'border-amber/40 text-amber',
      teal: 'border-teal/40 text-teal',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export function Badge({
  className,
  variant,
  ...props
}: HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}
