import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { initializeFirestore } from 'firebase/firestore';

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

// 🛠️ The correct way to force the 'default' database container in this version:
export const db = initializeFirestore(app, {
  databaseId: '(default)'
});

export const auth = getAuth(app);