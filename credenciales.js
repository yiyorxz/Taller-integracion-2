// ubicación de este archivo en carpeta src (mondongo/src/credenciales.js)

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHK-WivbFL6lSrlId9-NXCVl8qepceDxA",
  authDomain: "bd-mondongo.firebaseapp.com",
  projectId: "bd-mondongo",
  storageBucket: "bd-mondongo.appspot.com",
  messagingSenderId: "715341445857",
  appId: "1:715341445857:web:a1564d4a784163a99255a0",
  measurementId: "G-5D57W10W9Z"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default appFirebase;