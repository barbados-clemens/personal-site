const admin = require("firebase-admin")
const serviceAccount = JSON.parse(process.env.FIREBASE_CONFIG)
const {firestore} = admin;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://portfolio-82e83.firebaseio.com",
})

const db = admin.firestore();


exports.markUserAsVerified = async (docId) => {
  return db.collection('users').doc(docId).set({
    isVerified: true,
    verified_at: new Date(Date.now())
  }, {merge: true})
}


/**
 *
 * @param {string} email
 * @param {string} signUpPage
 * @param {boolean} bot
 * @param {string} token
 *
 * @return {Promise<WriteResult>}
 */
exports.saveToDb = async function ({email, signUpPage, bot, token}) {
  return db.collection('users').doc(token)
    .set({
      email,
      token,
      signUpPage,
      bot,
      created_at: new Date(Date.now())
    }, {merge: true})
}
