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
      <div>
        <div>
          <select
            value={action}
            onChange={e => setAction(e.target.value as 'list' | 'add' | 'remove')}>
            <option value="add">Add</option>
            <option value="remove">Remove</option>
            <option value="list">List</option>
          </select>
          <input type="text" onChange={e => setUuid(e.target.value)} value={uuid} />
          <input
            onClick={() => {
              if (action === 'list') {
                const data: StreamlinePluginJSON = {
                  action: 'whitelist',
                  payload: { operation: action },
                }
                return setResult(JSON.stringify(data))
              } else {
                const data: StreamlinePluginJSON = {
                  action: 'whitelist',
                  payload: { operation: action, uuid },
                }
                return setResult(JSON.stringify(data))
              }
            }}
            type="button"
            value="Submit"
          />
          <p>{result}</p>
        </div>
      </div>
    </>
  )
}
