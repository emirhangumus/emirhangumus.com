import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '@/components/Layout'
import SessionProvider from '@/components/SessionProvider'
import Head from 'next/head'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="description" content="Merhaba, ben Emirhan Gümüş. Yazılım geliştiricisiyim!" />
        <meta name="keywords" content="frontend, backend, react, developer, next, nextjs, flutter, svelte, sveltekit" />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="author" content="Emirhan Gümüş" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <SessionProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </>
  )
}