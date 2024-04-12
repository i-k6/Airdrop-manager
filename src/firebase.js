import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD97QMb5p2ZwPsRMUTRYaxvSX61yncbFA8",
  authDomain: "todo-app-55f34.firebaseapp.com",
  projectId: "todo-app-55f34",
  storageBucket: "todo-app-55f34.appspot.com",
  messagingSenderId: "941937980228",
  appId: "1:941937980228:web:b08c19c4c1b30b96fe5d11",
  measurementId: "G-ZKEB42RM4C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Initialize Firestore

export { db };

