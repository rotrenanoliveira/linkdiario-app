import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

import Image from 'next/image'
import Link from 'next/link'

export default function ProductPage() {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <Card className={cn('w-[380px]')}>
        <CardHeader>
          <CardTitle>Collagen Vitta</CardTitle>
          <CardDescription>
            A mágica está nos ingredientes. Diga adeus à flacidez e rugas, sua beleza de dentro para fora.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Image src={'/collagen-vitta.png'} width={350} height={350} alt="" className="rounded-lg" />
        </CardContent>
        <CardFooter>
          <Link className="w-full" href={'https://mon.net.br/25osgd'}>
            <Button className="w-full">Adquira já</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
