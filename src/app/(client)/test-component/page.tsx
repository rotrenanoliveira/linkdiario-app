import { QuestionsAndAnswers } from '../_components/ qna'
import { Footer } from '../_components/footer'
import { Pricing } from '../_components/pricing'

export default function HomePage() {
  return (
    <div className="w-screen min-h-svh flex flex-col items-center justify-center p-3 md:p-9 lg:p-12 xl:p-16">
      <Pricing />
      <QuestionsAndAnswers />
      <Footer />
    </div>
  )
}
