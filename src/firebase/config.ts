import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyDO4kO_mdipbmNmYG-V_vt3YDVAB2BJjOQ",
  authDomain: "miniblog-f0405.firebaseapp.com",
  projectId: "miniblog-f0405",
  storageBucket: "miniblog-f0405.appspot.com",
  messagingSenderId: "406465440607",
  appId: "1:406465440607:web:ff92f433e16fc4e7fba4ea"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);