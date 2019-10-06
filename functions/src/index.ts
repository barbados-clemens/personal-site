import * as functions from "firebase-functions"
import * as admin from "firebase-admin"
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

admin.initializeApp()
const db = admin.firestore()

exports.contactForm = functions.https.onCall((data, context) => {
  console.log(data)

  return db.collection("contact")
    .add({
      created_at: new Date(),
      ...data,
    })
    .then(res => console.log("document created"))
    .catch(err => {
      console.error(err)
      return new functions.https.HttpsError("unknown", err)
    })

})
