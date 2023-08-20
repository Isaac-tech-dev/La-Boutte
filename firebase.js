// Import the functions you need from the SDKs you need
//import * as firebase from './firebase'; // Use the correct path
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAuR2UkBUTsIOJ6puW3WPC8KUcyhBmjRlI",
  authDomain: "la-boutte-auth.firebaseapp.com",
  projectId: "la-boutte-auth",
  storageBucket: "la-boutte-auth.appspot.com",
  messagingSenderId: "328475648191",
  appId: "1:328475648191:web:fb4e5b7d94de6323d8e60a"
};

// // Initialize Firebase
// let app;
// if (!firebase.apps.length) {
//   app = initializeApp(firebaseConfig);
// } else {
//   app = firebase.app();
// }

// const auth = firebase.auth();

// export { auth };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get the auth instance
const auth = getAuth(app);

export { auth };