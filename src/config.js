
import { initializeApp } from 'firebase/app';
import { getAuth,signInWithEmailAndPassword,createUserWithEmailAndPassword,onAuthStateChanged} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { serverTimestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDB29fIOmr8P-Bfbi42TV-mLYRRBzyv7oI',
  authDomain: 'project-3fb70.firebaseapp.com',
  projectId: 'project-3fb70',
  storageBucket: 'project-3fb70.appspot.com',
  messagingSenderId: '98381283519',
  appId: '1:98381283519:web:1cc0b9c9938d1e1e83c60a',
  measurementId: 'G-K5Q7XTGZ63',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const projectAuth = getAuth(app);
const projectFirestore = getFirestore(app);
const timestamp = serverTimestamp();
const projectStorage = getStorage(app);

export { projectAuth,signInWithEmailAndPassword,createUserWithEmailAndPassword, onAuthStateChanged,projectFirestore, timestamp, projectStorage }
