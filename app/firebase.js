// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import{getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAieNSIV-OdN4CF1jQeNbKyGAinsz2_McE",
  authDomain: "pantry-tracker-2fd86.firebaseapp.com",
  projectId: "pantry-tracker-2fd86",
  storageBucket: "pantry-tracker-2fd86.appspot.com",
  messagingSenderId: "867885169574",
  appId: "1:867885169574:web:48da038332966c88dc6d67",
  measurementId: "G-FFD1969YRF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore =getFirestore(app);

export {firestore};
