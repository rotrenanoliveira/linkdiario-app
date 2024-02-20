import { LogOut } from 'lucide-react'
import { Button } from './ui/button'
import { signOut } from '@/infra/auth'

export function SignOutForm() {
  async function handleSignOut() {
    'use server'

    await signOut()
  }

  return (
    <form action={handleSignOut}>
      <Button type="submit" variant="ghost" className="font-light text-md justify-start flex items-center gap-3">
        <LogOut strokeWidth={1} />
        Sair
      </Button>
    </form>
  )
}
