import LimitedTable, { TableRow } from 'components/fragments/blocks/limited-table'

import Head from 'next/head'
import classNames from 'classnames'
import rules from './rules.module.scss'

export default function Rules() {
  const discordRules: TableRow[] = [
    {
      start: '1.1',
      content:
        'Do not intentionally annoy, harass, be toxic, or promote to any users DMs, or in any channel.',
      end: '0.5 - 2',
    },
    {
      start: '1.2',
      content:
        'Do not make any inappropriate/rude comments about another user. Includes microaggression.',
      end: '1 - 2',
    },
    {
      start: '1.3',
      content:
        'Do not start drama. Do not bring drama from other social media (YouTube, Twitter, Discord, etc.) to this server.',
      end: '0.5 - 1.5',
    },
    {
      start: '1.4',
      content: 'No racism.',
      end: '3 - 4',
    },
    {
      start: '1.5',
      content:
        'No nudity. Do not post any kind of sexually suggestive images or nudity in the chats, this includes audio, saying things in VC, etc.',
      end: '1 - 5',
    },
    {
      start: '1.6',
      content:
        'While Profanity is allowed on the server, please refrain from using excessive profanity.',
      end: '0.5',
    },
    {
      start: '1.7',
      content:
        "Speak English only. It's difficult to moderate other languages. If someone is insulting someone, or breaking rules, in another language, it will be difficult to know.",
      end: '0.5',
    },
    {
      start: '1.8',
      content:
        'No spamming messages, do not @ more than 3 people or a person more than 3 times within 2 minutes, and do not purposely ghost ping people.',
      end: '0.5 - 1',
    },
    {
      start: '1.9',
      content:
        "Don't be excessively inappropriate or make people uncomfortable. (This rule is excluded in the Mature channels)",
      end: '0.5 - 3',
    },
    {
      start: '1.10',
      content:
        "Don't do annoying sounds whilst in a voice channel. (earrape, loud screaming, funny mic)",
      end: '0.5',
    },
    {
      start: '1.11',
      content: "Don't join with an alt account without permission.",
      end: '0.5',
    },
    {
      start: '1.12',
      content:
        'Advertise only videos and photos recorded on Streamline SMP in #streamline-screenshots-and-videos.',
      end: '0.5 - 1',
    },
    {
      start: '1.13',
      content: 'Use all channels reasonably within their intended purpose.',
      end: '0.5',
    },
    {
      start: '1.14',
      content: 'Do not pretend to be and/or impersonate a staff member.',
      end: '1.5',
    },
    {
      start: '1.15',
      content:
        'Do not try to find, share, or make loopholes in the rules. This is considered a violation of the rules.',
      end: '2',
    },
    {
      start: '1.16',
      content: 'Do not ignore a staff member`s request, or go against it.',
      end: '0.5 - 3',
    },
  ]

  return (
    <>
      <Head>
        <title>Streamline SMP Rules</title>
      </Head>
      <h1 className={classNames('orange', rules.title)}>Rules</h1>
      <div>
        <h2 className={rules.subheader}>Discord Rules</h2>
        <LimitedTable
          labels={{ start: 'Rule identifier', content: 'Rule', end: 'Punishment in retributions' }}
          rows={discordRules}
        />
      </div>
    </>
  )
}
