import { Head, Html, Main, NextScript } from 'next/document'

export default function Layout({}: LayoutProps) {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

interface LayoutProps {
  children: React.ReactNode
}
