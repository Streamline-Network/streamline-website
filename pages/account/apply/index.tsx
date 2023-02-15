import { GetServerSidePropsContext } from 'next'
import apply from './apply.module.scss'
import { authOptions } from 'pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'

export default function Apply() {
  return (
    <div className={apply.wrapper}>
      <p>Loading...</p>
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions)

  if (!session) {
    return { redirect: { destination: '/' } }
  }

  switch (session.applicationStage) {
    case 0:
      return { redirect: { destination: context.resolvedUrl + '/submit' } }
    case 1:
      return { redirect: { destination: context.resolvedUrl + '/status' } }
    case 2:
      return { redirect: { destination: context.resolvedUrl + '/reviewed' } }
  }

  return { props: { serverSession: session } }
}
