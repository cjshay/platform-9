import { type VariantProps, cva } from 'class-variance-authority'
import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

export const buttonVariants = cva(
  'inline-flex cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded font-display font-semibold tracking-wide uppercase transition-colors disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber',
  {
    variants: {
      variant: {
        primary: 'bg-amber text-void hover:bg-amber-dim active:translate-y-px',
        ghost: 'border border-amber bg-transparent text-amber hover:bg-amber/10',
        subtle:
          'border border-line bg-transparent text-text-dim hover:border-amber hover:text-amber',
        destructive: 'bg-rust text-text hover:brightness-110',
      },
      size: {
        default: 'px-4.5 py-2.5 text-sm',
        small: 'px-3 py-1.5 text-xs',
        icon: 'h-8 w-8 p-0 text-base normal-case',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
)

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, type = 'button', ...props }, ref) => (
    <button ref={ref} type={type} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  ),
)
Button.displayName = 'Button'
