import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// We won't strictly use analytics in this node environment but good to keep if needed on client
// import { getAnalytics } from "firebase/analytics"; 

const firebaseConfig = {
    apiKey: "AIzaSyD5mmeFwtKwqyTU09Wvu7rCsnosco8c40Y",
    authDomain: "sociup-web.firebaseapp.com",
    projectId: "sociup-web",
    storageBucket: "sociup-web.firebasestorage.app",
    messagingSenderId: "58241994094",
    appId: "1:58241994094:web:b7e6c50eb2e911f400457f",
    measurementId: "G-SYJNXC85QV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
