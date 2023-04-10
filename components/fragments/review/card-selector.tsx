import ApplicationCard, { ApplicationCardProps } from './card'

import { Database } from 'pages/api/db/database'
import card from './card-styles.module.scss'

export default function CardSelector({
  applications,
  currentApplicationUuid,
  setCurrentApplicationUuid,
}: CardSelectorProps) {
  return (
    <div className={card.selector}>
      <ApplicationCard
        age={18}
        appliedTime={1681149193419}
        minecraftName={'Hex32'}
        minecraftUuid={'a652bd11-556d-476d-9376-5090d3038729'}
        versions={['Java', ' Bedrock']}
        state={'accepted'}
      />
      <ApplicationCard
        age={18}
        appliedTime={1681149193419}
        minecraftName={'Hex32'}
        minecraftUuid={'a652bd11-556d-476d-9376-5090d3038729'}
        versions={['Java', ' Bedrock']}
        state={'accepted'}
      />
      <ApplicationCard
        age={18}
        appliedTime={1681149193419}
        minecraftName={'Hex32'}
        minecraftUuid={'a652bd11-556d-476d-9376-5090d3038729'}
        versions={['Java', ' Bedrock']}
        state={'accepted'}
      />
      <ApplicationCard
        age={18}
        appliedTime={1681149193419}
        minecraftName={'dawdawdwddwawd'}
        minecraftUuid={'a652bd11-556d-476d-9376-5090d3038729'}
        versions={['Java', ' Bedrock']}
        state={'accepted'}
      />
      <ApplicationCard
        age={18}
        appliedTime={1681149193419}
        minecraftName={'Hex32'}
        minecraftUuid={'a652bd11-556d-476d-9376-5090d3038729'}
        versions={['Java', ' Bedrock']}
        state={'accepted'}
      />
      <ApplicationCard
        age={18}
        appliedTime={1681149193419}
        minecraftName={'Hex32'}
        minecraftUuid={'a652bd11-556d-476d-9376-5090d3038729'}
        versions={['Java']}
        state={'accepted'}
      />
    </div>
  )
}

interface CardSelectorProps {
  applications: Database.Applications.Apply[]
  currentApplicationUuid: string | -1
  setCurrentApplicationUuid: React.Dispatch<React.SetStateAction<string | -1>>
}
