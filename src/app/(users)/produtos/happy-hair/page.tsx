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
          <CardTitle>Happy Hair</CardTitle>
          <CardDescription>Seus cabelos mais lindos brilhantes e saudáveis.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Image src={'/happy-hair.png'} width={350} height={350} alt="Happy Hair" className="rounded-lg" />
        </CardContent>
        <CardFooter>
          <Link className="w-full" href={'https://mon.net.br/2nto17'}>
            <Button className="w-full">Adquira já</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
