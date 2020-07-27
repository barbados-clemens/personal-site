const {registerPlugin, getMyConfig, log, logError, red, green} = require("@scullyio/scully")
const admin = require("firebase-admin")


export const AddPostToFireBase = 'addPostToFirebasePlugin';

export async function addPostToFirebasePlugin(html, route) {
  try {

    const config = getMyConfig(addPostToFirebasePlugin)

    if (!config) {
      logError(red("Missing firebase configurations, use setPluginConfig"));
      return;
    }

    admin.initializeApp({
      // @ts-ignore
      credential: config.credential, // || throw new Error('Missing credentials for firebase'),
      // @ts-ignore
      databaseURL: config.databaseURL, // "https://portfolio-82e83.firebaseio.com",
    })

    const db = admin.firestore()

    // if (process.env.DO_SEARCH_INDEX === "false" || process.env.DO_SEARCH_INDEX === "FALSE") {
    //   logWarn(orange("Not performing DB Update, set DO_SEARCH_INDEX environment variable to TRUE"))
    //   return html
    // }

    route.data.name = route.data.title;

    await db.doc(`${route.route}`).set(route, {merge: true})

    log(green(`Added ${route.route} to Firebase`))

  } catch (e) {
    logError(red(`Issue adding ${route.route} to Firebase`))
    logError(red(e))
  }

  return html
}


const validator = async conf => []

registerPlugin("render", AddPostToFireBase, addPostToFirebasePlugin, validator)

