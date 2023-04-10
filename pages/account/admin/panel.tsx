import Link from 'next/link'
import Loading from 'components/fragments/application/loading'
import { MdRateReview } from 'react-icons/md'
import classNames from 'classnames'
import { getRelativeTime } from 'utils/misc'
import panel from './panel.module.scss'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

const DEFAULT_MAX_NOTIFICATIONS = 5

export default function Panel() {
  const { data, status } = useSession()

  return (
    <>
      <h1 className={classNames('green', panel.title)}>Staff Panel</h1>
      {status !== 'authenticated' ? (
        <Loading />
      ) : (
        <div>
          <div className={classNames(panel.block, panel.intro)}>
            Welcome <span>{data.user?.name}</span> to the <span>{data.role}</span> staff panel! Take
            a look around, something might be useful to you!
          </div>
          <h2 className={panel.subheader}>Recent activity</h2>
          <Feed />
          <h2 className={panel.subheader}>Staff pages</h2>
          <StaffPages />
        </div>
      )}
    </>
  )
}

function Feed() {
  const [maxNotifications, setMaxNotification] = useState(DEFAULT_MAX_NOTIFICATIONS)

  const feed: Feed[] = [
    {
      content: (
        <p>
          You were mentioned by <span>Axxmie</span> in <span>Jammye</span>&apos;s application.
        </p>
      ),
      timestamp: 1681091391083,
      action: { buttonText: 'View', func: './review' },
    },
    {
      content: (
        <p>
          A new application was submitted by <span>Jammye</span>.
        </p>
      ),
      timestamp: 1680970343000,
      action: { buttonText: 'View', func: './review' },
    },
    {
      content: (
        <p>
          Thank you for becoming a staff member, and welcome to the <span>reviewer</span> staff
          panel! This is where important notifications appear.
        </p>
      ),
      timestamp: 1678295543000,
    },
  ]

  function getAction(action: FeedAction) {
    if (typeof action.func === 'string') {
      return (
        <Link className={panel.button} href={action.func}>
          {action.buttonText}
        </Link>
      )
    } else {
      return (
        <button className={panel.button} onClick={action.func}>
          {action.buttonText}
        </button>
      )
    }
  }

  return (
    <>
      <div className={classNames(panel.block, panel.feed)}>
        {feed.map(({ content, timestamp, action }, i) => {
          if (i >= maxNotifications) return undefined

          const rtf = new Intl.RelativeTimeFormat(undefined, { numeric: 'auto', style: 'long' })

          const relativeTime = getRelativeTime(timestamp, rtf)

          return (
            <div className={panel.feedItem} key={i}>
              <div>
                {content}
                <time>{relativeTime}</time>
              </div>

              {action && getAction(action)}
            </div>
          )
        })}
        {maxNotifications > DEFAULT_MAX_NOTIFICATIONS && (
          <div className={panel.feedItem}>
            <p>You have notifications expanded.</p>
            <button
              onClick={() => setMaxNotification(DEFAULT_MAX_NOTIFICATIONS)}
              className={panel.showMore}>
              collapse
            </button>
          </div>
        )}
        {feed.length > maxNotifications && (
          <div className={panel.feedItem}>
            <p>We have hidden some notifications to save space.</p>
            <button
              onClick={() => setMaxNotification(maxNotifications + 5)}
              className={panel.showMore}>
              show {maxNotifications - feed.length < -5 ? 5 : (maxNotifications - feed.length) * -1}{' '}
              more
            </button>
          </div>
        )}
      </div>
    </>
  )
}

function StaffPages() {
  const pages: StaffPage[] = [
    {
      name: 'Review and search applications',
      icon: <MdRateReview />,
      link: './review',
    },
  ]

  return (
    <div className={classNames(panel.block, panel.pageButtonWrapper)}>
      {pages.map(({ name, icon, link }, i) => (
        <div className={panel.pageButton} key={i}>
          <span className={panel.icon}>{icon}</span>
          <span>{name}</span>
          <Link href={link}>Go</Link>
        </div>
      ))}
    </div>
  )
}

type StaffPage = { icon: React.ReactNode; name: string; link: string }

type Feed = { content: React.ReactNode; timestamp: number; action?: FeedAction }
type FeedAction = { func: (() => void) | string; buttonText: string }
