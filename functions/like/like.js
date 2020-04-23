const admin = require("firebase-admin")
const serviceAccount = JSON.parse(process.env.FIREBASE_CONFIG)
const {firestore} = admin;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://portfolio-82e83.firebaseio.com",
})

const db = admin.firestore();


async function likePost(post) {
  console.log('function data =>', post);

  if ((typeof post !== 'string') || post.length === 0) {
    throw new Error('Argument Exception: The function must be called with one arguments "route" containing the route to the firestore doc');
  }


  return db.doc(post).update({
    likes: firestore.FieldValue.increment(1),
  });
}


exports.handler = async function (event, context, callback) {
  const {route} = JSON.parse(event.body);
  const likes = await likePost(route)

  callback(null, {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(likes)
  })
}
