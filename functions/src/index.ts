import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();
const db = admin.firestore();

exports.contactForm = functions.https.onCall((data: any, context: any) => {
  console.log(data);

  return db
    .collection("contact")
    .add({
      created_at: new Date(),
      ...data,
    })
    .then(res => console.log("document created"))
    .catch(err => {
      console.error(err)
      return new functions.https.HttpsError("unknown", err)
    });

})
