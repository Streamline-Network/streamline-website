import TitleBlock, { BlockProps } from 'components/fragments/blocks/title-block/title-block'

import Link from 'next/link'
import { NextSeo } from 'next-seo'
import index from './index.module.scss'

export default function Index() {
  const blocks: BlockProps[] = [
    {
      title: 'Economy',
      paragraphs: [
        'The economy on Streamline operates just like the real world, with diamonds as the central currency for buying and selling goods. Players have the opportunity to become tycoons by accumulating wealth or simply visit the shopping district for materials. The economy adds excitement to the survival gameplay and offers endless possibilities for players to grow and thrive.',
        'You can choose to specialize in crafting, trading, or simply enjoy the convenience of having a single currency to manage. The economy allows players to focus on what they love and skip the grind.',
      ],
      color: 'purple',
      classes: [index.column, index.gridRowSpan2],
    },
    {
      title: 'No Claiming',
      paragraphs: [
        "Streamline's whitelist feature eliminates the need for claim features common in public SMPs, giving players freedom to build wherever they choose.",
      ],
      color: 'blue',
      classes: [index.column],
    },
    {
      title: 'Community',
      paragraphs: [
        <>
          Streamline boasts a lively and talented community of over 100 players from all over the
          world. They create incredible things every day and are always happy to welcome new
          members. Check out the{' '}
          <Link style={{ color: 'black', textDecoration: 'underline' }} href="/community">
            Streamline social media
          </Link>{' '}
          to connect with the community.
        </>,
      ],
      color: 'red',
      classes: [index.gridColSpan2],
    },
    {
      title: 'For Everyone',
      paragraphs: [
        'Streamline SMP was created to provide a whitelist server for players of all backgrounds and locations. The server is inclusive and welcomes everyone with open arms. The community is diverse, with players from all over the world, making Streamline a melting pot of talent and creativity.',
        "At Streamline, it doesn't matter where you're from or who you are, everyone is supported and valued. The server's aim is to create a friendly and welcoming environment for all players, where everyone can feel at home. Whether you're a seasoned Minecraft player or just starting out, Streamline is the perfect place for you.",
      ],
      color: 'yellow',
      classes: [index.gridColSpan2],
    },
    {
      title: 'Trust-Based Rules',
      paragraphs: [
        'Streamline operates with trust-based rules, allowing players to play without restrictions from plugins or limitations. Enjoy seamless gameplay without worrying about build restrictions or annoying alerts.',
      ],
      color: 'green',
      classes: [index.column],
    },
  ]

  return (
    <>
      <NextSeo
        title="- A Vanilla Whitelist Minecraft Server"
        description="Join Streamline SMP, a vanilla whitelist-only Minecraft server with a diamond-based economy and a friendly community."
      />

      <h1 className={index.title}>Welcome to Streamline SMP</h1>
      <div>
        <p className={index.subtitle}>
          Streamline SMP is a whitelist-only Minecraft server that offers an economy based on
          diamonds, a thriving community, and trust-based rules. With no claiming restrictions and
          over 100 players, there&apos;s always someone to play with.
        </p>
        <div className={index.grid}>
          {blocks.map((block, index) => (
            <TitleBlock {...block} key={index} />
          ))}
          <Link href="/join">Join</Link>
        </div>
      </div>
    </>
  )
}
