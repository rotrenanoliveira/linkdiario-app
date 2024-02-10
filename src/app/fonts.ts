import { JetBrains_Mono } from 'next/font/google'
import localFont from 'next/font/local'

export const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
})

export const satochi = localFont({
  src: [
    {
      path: '../assets/fonts/Satoshi-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Satoshi-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Satoshi-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Satoshi-Light.woff2',
      weight: '300',
      style: 'normal',
    },
  ],
  display: 'swap',
})
