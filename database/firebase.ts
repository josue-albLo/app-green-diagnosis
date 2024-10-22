// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBefvWJlOBZsmdCnQoZHJHAKdLQJLDcH8E",
  authDomain: "db-green-data.firebaseapp.com",
  projectId: "db-green-data",
  storageBucket: "db-green-data.appspot.com",
  messagingSenderId: "778680165019",
  appId: "1:778680165019:web:fa758d3f97414ef4f0dc3e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export default { db, auth, storage };