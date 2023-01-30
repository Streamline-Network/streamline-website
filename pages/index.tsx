import Block, { BlockProps } from '../components/block/block'

import Link from 'next/link'
import index from './index.module.scss'

export default function Index({}: IndexProps) {
  const blocks: BlockProps[] = [
    {
      title: 'Economy',
      paragraphs: [
        'The economy on Streamline is based on diamonds, it works much like its real-world counterpart, with buys and sales using one central currency.',
        'You can become a tycoon and make thousands of diamonds, or you can just stop by the shopping district whenever you need some materials.',
        "The economy adds incredible potential to everyone's experience and it speeds up the survival gameplay allowing you to skip to what you love!",
      ],
      color: 'purple',
      classes: [index.column, index.gridRowSpan2],
    },
    {
      title: 'No Claiming',
      paragraphs: [
        'Streamline is a whitelist-only Minecraft server, meaning there is no need for those annoying claim features you find on public SMPs.',
        'Just choose a place and start building!',
      ],
      color: 'blue',
      classes: [index.column],
    },
    {
      title: 'Community',
      paragraphs: [
        "Our community is by far one of the number one reasons to join Streamline. We have a very active and talented community of people making incredible things everyday on the server! With over 100 players and growing, there's always somebody to hang out with.",
        <>
          We appreciate every new addition to our community and can&apos;t wait to see you join it!
          Feel free to check any of the{' '}
          <Link style={{ color: 'black', textDecoration: 'underline' }} href="/community">
            Streamline social media
          </Link>{' '}
          to talk with us!
        </>,
      ],
      color: 'red',
      classes: [index.gridColSpan2],
    },
    {
      title: 'A Server For All',
      paragraphs: [
        'The entire point of Streamline in the first place was to create a whitelist server that anyone who wants to join, can. We have overwhelmingly accomplished that goal, with an incredibly diverse community of people all around the world and all different backgrounds!',
        "It doesn't matter where you're from or who you are, we support everyone! We love each and every player that joins Streamline and look forward to anyone that wants to be a part of our community.",
      ],
      color: 'yellow',
      classes: [index.gridColSpan2],
    },
    {
      title: 'Trust-Based Rules',
      paragraphs: [
        'With trust-based rules there is no need for pesky plugins or limitations getting in the way of your gameplay.',
        'Streamliners never need to deal with getting around build restrictions or annoying alerts.',
      ],
      color: 'green',
      classes: [index.column],
    },
  ]
  return (
    <>
      <h1 className={index.title}>Welcome To Streamline</h1>
      <div>
        <div className={index.grid}>
          {blocks.map((block, index) => (
            <Block {...block} key={index} />
          ))}
          <Link href="/join">Join</Link>
        </div>
      </div>
    </>
  )
}

interface IndexProps {}
