import '../styles/style.scss'

import AnalyticsWrapper from '../components/analytics/analytics'
import type { AppProps } from 'next/app'
import Banners from '../components/banners/banners'
import Footer from '../components/footer/footer'
import Header from '../components/header/header'
import Wrapper from '../components/wrapper'

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <Wrapper session={session}>
      <Header />
      <Banners />
      <div className="main">
        <Component {...pageProps} />
      </div>
      <Footer />
      <AnalyticsWrapper />
    </Wrapper>
  )
}
