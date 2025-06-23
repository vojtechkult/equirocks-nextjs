// src/pages/_app.js
import { Inter } from 'next/font/google'
import '../app/globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export default function MyApp({ Component, pageProps }) {
  return (
    <div className={inter.variable}>
      <Component {...pageProps} />
    </div>
  )
}
