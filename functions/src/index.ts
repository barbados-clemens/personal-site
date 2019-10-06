import { HttpsError } from "firebase-functions/lib/providers/https"
import * as functions from "firebase-functions"
import * as admin from "firebase-admin"

admin.initializeApp()
const db = admin.firestore()

exports.contactForm = functions.https.onCall(async (data: any, context: any) => {

  console.log(data)

  return db.collection("contact")
    .add({
      created_at: new Date(),
      ...data,
    })
    .then(res => {
      return {
        ...data,
      }
    })
    .catch(err => {
      console.error("runtime error saving to db", err)
      return new HttpsError("internal", err, "Something went wrong with saving data to database. View server logs to see what went wrong")
    })
})
