import { useEffect, useState } from 'react'

import application from './application.module.scss'

export default function Reviewed() {
  const [copied, setCopied] = useState(false)

  return (
    <div>
      <div className={application.block}>
        <h3>Join the Minecraft Server!</h3>
        <p
          onClick={() => {
            if (copied) return
            navigator.clipboard.writeText('play.streamlinesmp.com')
            setCopied(true)

            setTimeout(() => setCopied(false), 1000)
          }}
          className={application.serverIp}>
          {copied ? 'Copied!' : 'play.streamlinesmp.com'}
        </p>
      </div>
      <h2 className={application.subTitle}>MORE</h2>
      <div className={application.block}>
        <h3>Apply to join staff.</h3>
        <p>You must have been a Streamliner for at least 1 month to join staff.</p>
        <button className={application.blockButton}>Apply for staff</button>
      </div>
    </div>
  )
}
