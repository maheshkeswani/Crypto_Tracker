import firebaseConfig from "./config/firebaseConfig";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app) ;
const db = getFirestore(app)

export {auth,db,analytics}