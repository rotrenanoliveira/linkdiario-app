'use client'

import { cn } from '@/lib/utils'
import { Slot } from '@radix-ui/react-slot'
import { useFormStatus } from 'react-dom'
import { ButtonProps, buttonVariants } from './ui/button'
import React from 'react'
import { Icons } from './icons'

type PendingButtonProps = ButtonProps & {
  children?: React.ReactNode
}

const PendingSubmitButton = React.forwardRef<HTMLButtonElement, PendingButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const { pending } = useFormStatus()

    const Comp = asChild ? Slot : 'button'

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
        disabled={pending}
        aria-disabled={pending}
      >
        {pending && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </Comp>
    )
  },
)
PendingSubmitButton.displayName = 'PendingSubmitButton'

export { PendingSubmitButton }
