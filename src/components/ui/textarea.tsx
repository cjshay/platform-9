import { type TextareaHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        'min-h-17.5 w-full resize-y rounded border border-line bg-panel-soft px-2.5 py-2 font-serif text-[0.95rem] text-text outline-none placeholder:text-text-dim/60 focus-visible:outline-2 focus-visible:outline-amber',
        className,
      )}
      {...props}
    />
  ),
)
Textarea.displayName = 'Textarea'
