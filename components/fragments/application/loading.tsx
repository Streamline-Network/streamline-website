import application from './application.module.scss'

export default function Loading({ hideTitle = false }: LoadingProps) {
  return (
    <div className={application.skeletonWrapper}>
      {!hideTitle && <div className={application.subTitle} />}
      <div className={application.block} />
    </div>
  )
}

interface LoadingProps {
  hideTitle?: boolean
}
