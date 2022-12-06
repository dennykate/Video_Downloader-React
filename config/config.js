import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getFirestore, initializeFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDQOrcFXVI9VA3rw-75OJATzZ9JvgKSTm8",
  authDomain: "mrpussy.firebaseapp.com",
  projectId: "mrpussy",
  storageBucket: "mrpussy.appspot.com",
  messagingSenderId: "817874613654",
  appId: "1:817874613654:web:0a71251ed92f7f57e5d9b7",
};

const db = firebase.initializeApp(firebaseConfig);
const firestore = getFirestore(db);

export { db, firestore };
