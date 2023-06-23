import { BlockToggle } from 'components/fragments/blocks/block-types'
import { LS_KEY } from 'components/layout/banners/banners'
import Link from 'next/link'
import { NextSeo } from 'next-seo'
import ToggleBlocks from 'components/fragments/blocks/toggle-blocks'
import classnames from 'classnames'
import settings from './settings.module.scss'
import { signOut } from 'next-auth/react'

export default function Settings() {
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
      async click() {
        const confirmation = confirm(
          'Are you sure? This action will delete all of your user data, including your application.'
        )
        console.log(confirmation)

        if (!confirmation) return

        signOut()
        await fetch('/api/db/settings/erase')
      },
    },
  ]

  return (
    <>
      <NextSeo
        title="Settings"
        description="Adjust the website settings and your account settings."
      />

      <h1 className={classnames('purple', settings.title)}>Settings</h1>

      <div>
        <h2 className={settings.subheader}>Site</h2>
        <ToggleBlocks blockArr={controls} />
        <h2 className={settings.subheader}>Profile</h2>
        <div className={settings.informationBlock}>
          <h3>Your profile is connected</h3>
          <p>
            Your profile is connected to Discord, to edit your profile go to{' '}
            <Link target="_blank" rel="noreferrer" href="https://discord.com/">
              Discord
            </Link>
            .
          </p>
        </div>
      </div>
    </>
  )
}
