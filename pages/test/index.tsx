import { useEffect, useState } from 'react'

export default function Test() {
  const [path, setPath] = useState('')
  const [result, setResult] = useState('')

  useEffect(() => {
    fetch('/api/db/docs', {
      method: 'PUT',
      body: JSON.stringify({ path: path }),
    }).then(r => r.json().then(r => setResult(JSON.stringify(r))))
  }, [path])

  return (
    <div>
      <h2>Debugging site for testing.</h2>
      <input style={{ width: '50vw' }} type="text" onChange={e => setPath(e.currentTarget.value)} />
      <label>Set path</label>
      <p>{result}</p>
    </div>
  )
}
