const { registerPlugin } = require("@scullyio/scully")
const { log, logError, red, green } = require("@scullyio/scully/utils/log")
const admin = require("firebase-admin")
const serviceAccount = JSON.parse(process.env.FIREBASE_CONFIG)

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://portfolio-82e83.firebaseio.com",
})
const db = admin.firestore()

const addPostToFirebase = async (html, route) => {
  try {
    // console.log(JSON.stringify(route, null, 2))
    await db.doc(`${route.route}`).set(route, { merge: true })
      log(green(`Added ${route.route} to Firebase`))
  } catch (e) {
    logError(red(`Issue adding ${route.route} to Firebase`))
    logError(e)
  }

  return html
}


const validator = async conf => []

registerPlugin("render", "addPostToFirebase", addPostToFirebase, validator)

module.exports.addPostToFirebase = addPostToFirebase
