
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCZStQRyZDNBWJfwFIntnbS9BazjrHAh9A",
  authDomain: "airtribebuy-9218d.firebaseapp.com",
  databaseURL: "https://airtribebuy-9218d-default-rtdb.firebaseio.com",
  projectId: "airtribebuy-9218d",
  storageBucket: "airtribebuy-9218d.appspot.com",
  messagingSenderId: "236531549512",
  appId: "1:236531549512:web:b644662c38a500f030df7d",
  measurementId: "G-6GBB72ST4Y"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const airtribebuyCartDB = getStorage (app)
const db = getFirestore(app)

export {airtribebuyCartDB, db}
