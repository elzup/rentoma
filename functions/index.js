const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()

const getTimes = () => {
  const timestamp = new Date().getTime() + 1000 * 60 * 60 * 9
  const dateJP = new Date(timestamp)
  const y = dateJP.getFullYear()
  const m = `${dateJP.getMonth() + 1}`.padStart(2, 0)
  // ex 2018-01
  const ym = `${y}-${m}`
  const d = `${dateJP.getDate()}`.padStart(2, 0)
  const h = `${dateJP.getHours()}`.padStart(2, 0)
  const timePath = `${ym}/${d}/${h}`
  return { ym, d, h, timePath, timestamp }
}

exports.log = functions.https.onRequest((req, response) => {
  const { body, headers } = req
  const { timePath, timestamp } = getTimes()

  const requestURL = req.protocol + '://' + req.get('host') + req.originalUrl
  const remoteAddress =
    req.headers['x-forwarded-for'] || req.connection.remoteAddress
  const general = {
    requestURL,
    requestMethod: req.method,
    remoteAddress
  }
  const log = {
    general,
    headers,
    body,
    timestamp
  }

  const callback = error => {
    if (error) {
      console.log('save error', error.message)
      response
        .status(500)
        .send(error.message)
        .end()
    }
  }

  admin
    .database()
    .ref('/log')
    .push(log, callback)
  admin
    .database()
    .ref(`/hour-log/${timePath}`)
    .push(log, callback)

  console.log('save success')
  response.status(200).end()
})
