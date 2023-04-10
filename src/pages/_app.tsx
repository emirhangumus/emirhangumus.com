import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '@/components/Layout'
import SessionProvider from '@/components/SessionProvider'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )
}