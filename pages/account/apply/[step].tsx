import Head from 'next/head'
import apply from './apply.module.scss'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

export default function Stats({}: StatsProps) {
  const router = useRouter()
  const { step } = router.query

  const { status, data } = useSession()

  return (
    <>
      <Head>
        <title>Apply to join</title>
      </Head>
      <h1>This page is not ready yet!</h1>
      <p>
        page: {step}, stage: {status === 'authenticated' ? data.applicationStage : 'loading'}
      </p>
    </>
  )
}

interface StatsProps {}
