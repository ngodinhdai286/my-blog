// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYUuXCxti8vr5TncIP5JlDJbyby4F2C24",
  authDomain: "my-blog-project-455f8.firebaseapp.com",
  projectId: "my-blog-project-455f8",
  storageBucket: "my-blog-project-455f8.appspot.com",
  messagingSenderId: "477926195935",
  appId: "1:477926195935:web:bb14906c4cc37c65ec1f6a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
