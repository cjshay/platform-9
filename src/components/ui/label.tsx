import * as LabelPrimitive from '@radix-ui/react-label'
import { type ComponentPropsWithoutRef, type ComponentRef, forwardRef } from 'react'
import { cn } from '@/lib/utils'

export const Label = forwardRef<
  ComponentRef<typeof LabelPrimitive.Root>,
  ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn('mb-1 block font-mono text-[0.68rem] tracking-wide text-text-dim uppercase', className)}
    {...props}
  />
))
Label.displayName = 'Label'
