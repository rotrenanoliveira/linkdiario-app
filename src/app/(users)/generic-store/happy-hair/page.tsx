'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function GenericStore() {
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => router.push('https://mon.net.br/2nto17'), 250)
  })

  return (
    <div>
      <h1>Generic Store</h1>
      <Link href={'https://mon.net.br/2nto17'}>
        <button>Link para o produtor</button>
      </Link>
    </div>
  )
}
