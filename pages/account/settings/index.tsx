import { BlockToggle, BlockToggles } from 'components/blocks/blocks'

import settings from './settings.module.scss'

export default function Stats({}: StatsProps) {
  const controls: BlockToggle[] = []

  return (
    <>
      <h1>User settings</h1>
      <BlockToggles blockArr={controls} />
    </>
  )
}

interface StatsProps {}
