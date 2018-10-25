// @flow

import moment from 'moment'

export const timeLabel = (timestamp: number) => {
  const m = moment(timestamp)
  return m.format(`YYYY-MM-DD HH:mm:ss (${m.fromNow()})`)
}

export function download(text, filename, mimeType = 'text/plain') {
  const href = `data:${mimeType};charset=utf-8,` + encodeURIComponent(text)
  const a = document.createElement('a')
  a.setAttribute('href', href)
  a.setAttribute('download', filename)
  document.body && document.body.appendChild(a)
  a.click()
  a.remove()
}
