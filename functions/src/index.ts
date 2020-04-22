import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import {getTopTweets, TwitterAuthContext} from './twitter';

const {firestore} = admin;

const cache = {
  lastFetch: 0,
  tweets: [],
};

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

export const getTweets = functions.https.onCall(async (data: any, context) => {
  const timeSinceLastFetch = Date.now() - cache.lastFetch;
  if (timeSinceLastFetch <= 300000) {
    console.log('HIT tweet cache')
    // less 5 mins, serve up cache
    return cache.tweets;
  }

  console.log('MISS tweet cache')
  const {
    secret,
    token,
    user_secret,
    user_key,
  } = functions.config().twitter;

  const authCtx: TwitterAuthContext = {
    version: '1.1',
    subdomain: 'api',
    access_token_key: token,
    access_token_secret: secret,
    consumer_key: user_key,
    consumer_secret: user_secret,
  };

  const tweets = await getTopTweets(data.count || 3, authCtx);

  cache.lastFetch = Date.now();
  cache.tweets = tweets;

  return tweets;
});
