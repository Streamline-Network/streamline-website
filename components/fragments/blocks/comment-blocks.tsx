import { ApplyApplicationState, Comment } from 'pages/api/db/database'
import { useEffect, useState } from 'react'

import Image from 'next/image'
import { QueryResponse } from 'pages/api/db/forms/apply/collection-group'
import blocks from './blocks.module.scss'
import customFetch from 'utils/fetch'
import { getRelativeTime } from 'utils/misc'
import { useSession } from 'next-auth/react'

export default function CommentBlocks({
  applicationData,
  setApplicationData,
  currentApplicationUuid,
}: CommentBlocksProps) {
  const comments = applicationData.application.comments!

  const [input, setInput] = useState('')
  const { data, status } = useSession()

  const rtf = new Intl.RelativeTimeFormat(undefined, { style: 'short' })

  async function sendComment() {
    if (!input) return
    setInput('')
    const comment: Comment = {
      message: input,
      senderId: data!.id,
      time: Date.now(),
      name: data!.user!.name!,
      senderPicture: data!.user!.image!,
    }
    setApplicationData(appData => {
      const index = appData!.findIndex(
        app => app.application.minecraftUuid === currentApplicationUuid
      )
      const newArr = [...appData!]

      let comments = newArr[index].application.comments
      comments ? comments.push(comment) : (comments = [comment])

      newArr[index].application.comments = comments

      return newArr
    })

    await customFetch<undefined, QueryResponse>(
      '/api/db/forms/apply/review',
      'POST',
      applicationData
    )
  }

  function getAction(action: ApplyApplicationState) {
    switch (action) {
      case 'accepted':
        return <span className={blocks.commentAccepted}>Accepted application</span>
      case 'denied':
        return <span className={blocks.commentDenied}>Denied application</span>
      case 'pending':
        return <span className={blocks.commentPending}>Held application for review</span>
    }
  }

  return (
    <div className={blocks.wrapper}>
      {comments ? (
        <>
          <div className={blocks.block}>
            <h2>Comments about this application</h2>
          </div>
          {status === 'authenticated'
            ? comments.map(({ time, message, name, senderPicture, decision, userAction }, i) => {
                return (
                  <div className={blocks.block} key={i}>
                    <div>
                      <div className={blocks.commentTitle}>
                        <Image width={30} height={30} src={senderPicture} alt={''} />
                        <h2>{name}</h2>
                        {decision && getAction(decision)}
                        {userAction && <span className={blocks.userAction}>{userAction}</span>}
                        <span>{getRelativeTime(time, rtf)}</span>
                      </div>
                    </div>
                    {message && <p className={blocks.commentMessage}>{message}</p>}
                  </div>
                )
              })
            : applicationData.application.comments!.map((_, i) => (
                <div className={blocks.block} key={i}>
                  <div className={blocks.blockLoading} />
                </div>
              ))}
          <div className={blocks.block}>
            <h2>Add a comment</h2>
            <form
              onSubmit={e => {
                e.preventDefault()
                sendComment()
              }}
              className={blocks.commentInput}>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Type your comment here..."
                className={blocks.input}
                type="text"
              />
              <button>Send</button>
            </form>
          </div>{' '}
        </>
      ) : (
        <>
          <div className={blocks.block}>
            <h2>There are no comments on this application.</h2>
            <p>Be the first to comment:</p>
            <form
              onSubmit={e => {
                e.preventDefault()
                sendComment()
              }}
              className={blocks.commentInput}>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Type your comment here..."
                className={blocks.input}
                type="text"
              />
              <button>Send</button>
            </form>
          </div>
        </>
      )}
    </div>
  )
}

interface CommentBlocksProps {
  applicationData: QueryResponse
  setApplicationData: React.Dispatch<React.SetStateAction<QueryResponse[] | undefined>>
  currentApplicationUuid: string
}
