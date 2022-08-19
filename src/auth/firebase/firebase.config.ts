// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6GHEeUzyQ0z5nRpfFam18rzMRLqeEibo",
  authDomain: "test-projects-b10ec.firebaseapp.com",
  projectId: "test-projects-b10ec",
  storageBucket: "test-projects-b10ec.appspot.com",
  messagingSenderId: "283021549638",
  appId: "1:283021549638:web:8afd42ab73d416089e6a47",
  measurementId: "G-10YHYLX98N",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
// const analytics = getAnalytics(app);

export { auth, db, storage };
