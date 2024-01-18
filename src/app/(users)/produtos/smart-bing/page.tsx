import { getHtmlSource } from '@/lib/axios'

export default async function SmartBing() {
  const htmlSource = await getHtmlSource('https://go.hotmart.com/P89601406S')

  return <div dangerouslySetInnerHTML={{ __html: htmlSource }} />
}
