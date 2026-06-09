import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCXU3AiLSSl2RPBrJP6s0dOgs_T0Sb1FjY",
  authDomain: "speed-rental-rak.firebaseapp.com",
  projectId: "speed-rental-rak",
  storageBucket: "speed-rental-rak.firebasestorage.app",
  messagingSenderId: "917938638656",
  appId: "1:917938638656:web:6ec6435de59818f28fb4a5"
};

// Initialize Firebase production app
const app = initializeApp(firebaseConfig);

// Force Firestore to look inside your specific 'default' data vault
export const db = getFirestore(app, "(default)");
export const auth = getAuth(app);