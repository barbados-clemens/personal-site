const firebaseConfig = {
  apiKey: "AIzaSyC0CexIiWvUUArBN1Qwk0YLTrzxQ01LKAI",
  authDomain: "portfolio-82e83.firebaseapp.com",
  databaseURL: "https://portfolio-82e83.firebaseio.com",
  projectId: "portfolio-82e83",
  storageBucket: "portfolio-82e83.appspot.com",
  messagingSenderId: "1053843841056",
  appId: "1:1053843841056:web:4abbdf8b7fd00a72",
  measurementId: "G-VTTCM2HFS9"
};

let firebaseInstance;
export const getFirebaseInstance = firebase => {
  if(!!firebaseInstance) {
    return firebaseInstance;
  }

  firebase.initializeApp(firebaseConfig);
  firebaseInstance = firebase;
  return firebase;
}
