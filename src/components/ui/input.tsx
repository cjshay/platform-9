import { type InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        'w-full rounded border border-line bg-panel-soft px-2.5 py-2 font-serif text-[0.95rem] text-text outline-none placeholder:text-text-dim/60 focus-visible:outline-2 focus-visible:outline-amber',
        className,
      )}
      {...props}
    />
  ),
)
Input.displayName = 'Input'
