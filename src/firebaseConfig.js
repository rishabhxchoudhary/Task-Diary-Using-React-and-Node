import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCsCBxk-TUFrIQDAZO7_hCADt4oHkjfN6U",
  authDomain: "task-diary-f0c1c.firebaseapp.com",
  projectId: "task-diary-f0c1c",
  storageBucket: "task-diary-f0c1c.appspot.com",
  messagingSenderId: "803896663960",
  appId: "1:803896663960:web:5eb41ce3adfaa55c3355ed"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
