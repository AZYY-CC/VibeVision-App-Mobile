// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
//Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyCkxB5hQCHehkCEV1Nund2-8rlcBpRdnuY",
  authDomain: "vibevision-app-mobile.firebaseapp.com",
  databaseURL: "https://vibevision-app-mobile-default-rtdb.firebaseio.com",
  projectId: "vibevision-app-mobile",
  storageBucket: "vibevision-app-mobile.appspot.com",
  messagingSenderId: "13103397525",
  appId: "1:13103397525:web:07b94dc4e54e48cd47f99c",
  measurementId: "G-VVP4F2QHX2",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
