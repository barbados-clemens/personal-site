import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const {firestore} = admin;

const db = admin.initializeApp().firestore();
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

export const likePost = functions.https.onCall((data, context) => {
  console.log('function data => ', JSON.stringify(data, null, 2));
  if ((typeof data.route !== 'string') || data.route.length === 0) {
    throw new functions.https.HttpsError('invalid-argument', 'The function must be called with one arguments "route" containing the route to the firestore doc');
  }

  return db.doc(data.route).update({
    likes: firestore.FieldValue.increment(1),
  });
});
