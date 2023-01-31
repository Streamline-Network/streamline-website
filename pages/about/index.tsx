import Question, { QuestionProps } from '../../components/question/question'

import Head from 'next/head'
import Link from 'next/link'
import about from './about.module.scss'
import classnames from 'classnames'

export default function About({}: AboutProps) {
  const questions: QuestionProps[] = [
    {
      question: "What's the IP?",
      answer: (
        <>
          Streamline is a whitelist-only Minecraft server, meaning you will need to be accepted to
          join. If you have been accepted, you can connect with this IP:{' '}
          <strong>play.streamlinesmp.com</strong>
        </>
      ),
      color: 'blue',
    },
    {
      question: 'What is this?',
      answer: (
        <>
          Streamline is a whitelist-only Minecraft vanilla SMP that promotes an &quot;economy&quot;
          that is diamond-based. We have a free build system allowing you to build almost anywhere
          you want, without many limitations.
        </>
      ),
      color: 'purple',
    },
    {
      question: "What's the seed?",
      answer: (
        <>
          We do not publicly release the seed for the season until after it is over. For concern
          that people will use it to find things that would have otherwise taken much longer to
          find.
        </>
      ),
      color: 'yellow',
    },
    {
      question: 'How is it paid for?',
      answer: (
        <>
          The server is paid for by donations, the server is hosted by a 3rd party hosting company
          and most of the money for the server comes from donations.
        </>
      ),
      color: 'red',
    },
    {
      question: 'Is it "pay to win"?',
      answer: (
        <>
          No, there is no way to buy ways forward in the server using real money, if you donate you
          only get things that don&amp;t affect your survival experience.
        </>
      ),
      color: 'green',
    },
    {
      question: 'How does this work?',
      answer: (
        <>
          Streamline SMP is a single Minecraft server located in New York City, NY. The software
          used by the server is{' '}
          <Link target="_blank" href="https://purpurmc.org/" className={about.blockLink}>
            Purpur
          </Link>
          , a branch of{' '}
          <Link target="_blank" href="https://papermc.io/" className={about.blockLink}>
            Paper MC
          </Link>{' '}
          which is a branch of{' '}
          <Link target="_blank" href="https://www.spigotmc.org/" className={about.blockLink}>
            Spigot
          </Link>
          .
        </>
      ),
      color: 'orange',
    },
    {
      question: 'How long is the wait?',
      answer: (
        <>
          Once you submit an application it will usually take no more than 24 hours to get reviewed.
          While you wait feel free to talk to the community and get to know the Streamliners!
        </>
      ),
      color: 'purple',
    },
    {
      question: 'Who are we?',
      answer: (
        <>
          We are Streamline, hello! Just a bunch of gamers together playing Minecraft! The server is
          run by and controlled by the players and anyone can become a part of the servers staff
          team.
        </>
      ),
      color: 'yellow',
    },
    {
      question: 'What about griefing?',
      answer: (
        <>
          How do we stop griefing? We keep griefing from happening using plugins that allow us to
          undo and check any action a user can do, as well as having user screening in the form of
          the application into the server.
        </>
      ),
      color: 'blue',
    },
    {
      question: 'Can I redo my application?',
      answer: (
        <>
          Absolutely, yes you can definitely redo your application! Just go back to the{' '}
          <Link target="_blank" href="https://dyno.gg/form/8ac19b49" className={about.blockLink}>
            application
          </Link>{' '}
          and as long as your old one has been reviewed you will have the ability to submit a new
          one.
        </>
      ),
      color: 'red',
    },
    {
      question: 'What are the rules?',
      answer: (
        <>
          You can check the basic rules{' '}
          <Link
            target="_blank"
            href="https://discord.com/channels/775831180086870096/970418128737665095"
            className={about.blockLink}>
            here
          </Link>
          . You can get a more detailed look at the rules{' '}
          <Link
            target="_blank"
            href="https://docs.google.com/document/d/15fSrpzbVmg0gipyZF9MBiK5JPCymrWZOAImNA3a-_9Q/edit?usp=sharing"
            className={about.blockLink}>
            here
          </Link>
          . The rules are also subject to change, however you will be notified to the change if you
          are in the Discord server.
        </>
      ),
      color: 'red',
    },
    {
      question: 'Can I get banned for____?',
      answer: (
        <>
          If you have any questions about what is against the rules or allowed,{' '}
          <Link href="/contact" className={about.blockLink}>
            please contact a staff member to ask!
          </Link>{' '}
          That is the best way to make sure that you stay safe and don&amp;t risk getting banned!
        </>
      ),
      color: 'green',
    },
    {
      question: 'Are clients allowed?',
      answer: (
        <>
          Yes, clients are somewhat allowed. However, clients that break the{' '}
          <Link
            target="_blank"
            href="https://discord.com/channels/775831180086870096/776140370568020020"
            className={about.blockLink}>
            rules
          </Link>
          , like Wurst client are not allowed for obvious reasons. However, Fabric, Badlion, Lunar,
          and most other similar clients are allowed.
        </>
      ),
      color: 'orange',
    },
    {
      question: 'Is there minimum age?',
      answer: (
        <>
          Yes, the minimum age is 13. The reason we picked this age is because we felt as a
          community that this was a reasonable age for the server. The server is a{' '}
          <Link
            target="_blank"
            href="https://en.wiktionary.org/wiki/SFW#:~:text=(Internet%2C%20initialism)%20Safe%20for,to%20employers%20or%20co%2Dworkers."
            className={about.blockLink}>
            SFW
          </Link>{' '}
          server safe for <strong>anyone 13+</strong>!
        </>
      ),
      color: 'blue',
    },
  ]

  return (
    <>
      <Head>
        <title>Get to Know the Best Vanilla SMP Whitelist-Only Minecraft Server</title>
        <meta name="keywords" content="About the Minecraft server" />
        <meta
          name="description"
          content="Discover what makes our Vanilla SMP Whitelist-Only Minecraft Server the best. Learn about our history, mission and values. Read now!"
        />
      </Head>
      <h1 className={classnames('yellow', about.title)}>About</h1>
      <article>
        <div className={about.subHeader}>
          <h2>Frequently Asked Questions</h2>
          <p>
            Have a question? We have the answer! If you don&lsquo;t see your question here you can
            always hit us up at our{' '}
            <Link className={about.subHeaderLink} href="/contact">
              Contact Page
            </Link>
            .
          </p>
        </div>
        <div className={about.faq}>
          {questions.map((question, index) => (
            <Question {...question} key={index} />
          ))}
        </div>
      </article>
    </>
  )
}

interface AboutProps {}
