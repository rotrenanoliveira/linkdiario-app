import { getHtmlSource } from '@/lib/puppeteer'

export default async function GenericStore() {
  const htmlSource = await getHtmlSource('https://mon.net.br/2nto17')

  return <div dangerouslySetInnerHTML={{ __html: htmlSource }} />
}
