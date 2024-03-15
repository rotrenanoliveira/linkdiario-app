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
      <Button
        type="submit"
        variant="ghost"
        className="font-light text-md h-14 md:h-fit justify-start flex items-center gap-3 bg-foreground/5 md:bg-transparent rounded-full md:rounded-md"
      >
        <LogOut strokeWidth={1} />
        <span className="hidden lg:inline">Sair</span>
      </Button>
    </form>
  )
}
