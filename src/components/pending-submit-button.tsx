'use client'

import { cn } from '@/lib/utils'
import { Slot } from '@radix-ui/react-slot'
import { useFormStatus } from 'react-dom'
import { ButtonProps, buttonVariants } from './ui/button'
import React from 'react'
import { Icons } from './icons'
import { toast } from 'sonner'

type PendingButtonProps = ButtonProps & {
  children?: React.ReactNode
  toastProps:
    | {
        id: string
        loadingMessage: string
      }
    | undefined
}

const PendingSubmitButton = React.forwardRef<HTMLButtonElement, PendingButtonProps>(
  ({ className, variant, size, asChild = false, children, toastProps = undefined, ...props }, ref) => {
    const { pending } = useFormStatus()

    const toastLoadingMessage = toastProps ? toastProps.loadingMessage : 'Carregando...'

    if (pending && toastProps) {
      toast.loading(toastLoadingMessage, {
        id: toastProps?.id,
      })
    }

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
