import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyDnHaoXbgxp80YKs2k2-6F2-U-kURRSd28",
    authDomain: "udoor-12ff9.firebaseapp.com",
    projectId: "udoor-12ff9",
    storageBucket: "udoor-12ff9.appspot.com",
    messagingSenderId: "581513444220",
    appId: "1:581513444220:web:b0fb21ddfd3f34171dc2f9"
};

const app = initializeApp(firebaseConfig);
export const imageDB = getStorage(app);