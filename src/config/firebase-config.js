// Importar funciones de los SDKs de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, query, orderBy, getDoc, updateDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAeZVAp9tmwQu3H1ZQ5eBR0SwsLJNmywnU",
    authDomain: "cursosivan-65c0d.firebaseapp.com",
    projectId: "cursosivan-65c0d",
    storageBucket: "cursosivan-65c0d.firebasestorage.app",
    messagingSenderId: "13602686904",
    appId: "1:13602686904:web:d31057a19730c393f2b14d",
    measurementId: "G-JDH3102F3P"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export { auth, db, provider, signInWithPopup, signOut, onAuthStateChanged, collection, addDoc, getDocs, deleteDoc, doc, query, orderBy, getDoc, updateDoc, setDoc };
