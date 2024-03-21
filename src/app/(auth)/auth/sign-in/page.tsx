import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

import { jetBrainsMono } from '@/app/fonts'
import { cn } from '@/lib/utils'
import { getSession } from '@/infra/auth'
import { AuthenticateUserForm } from './components/authenticate-user-form'

export const metadata: Metadata = {
  title: 'Entrar ・ linkdiario',
  description: 'Faça login para continuar para ter acesso ao linkdiario.',
}

export default async function AuthenticationPage() {
  const session = await getSession()

  if (session) {
    redirect('/dashboard')
  }

  return (
    <>
      <div className="container p-4">
        <div className="flex items-center gap-4">
          <Link href={'/'} className="flex items-center gap-3">
            <Image src={'/linkdiario.png'} alt="linkdiario" width={48} height={48} />
            <h2 className={cn(jetBrainsMono.className, 'text-lg font-medium tracking-tight')}>linkdiario</h2>
          </Link>
        </div>

        <div className="container h-[calc(100dvh-64px)] flex items-center justify-center lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">Entre na sua conta</h1>
              <p className="text-sm text-muted-foreground">Insira seu e-mail abaixo para continuar</p>
            </div>

            <AuthenticateUserForm />
          </div>
        </div>
      </div>
    </>
  )
}
