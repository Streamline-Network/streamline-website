import checkbox from './images/checkbox.png'
import discord from './images/discord.png'
import instagram from './images/instagram.png'
import reddit from './images/reddit.png'
import tiktok from './images/tiktok.png'
import twitter from './images/twitter.png'
import youtube from './images/youtube.png'

export default function Page() {
  const sections = [
    {
      title: 'Our Social Media',
      links: [
        {
          href: 'https://discord.gg/EAe4S6HdVC',
          src: discord,
          alt: 'Discord',
        },
        {
          href: 'https://www.youtube.com/channel/UCXg4U9_EQE_cKuU4PfZLn-w',
          src: youtube,
          alt: 'YouTube',
        },
        {
          href: 'https://twitter.com/streamlinesmp',
          src: twitter,
          alt: 'Twitter',
        },
        {
          href: 'https://www.reddit.com/r/StreamlineSMP/',
          src: reddit,
          alt: 'Reddit',
        },
        {
          href: 'https://www.reddit.com/r/StreamlineSMP/',
          src: instagram,
          alt: 'Instagram',
        },
        {
          href: 'https://www.reddit.com/r/StreamlineSMP/',
          src: instagram,
          alt: 'Instagram',
        },
      ],
    },
    {
      title: 'Vote For Us',
      links: [],
    },
    {
      title: 'Learn More',
      links: [],
    },
  ]

  return (
    <>
      <h1 className="main-header red">Join The Conversation</h1>
      {sections.map(({ title }, index) => (
        <>
          <h2 className="sub-header">{title}</h2>
          <div className="grid">
            <a
              target="_blank"
              rel="noreferrer"
              href="https://discord.gg/EAe4S6HdVC"
              className="button large-button"
            >
              <div className="icon">
                <img
                  className="discord"
                  src="./Images/Community/Discord-Logo-Color.png"
                  alt="Discord Icon"
                />
              </div>
              <h3>Discord</h3>
            </a>

            <a
              href="https://www.youtube.com/channel/UCXg4U9_EQE_cKuU4PfZLn-w"
              rel="noreferrer"
              target="_blank"
              className="button large-button"
            >
              <div className="icon">
                <img
                  className="youtube"
                  src="./Images/Community/yt_icon_rgb.png"
                  alt="YouTube Icon"
                />
              </div>
              <h3>YouTube</h3>
            </a>

            <a
              target="_blank"
              rel="noreferrer"
              href="https://twitter.com/streamlinesmp"
              className="button large-button"
            >
              <div className="icon">
                <img
                  src="./Images/Community/2021 Twitter logo - blue.png"
                  alt="Twitter Icon"
                  className="twitter"
                />
              </div>
              <h3>Twitter</h3>
            </a>

            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.reddit.com/r/StreamlineSMP/"
              className="button large-button"
            >
              <div className="icon">
                <img
                  className="reddit"
                  src="./Images/Community/Reddit_Mark_OnWhite.png"
                  alt="Reddit Icon"
                />
              </div>
              <h3>Reddit</h3>
            </a>

            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.instagram.com/streamlinesmp/"
              className="button large-button"
            >
              <div className="icon">
                <img
                  src="./Images/Community/Instagram_Glyph_Gradient_RGB.png"
                  alt="Instagram Icon"
                  className="instagram"
                />
              </div>
              <h3>Instagram</h3>
            </a>

            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.tiktok.com/@streamlinesmp"
              className="button large-button"
            >
              <div className="icon">
                <img
                  src="./Images/Community/372102690_TIKTOK_LOGO_1080.png"
                  alt="TikTok Icon"
                  className="tiktok"
                />
              </div>
              <h3>TikTok</h3>
            </a>
          </div>
        </>
      ))}
    </>
  )
}
