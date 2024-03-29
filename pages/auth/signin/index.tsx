import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'

import Image from 'next/image'
import { NextSeo } from 'next-seo'
import { authOptions } from 'pages/api/auth/[...nextauth]'
import classNames from 'classnames'
import classnames from 'classnames'
import discord from '/images/discord.png'
import { getServerSession } from 'next-auth'
import { signIn as signInFunc } from 'next-auth/react'
import signin from './signin.module.scss'

export default function SignIn({
  callbackUrl,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <NextSeo title="Login" description="Login to the Streamline SMP website with Discord." />

      <h1 className={classnames('orange', signin.title)}>Sign In</h1>
      <div>
        <div className={signin.informationBlock}>
          <h2>You must sign in to continue</h2>
          <p>Signing in is required to visit the page you are trying to visit.</p>
        </div>
        {error ? (
          <div className={classNames(signin.box, 'red')}>An error has occurred: {error}</div>
        ) : undefined}
        <div className={signin.box}>
          <div className={classnames('blue', signin.coloredBox)}>
            <Image width="300" src={discord} alt="The Discord logo" />
            <span>Sign in with Discord to continue.</span>
          </div>
          <button onClick={() => signInFunc('discord', { callbackUrl })} className={signin.button}>
            Sign in with Discord
          </button>
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions)

  // If the user is already logged in, redirect.
  if (session) {
    return { redirect: { destination: '/' } }
  }

  const callbackUrl = (context.query.callbackUrl ?? '/') as string

  return { props: { callbackUrl, error: context.query.error ?? false } }
}
