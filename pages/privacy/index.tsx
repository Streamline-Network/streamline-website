import Blocks from 'components/fragments/blocks/blocks'
import { NextSeo } from 'next-seo'
import classnames from 'classnames'
import privacy from './privacy.module.scss'

export default function Privacy() {
  return (
    <>
      <NextSeo
        title="Privacy Policy - How We Protect Your Data"
        description="Read our privacy policy and learn how we protect your data on Streamline SMP, a vanilla whitelist-only Minecraft server."
      />

      <h1 className={classnames('purple', privacy.title)}>Privacy Policy</h1>
      <div>
        <p className={privacy.block}>
          Streamline SMP (“we,” “us,” “our”) is committed to protecting your privacy. This policy
          outlines the types of information we collect from you and how we use it.
        </p>
        <Blocks
          blockArr={[
            {
              title: 'Information we collect',
              paragraphs: [
                <>
                  <ol className={privacy.ol}>
                    <li>
                      In-game activity: We track every move a user makes while in our Minecraft
                      server to ensure compliance with our rules. This includes the use of in-game
                      commands such as “/msg” and “/r”.
                    </li>
                    <li>
                      Discord information: We use Discord as our main platform for communication.
                      When you apply to join our server, we require you to log in with Discord. This
                      gives us access to your email address, Discord ID, profile picture and other
                      information associated with your Discord account.
                    </li>
                    <li>
                      Website data: On the Streamline SMP website, we store user data such as the
                      application you submitted and the aforementioned Discord information.
                    </li>
                    <li>
                      Cookies: We use cookies on the Streamline SMP website to keep you logged in
                      between sessions and authorize API transactions.
                    </li>
                  </ol>
                </>,
              ],
            },
            {
              title: 'How we use your information',
              paragraphs: [
                <>
                  We use the information we collect from you to ensure compliance with our rules and
                  improve your experience on our server and website.
                </>,
              ],
            },
            {
              title: 'Data sharing',
              paragraphs: [
                <>
                  We do not sell or share your data with third parties except for authorized
                  moderators who may view your application.
                </>,
              ],
            },
            {
              title: 'Changes to this policy',
              paragraphs: [
                <>
                  We may update this policy from time to time. Any changes will be posted on this
                  page.
                </>,
              ],
            },
          ]}
        />
        <p className={privacy.block}>
          By using our server and website, you agree to this privacy policy.
        </p>
      </div>
    </>
  )
}
