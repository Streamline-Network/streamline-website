import { useState } from 'react'

export default function Stats({}: StatsProps) {
  const [result, setResult] = useState('Nothing yet')

  async function test() {
    const result = await (await fetch('./api/db/docs')).json()
    setResult(result.error || result.content)
  }

  return (
    <>
      <h1>Test</h1>
      <button onClick={test}>Test API</button>
      <div>{result}</div>
    </>
  )
}

interface StatsProps {}
