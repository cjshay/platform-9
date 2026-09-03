import * as AvatarPrimitive from '@radix-ui/react-avatar'
import { type ComponentPropsWithoutRef, type ComponentRef, forwardRef } from 'react'
import { cn } from '@/lib/utils'

export const AvatarRoot = forwardRef<
  ComponentRef<typeof AvatarPrimitive.Root>,
  ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn('relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full', className)}
    {...props}
  />
))
AvatarRoot.displayName = 'AvatarRoot'

export const AvatarImage = forwardRef<
  ComponentRef<typeof AvatarPrimitive.Image>,
  ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image ref={ref} className={cn('h-full w-full object-cover', className)} {...props} />
))
AvatarImage.displayName = 'AvatarImage'

export const AvatarFallback = forwardRef<
  ComponentRef<typeof AvatarPrimitive.Fallback>,
  ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn('flex h-full w-full items-center justify-center bg-panel-soft leading-none', className)}
    {...props}
  />
))
AvatarFallback.displayName = 'AvatarFallback'
