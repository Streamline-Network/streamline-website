import { DocsReqBody } from './api/db/docs'
import { useState } from 'react'

export default function Stats({}: StatsProps) {
  const [finalResult, setFinalResult] = useState({
    accountData: 'No data yet',
    formData: 'No data yet',
    userData: 'No data yet',
  })

  async function getUserData() {
    const documents = ['role', 'image', 'name'] as const
    const result: object[] = []

    for (const document of documents) {
      const request: DocsReqBody = {
        collection: 'users',
        userId: 'lwRobA9rEAeC5zedIPir',
        documentOrCollection: {
          type: 'document',
          document: document,
        },
      }

      const response = await (
        await fetch('./api/db/docs', {
          method: 'PUT',
          body: JSON.stringify(request),
        })
      ).json()

      result.push(response)
    }

    setFinalResult({ ...finalResult, userData: JSON.stringify(result) })
  }

  async function getFormData() {
    setFinalResult({ ...finalResult, formData: 'Not set up yet!' })
  }

  async function getAccountData() {
    const request: DocsReqBody = {
      collection: 'accounts',
      uniqueId: 'Gvh2UKzBR85X277OIhOT',
      document: 'userId',
    }

    const result = await (
      await fetch('./api/db/docs', {
        method: 'PUT',
        body: JSON.stringify(request),
      })
    ).json()

    setFinalResult({
      ...finalResult,
      accountData: JSON.stringify(result),
    })
  }

  return (
    <div>
      <h3>Get account data</h3>
      <button onClick={getAccountData}>Test API</button>
      <div>{finalResult.accountData}</div>
      <h3>Get user data</h3>
      <button onClick={getUserData}>Test API</button>
      <div>{finalResult.userData}</div>
      <h3>Get form data</h3>
      <button onClick={getFormData}>Test API</button>
      <div>{finalResult.formData}</div>
    </div>
  )
}

interface StatsProps {}
