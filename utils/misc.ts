export function random(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function getRelativeTime(
  eventTime: number,
  rtf: Intl.RelativeTimeFormat
) {
  const secondsSince = Math.round((eventTime - Date.now()) / 1000)
  const minutesSince = Math.round(secondsSince / 60)
  const hoursSince = Math.round(minutesSince / 60)
  const daysSince = Math.round(hoursSince / 24)
  const weeksSince = Math.round(daysSince / 7)

  switch (true) {
    case secondsSince > -60:
      return rtf.format(secondsSince, 'seconds')

    case minutesSince > -60:
      return rtf.format(minutesSince, 'minutes')

    case hoursSince > -24:
      return rtf.format(hoursSince, 'hours')

    case daysSince > -7:
      return rtf.format(daysSince, 'days')

    default:
      return rtf.format(weeksSince, 'weeks')
  }
}
