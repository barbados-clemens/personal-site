import { HttpsError } from "firebase-functions/lib/providers/https"

// @ts-ignore
// const cors = require('cors')({origin: true})

import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();
const db = admin.firestore();

exports.contactForm = functions.https.onCall(async (data: any, context: any) => {

  console.log(data);

  await db.collection("contact")
    .add({
      created_at: new Date(),
      ...data,
    })
    .catch(err => {
      console.error('runtime error saving to db',err)
      throw new HttpsError("unknown", err)
    });

  return {
    data: data,
    context: context
  }
})
