import * as TabsPrimitive from '@radix-ui/react-tabs'
import { type ComponentPropsWithoutRef, type ComponentRef, forwardRef } from 'react'
import { cn } from '@/lib/utils'

export const Tabs = TabsPrimitive.Root

export const TabsList = forwardRef<
  ComponentRef<typeof TabsPrimitive.List>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn('flex flex-wrap gap-2.5 font-mono text-xs tracking-wide uppercase', className)}
    {...props}
  />
))
TabsList.displayName = 'TabsList'

export const TabsTrigger = forwardRef<
  ComponentRef<typeof TabsPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'cursor-pointer rounded-full border border-line px-3 py-1.5 text-text-dim transition-colors',
      'data-[state=active]:border-amber data-[state=active]:text-amber',
      className,
    )}
    {...props}
  />
))
TabsTrigger.displayName = 'TabsTrigger'
