const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()

const getTimes = () => {
  const timestamp = new Date().getTime()
  const dateJP = new Date(timestamp + 1000 * 60 * 60 * 9)
  const y = dateJP.getFullYear()
  const m = `${dateJP.getMonth() + 1}`.padStart(2, 0)
  // ex 2018-01
  const ym = `${y}-${m}`
  const d = `${dateJP.getDate()}`.padStart(2, 0)
  const h = `${dateJP.getHours()}`.padStart(2, 0)
  const timePath = `${ym}/${d}/${h}`
  return { ym, d, h, timePath, timestamp }
}

const filterHeadersKeys = [
  'x-appengine-api-ticket',
  'x-appengine-city',
  'x-appengine-citylatlong',
  'x-appengine-country',
  'x-appengine-default-version-hostname',
  'x-appengine-https',
  'x-appengine-region',
  'x-appengine-request-log-id',
  'x-appengine-user-ip',
  'x-forwarded-for',
  'x-forwarded-host',
  'x-forwarded-proto',
  'x-forwarded-server',
  'x-forwarded-url',
  'x-cloud-trace-context',
  'fastly-client',
  'fastly-client-ip',
  'fastly-orig-accept-encoding',
  'fastly-ff',
  'fastly-ssl',
  'fastly-temp-xff',
  'function-execution-id',
  'x-nginx-proxy',
  'x-real-ip',
  'x-timer',
  'x-varnish'
]

exports.log = functions.https.onRequest((req, response) => {
  const { body, headers, httpVersion, originalUrl, protocol, method } = req
  filterHeadersKeys.forEach(key => {
    delete headers[key]
  })
  const { timePath, timestamp } = getTimes()

  const url = protocol + '://' + req.get('host') + originalUrl
  const general = {
    url,
    protocol,
    httpVersion,
    method,
    path: originalUrl
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
  response.status(200).end('log success')
})
