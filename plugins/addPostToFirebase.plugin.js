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
    if (process.env.DO_SEARCH_INDEX === "false" || process.env.DO_SEARCH_INDEX === "FALSE") {
      logWarn(orange("Not performing db insert, set DO_SEARCH_INDEX environment variable to TRUE"))
      return html
    }

    await db.doc(`${route.route}`).set(route, { merge: true })

    log(green(`Added ${route.route} to Firebase`))

  } catch (e) {
    logError(red(`Issue adding ${route.route} to Firebase`))
    logError(red(JSON.stringify(e, null, 2)))
  }

  return html
}


const validator = async conf => []

registerPlugin("render", "addPostToFirebase", addPostToFirebase, validator)

module.exports.addPostToFirebase = addPostToFirebase
