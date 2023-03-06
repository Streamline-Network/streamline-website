import { useEffect, useState } from 'react'

export default function Test() {
  const [path, setPath] = useState('')
  const [result, setResult] = useState('')
  const [isWriting, setIsWriting] = useState(false)
  const [data, setData] = useState('')

  useEffect(() => {
    fetch('/api/db/docs', {
      method: isWriting ? 'POST' : 'PUT',
      body: JSON.stringify(isWriting ? { path } : { path, data, isMerge: true }),
    }).then(r => r.json().then(r => setResult(JSON.stringify(r))))
  }, [path, isWriting, data])

  return (
    <div>
      <h2>Debugging site for testing.</h2>
      <input type="checkbox" onChange={() => setIsWriting(!isWriting)} /> <label>Is Writing?</label>
      <input style={{ width: '60vw' }} type="text" onChange={e => setPath(e.currentTarget.value)} />
      <label>Set path</label>
      {isWriting && (
        <>
          <input
            style={{ width: '60vw' }}
            type="text"
            onChange={e => setData(e.currentTarget.value)}
          />
          <label>Data</label>
        </>
      )}
      <p>{result}</p>
    </div>
  )
}
