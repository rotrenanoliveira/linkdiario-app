import { cn } from '@/lib/utils'
import React from 'react'

const FormItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn('space-y-2', className)} {...props} />
  },
)

FormItem.displayName = 'FormItem'

const FormDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => {
    return <p ref={ref} className={cn('text-[0.8rem] text-muted-foreground', className)} {...props} />
  },
)

FormDescription.displayName = 'FormDescription'

interface FormMessageProps extends React.HTMLAttributes<HTMLParagraphElement> {
  message: string
}

const FormMessage = React.forwardRef<HTMLParagraphElement, FormMessageProps>(
  ({ className, message, ...props }, ref) => {
    return (
      <p ref={ref} className={cn('text-[0.8rem] font-medium text-destructive', className)} {...props}>
        {message}
      </p>
    )
  },
)
FormMessage.displayName = 'FormMessage'

export { FormItem, FormDescription, FormMessage }
