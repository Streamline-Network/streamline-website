export default function Banner({ title, message, color }: BannerProps) {
  return (
    <div className="notifications">
      <div>{title}</div>
      {message}
    </div>
  )
}

export interface BannerProps {
  title: string
  message: string
  color: string
}
