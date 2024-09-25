import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDHK-WivbFL6lSrlId9-NXCVl8qepceDxA",
    authDomain: "bd-mondongo.firebaseapp.com",
    projectId: "bd-mondongo",
    storageBucket: "bd-mondongo.appspot.com",
    messagingSenderId: "715341445857",
    appId: "1:715341445857:web:a1564d4a784163a99255a0",
    measurementId: "G-5D57W10W9Z"
};

// Inicializar Firebase si no se ha inicializado previamente
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db };
