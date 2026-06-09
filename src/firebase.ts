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

// Force Firestore to look inside your specific 'default' data vault
export const db = initializeFirestore(app, {
  databaseId: '(default)'
});

export const auth = getAuth(app);

// 🛠️ RESTORE MISSING ADMIN UTILITIES TO FIX THE NETLIFY BUILD ERROR:

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | null;
    email: string | null;
    emailVerified: boolean | null;
    isAnonymous: boolean | null;
    tenantId: string | null;
    providerInfo: {
      providerId: string | null;
      email: string | null;
    }[];
  };
}

export function handleFirestoreError(error: any, operationType?: OperationType, path?: string): FirestoreErrorInfo {
  const errorMessage = error instanceof Error ? error.message : String(error);
  const currentUser = auth.currentUser;

  return {
    error: errorMessage,
    operationType: operationType || OperationType.WRITE,
    path: path || null,
    authInfo: {
      userId: currentUser?.uid || null,
      email: currentUser?.email || null,
      emailVerified: currentUser?.emailVerified || null,
      isAnonymous: currentUser?.isAnonymous || null,
      tenantId: currentUser?.tenantId || null,
      providerInfo: (currentUser?.providerData || []).map(p => ({
        providerId: p.providerId,
        email: p.email
      }))
    }
  };
}