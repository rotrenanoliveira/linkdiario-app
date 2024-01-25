import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Curso Cartões Lucrativos | Comunidade milhas',
  description: 'Descubra como viajar pagando até 90% mais barato.',
}

export default function ProductPage() {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <Card className={cn('w-[380px]')}>
        <CardHeader>
          <CardTitle>Comunidade Milhas</CardTitle>
          <CardDescription>
            Vamos te ensinar a acumular milhas de maneiras que você nunca imaginou ser possível. Depois você decide se
            vende suas milhas para fazer um extra ou usar para viajar com sua família. Viajando com até 90% de desconto
            ou até mesmo de graça.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Image src={'/comunidade-milhas.png'} width={350} height={350} alt="" className="rounded-lg" />
        </CardContent>
        <CardFooter>
          <Link className="w-full" href={'https://kiwify.app/ixrSBze?afid=mO2YSorl'}>
            <Button className="w-full">Adquira já</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
