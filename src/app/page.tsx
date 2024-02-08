import Link from 'next/link'
import Image from 'next/image'
import { LogIn } from 'lucide-react'

import { jetBrainsMono } from './fonts'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="flex items-center justify-center gap-4 mb-16">
        <Image src={'/linkdiario.png'} alt="linkdiario" width={64} height={64} />
        <h1 className={cn(jetBrainsMono.className, 'text-4xl font-medium tracking-tight')}>linkdiario</h1>
      </div>

      <Link
        href={'/auth/sign-in'}
        className={cn(buttonVariants({ variant: 'ghost' }), 'font-light text-md justify-start flex items-center gap-3')}
      >
        Entrar
        <LogIn strokeWidth={1} />
      </Link>
    </main>
  )
}
