import { Block } from 'components/fragments/blocks/block-types'
import Blocks from 'components/fragments/blocks/blocks'
import Link from 'next/link'
import classNames from 'classnames'
import join from './join.module.scss'

export default function Join() {
  const blocks: Block[] = [
    {
      title: 'Join the Discord',
      paragraphs: [
        <>
          Join the Discord if you haven&apos;t already. Having a Discord account is required to
          join, if you do not have one, you can make one for free on{' '}
          <Link
            style={{ color: 'white', textDecoration: 'underline' }}
            target="_blank"
            href="https://www.discord.com">
            Discord&apos;s website
          </Link>
          .
        </>,
        <>
          <Link className={join.largeButton} target="_blank" href="https://discord.gg/EAe4S6HdVC">
            Join the Discord
          </Link>
        </>,
      ],
    },
    {
      title: 'Fill out the application',
      paragraphs: [
        <>
          The questions aren&apos;t that difficult but try to be as detailed as possible. We have an
          acceptance rate of about 70% so good luck! The questions are here to make sure that
          everyone who joins Streamline will follow the rules and contribute to the server.
        </>,
        <>
          <Link className={join.largeButton} href="/account/apply">
            Submit an application
          </Link>
        </>,
      ],
    },
    {
      title: "That's it!",
      paragraphs: [
        <>
          The form has been submitted. Next a staff member will review your application. The wait is
          usually no more than 24 hours. If you have any questions please visit the{' '}
          <Link style={{ color: 'white', textDecoration: 'underline' }} href="/about">
            Q&A
          </Link>{' '}
          or{' '}
          <Link style={{ color: 'white', textDecoration: 'underline' }} href="/contact">
            contact us
          </Link>{' '}
          page.
        </>,
      ],
    },
  ]

  return (
    <>
      <h1 className={classNames(join.title, 'green')}>JOIN THE SERVER</h1>
      <div>
        <div className={join.infoBlock}>
          <h3>Requirements</h3>
          <p>
            You must be 13 years old or older to join Streamline SMP, be able to speak English, and
            have a Discord account.
          </p>
        </div>

        <h2 className={join.subheader}>Apply</h2>
        <Blocks
          blockArr={[
            {
              title: 'Streamline SMP is a whitelist-only Minecraft server.',
              paragraphs: [
                <>
                  To insure quality and to protect players from grief, Streamline SMP needs an
                  application to join. This application not only protects the server from
                  mischievous players and hackers but also allows the server not to have claim
                  plugins and other anti-grief methods that are intrusive to gameplay.
                </>,
                <>
                  <Link className={join.importantButton} href="/account/apply">
                    Fill Out The Application
                  </Link>
                </>,
              ],
            },
          ]}
        />

        <h2 className={join.subheader}>LOST? HERE&apos;S A GUIDE</h2>
        <Blocks blockArr={blocks} />
      </div>
    </>
  )
}
