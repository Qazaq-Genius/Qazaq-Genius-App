import '../../styles/global.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return <>
        <Head>
          <title>Qazaq Genius</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <meta name="theme-color" content="#90B9D7" />
          <meta name="description" content="Qazaq Genius is a website that provides lyrics and translations of Kazakh songs." />
        </Head>
    <Component {...pageProps} />
  </>
}
