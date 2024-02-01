'use client'

import { cn } from '@/lib/utils'
import { Slot } from '@radix-ui/react-slot'
import { useFormStatus } from 'react-dom'
import { ButtonProps, buttonVariants } from './ui/button'
import React from 'react'

type PendingButtonProps = ButtonProps

const PendingSubmitButton = React.forwardRef<HTMLButtonElement, PendingButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const { pending } = useFormStatus()

    const Comp = asChild ? Slot : 'button'

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
        disabled={pending}
        aria-disabled={pending}
      />
    )
  },
)
PendingSubmitButton.displayName = 'PendingSubmitButton'

export { PendingSubmitButton }
