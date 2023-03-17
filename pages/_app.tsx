import '../styles/style.scss'

import AnalyticsWrapper from '../components/layout/analytics/analytics'
import type { AppProps } from 'next/app'
import Banners from '../components/layout/banners/banners'
import CookieConsent from 'react-cookie-consent'
import Footer from '../components/layout/footer/footer'
import Header from '../components/layout/header/header'
import Wrapper from '../components/wrapper'

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <Wrapper session={session}>
      <div>
        <CookieConsent
          acceptOnScroll
          acceptOnScrollPercentage={25}
          containerClasses="cookie-wrapper"
          buttonText={'Accept Essential Cookies'}>
          This website uses cookies to enhance the user experience.
        </CookieConsent>
      </div>
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
