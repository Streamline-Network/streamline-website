import '/styles/style.scss'

import { Rubik } from '@next/font/google'
import React from 'react'

import Banner, { BannerProps } from './components/banner/banner'
import Footer from './components/footer/footer'
import Header from './components/header/header'

const rubik = Rubik()

export default function Layout({ children }: LayoutProps) {
  const messages: BannerProps[] = [
    {
      title: '',
      message:
        'We are currently in between seasons and are not accepting new people. Expect season four summer of 2023.',
      color: '',
    },
  ]
  return (
    <html className={rubik.className}>
      <Header />
      {/*messages.map((message, index) => (
        <Banner key={index} {...message} />
      ))*/}
      <main>{children}</main>
      <Footer />
    </html>
  )
}

interface LayoutProps {
	children: React.ReactNode;
}
