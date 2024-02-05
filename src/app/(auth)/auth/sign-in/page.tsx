import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import Image from 'next/image'

import { cn } from '@/lib/utils'

import { UserAuthForm } from './components/user-auth-form'
import { jetBrainsMono } from '@/app/fonts'
import { validateUserAccess } from '@/utils/validate-access'

export const metadata: Metadata = {
  title: 'Entrar | linkdiario',
  description: 'Faça login para continuar para ter acesso ao linkdiario.',
}

export default function AuthenticationPage() {
  const userHasAccess = validateUserAccess().isValid

  if (userHasAccess) {
    redirect('/dashboard')
  }

  return (
    <>
      <div className="container p-4">
        <div className="flex items-center gap-4">
          <Image src={'/linkdiario.png'} alt="linkdiario" width={48} height={48} />
          <h2 className={cn(jetBrainsMono.className, 'text-lg font-medium tracking-tight')}>linkdiario</h2>
        </div>

        <div className="container h-[calc(100dvh-64px)] flex items-center justify-center lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">Entre na sua conta</h1>
              <p className="text-sm text-muted-foreground">Insira seu e-mail abaixo para continuar</p>
            </div>

            <UserAuthForm />
          </div>
        </div>
      </div>
    </>
  )
}
