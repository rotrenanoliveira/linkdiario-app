import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-5xl">linkdiario</h1>
      <Image src={'/linkdiario.png'} alt="linkdiario" width={256} height={256} />
    </main>
  )
}
