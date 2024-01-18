import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

import Image from 'next/image'
import Link from 'next/link'

export default function MicrosoftEdge() {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <Card className={cn('w-[380px]')}>
        <CardHeader>
          <CardTitle>Start Bing</CardTitle>
          <CardDescription>
            Uma experiência completa de aprendizado e crescimento! Tudo reunido em um único plano, simplificado e
            recheado de vantagens..
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Image src={'/smart-bing.png'} width={350} height={350} alt="Happy Hair" className="rounded-lg" />
        </CardContent>
        <CardFooter>
          <Link className="w-full" href={'https://go.hotmart.com/P89601406S'}>
            <Button className="w-full bg-purple-700">Adquira já</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
