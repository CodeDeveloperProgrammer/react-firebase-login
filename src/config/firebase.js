import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
//Para ver si se está enviando la api correcta 
console.log(import.meta.env.VITE_FIREBASE_API_KEY)

const firebaseConfig = {
    apiKey: "AIzaSyAIwwF0Izmc0PozIu3VJfIbpu6WpYkTVi0",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
  };

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const login = ({email, password}) => {
    return signInWithEmailAndPassword(auth, email, password)
};
export const register = ({email, password}) => {
    return createUserWithEmailAndPassword(auth, email, password)
};

export const logout = () => {
    return signOut(auth);
};
