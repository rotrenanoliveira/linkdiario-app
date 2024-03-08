import Link from 'next/link'

import { satochi } from '@/app/fonts'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-screen min-h-screen bg-[#F6F7F8]">
      <div className="2xl:h-[calc(100dvh-64px)]">{children}</div>

      <footer className={cn(satochi.className, 'text-center text-lg p-3 opacity-50')}>
        linkdiario desenvolvido por
        <Button type="button" variant="link" className="text-md p-1">
          <Link href="https://dstopic.com">dstopic</Link>
        </Button>
        <span className="font-light text-sm">・ &copy; {new Date().getFullYear()} ・</span>
      </footer>
    </main>
  )
}
