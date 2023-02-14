import { BlockToggle, BlockToggles } from 'components/blocks/blocks'

import Head from 'next/head'
import { LS_KEY } from 'components/banners/banners'
import classnames from 'classnames'
import settings from './settings.module.scss'

export default function Stats({}: StatsProps) {
  const controls: BlockToggle[] = [
    {
      title: 'Light mode',
      description: 'Toggle light mode off and on.',
      controlType: 'message',
      message: 'Light mode is currently unavailable.',
    },
    {
      title: 'Reset banners',
      description: "Clear all the banners you've closed.",
      controlType: 'button',
      buttonText: 'Reset',
      click() {
        localStorage.removeItem(LS_KEY)
        location.reload()
      },
    },
    {
      title: 'Erase user data',
      description: 'Unlink and delete all data related to your Discord account.',
      controlType: 'button',
      buttonText: 'Erase',
      click() {
        const confirmation = confirm(
          'Are you sure? This action will delete all of your user data, including your application.'
        )
        if (!confirmation) return

        // Write delete code here
      },
    },
  ]

  return (
    <>
      <Head>
        <title>Account Settings</title>
      </Head>

      <h1 className={classnames('purple', settings.title)}>Settings</h1>

      <div>
        <h1 className={settings.subheader}>Site</h1>
        <BlockToggles blockArr={controls} />
        <h1 className={settings.subheader}>Profile</h1>
        <div className={settings.informationBlock}>
          <h2>Your profile is connected</h2>
          <p>
            Your profile is connected to Discord, to edit your profile go to{' '}
            <a target="_blank" rel="noreferrer" href="https://discord.com/">
              Discord
            </a>
            .
          </p>
        </div>
      </div>
    </>
  )
}

interface StatsProps {}