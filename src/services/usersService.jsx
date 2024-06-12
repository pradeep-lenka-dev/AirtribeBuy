// src/services/userService.js
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig/firebaseConfig";
const USERS_COLLECTION = "users";

export const addUser = async (userData) => {
  console.log("🚀 ~ addUser ~ userData:", userData)
  try {
    const docRef = await addDoc(collection(db, USERS_COLLECTION), userData);
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};
