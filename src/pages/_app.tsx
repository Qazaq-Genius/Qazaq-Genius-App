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
          <meta name="googlebot" content="notranslate"/>

          <meta property="og:type" content="website"/>
          <meta property="og:url" content="https://https://qazaq-genius-app.vercel.app//"/>
          <meta property="og:title" content="Qazaq Genius"/>
          <meta property="og:description" content="Qazaq Genius is a website that provides lyrics and translations of Kazakh songs."/>
          <meta property="og:image" content="https://repository-images.githubusercontent.com/609835063/bddcb5ea-6fcd-4b3f-852f-808042a7d50f"/>
        </Head>
    <Component {...pageProps} />
  </>
}
