import '/styles/style.scss'

import React from 'react'

import Banner, { BannerProps } from './components/banner/banner'
import Footer from './components/footer/footer'
import Header from './components/header/header'

export default function Layout({ children }: { children: React.ReactNode }) {
  const messages: BannerProps[] = [
    {
      title: '',
      message:
        'We are currently in between seasons and are not accepting new people. Expect season four summer of 2023.',
      color: '',
    },
  ]
  return (
    <>
      <Header />
      {/*messages.map((message, index) => (
        <Banner key={index} {...message} />
      ))*/}
      <main>{children}</main>
      <Footer />
    </>
  )
}
