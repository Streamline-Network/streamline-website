import application from './application.module.scss'

export default function Loading() {
  return (
    <div className={application.skeletonWrapper}>
      <div className={application.subTitle} />
      <div className={application.block} />
    </div>
  )
}
