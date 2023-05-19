import { StreamlinePluginJSON } from 'types'
import classNames from 'classnames'
import rules from './rules.module.scss'
import { useState } from 'react'

export default function Rules() {
  const [uuid, setUuid] = useState('')
  const [action, setAction] = useState<'list' | 'add' | 'remove'>('list')
  const [result, setResult] = useState('')

  return (
    <>
      <h1 className={classNames('orange', rules.title)}>Rules</h1>
      <div>Under Construction 🏗️</div>
    </>
  )
}
