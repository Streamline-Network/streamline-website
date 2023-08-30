import { NextSeo } from 'next-seo'

export default function Map() {
  return (
    <>
      <NextSeo
        title="Stats - Track Your Progress"
        description="Track your progress on Streamline SMP, a vanilla whitelist-only Minecraft server. See your playtime, deaths, kills and more."
      />

      <div>
        <h1 style={{ textAlign: 'center' }}>
          The stats page for Streamline SMP is down for this season. Sorry for the inconvenience.
        </h1>

        <a style={{ textDecoration: 'underline', textAlign: 'center' }} href="./">
          Go Home
        </a>
      </div>
    </>
  )
}
