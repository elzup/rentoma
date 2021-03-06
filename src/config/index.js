// @flow

const {
  NODE_ENV,
  REACT_APP_FIREBASE_API_KEY,
  REACT_APP_FIREBASE_AUTH_DOMAIN,
  REACT_APP_FIREBASE_DATABASE_URL,
  REACT_APP_FIREBASE_PROJECT_ID,
  REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
} = process.env

const isDev = NODE_ENV === 'development'

const configDevelopment = {
  admin: {
    name: 'admin',
    countMax: 100,
  },
}
const configProduction = {
  admin: {
    name: 'proadmin',
    countMax: 100,
  },
}

const config = {
  isDev,
  tabBarHeight: 40,
  firebase: {
    apiKey: REACT_APP_FIREBASE_API_KEY || '',
    authDomain: REACT_APP_FIREBASE_AUTH_DOMAIN || '',
    databaseURL: REACT_APP_FIREBASE_DATABASE_URL || '',
    projectId: REACT_APP_FIREBASE_PROJECT_ID || '',
    messagingSenderId: REACT_APP_FIREBASE_MESSAGING_SENDER_ID || '',
  },

  clockIntervalMs: 5000,
  admin: { name: '', countMax: 0 },
  ...(isDev ? configDevelopment : configProduction),
}

export default config
