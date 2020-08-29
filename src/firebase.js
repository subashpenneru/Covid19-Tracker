import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyDkdAeDFwwwJZuKnZzZ16KlwvtF9qGVCvU',
  authDomain: 'fb-5595-93731.firebaseapp.com',
  databaseURL: 'https://fb-5595-93731.firebaseio.com',
  projectId: 'fb-5595-93731',
  storageBucket: 'fb-5595-93731.appspot.com',
  messagingSenderId: '790158685052',
  appId: '1:790158685052:web:bb37da7138083bd2bc2af9',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
