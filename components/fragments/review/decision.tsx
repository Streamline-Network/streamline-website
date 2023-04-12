import Blocks from '../blocks/blocks'
import decision from './decision.module.scss'
import { useState } from 'react'

export default function Decision() {
  const [reasoning, setReasoning] = useState('')

  const buttons: Button[] = [
    {
      name: 'Deny',
      class: 'deny',
      function: () => {},
    },
    {
      name: 'Hold For Review',
      class: 'review',
      function: () => {},
    },
    { name: 'Accept', class: 'accept', function: () => {} },
  ]

  return (
    <Blocks
      blockArr={[
        {
          title: 'Review application',
          paragraphs: [<>Remember to give a reason for denying, and holding for review!</>],
        },
        {
          title: 'Give your reasoning',
          paragraphs: [
            <>
              Note: Users can see the reason they were denied, if there is no reason given, they see
              &quot;No reason given&quot;.
            </>,
            <>
              <textarea
                className={decision.reason}
                value={reasoning}
                placeholder="What is your reason for your decision?"
                onChange={e => setReasoning(e.target.value)}
              />
            </>,
            <>
              <div className={decision.buttonWrapper}>
                {buttons.map((button, i) => (
                  <button key={i} className={decision[button.class]} onClick={button.function}>
                    {button.name}
                  </button>
                ))}
              </div>
            </>,
          ],
        },
      ]}
    />
  )
}

type Button = {
  name: string
  class: string
  function: () => void
}
