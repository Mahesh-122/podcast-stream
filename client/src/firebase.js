// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCoPmrFqrc9W6KVesvarfRld3twsIVz27o",
  authDomain: "podstreaming01.firebaseapp.com",
  projectId: "podstreaming01",
  storageBucket: "podstreaming01.appspot.com",
  messagingSenderId: "260496651504",
  appId: "1:260496651504:web:331e1853b0730e7a8d3e35",
  measurementId: "G-GWYY8BDMZP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app)
console.log(storage)

export default app;