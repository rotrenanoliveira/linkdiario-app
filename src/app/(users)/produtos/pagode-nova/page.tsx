import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Do zero ao Pagode Nova – Cavaquinho para iniciantes',
  description: 'DESCUBRA OS SEGREDOS PARA TOCAR CAVAQUINHO!',
}

export default function ProductPage() {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <Card className={cn('w-[380px]')}>
        <CardHeader>
          <CardTitle>Do zero ao Pagode Nova</CardTitle>
          <CardDescription>DESCUBRA OS SEGREDOS PARA TOCAR CAVAQUINHO!</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Image src={'/pagode-nova.png'} width={350} height={350} alt="" className="rounded-lg" />
        </CardContent>
        <CardFooter>
          <Link className="w-full" href={'https://go.hotmart.com/C86527721T'}>
            <Button className="w-full">Adquira já</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
