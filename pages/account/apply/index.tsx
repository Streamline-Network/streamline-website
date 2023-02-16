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
