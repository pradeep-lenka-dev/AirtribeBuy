// src/services/userService.js
import { collection, addDoc, getDoc,doc,query,where,getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig/firebaseConfig";
const USERS_COLLECTION = "users";

export const addUser = async (userData) => {
  try {
    const docRef = await addDoc(collection(db, USERS_COLLECTION), userData);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};



export const loginUser = async (loginData) => {
  try {
    const { emailORmobile, password } = loginData;

    if (!emailORmobile || !password) {
      throw new Error("Email/Mobile and password are required");
    }

    const usersRef = collection(db, USERS_COLLECTION);
    const emailQuery = query(usersRef, where("email", "==", emailORmobile));
    const mobileQuery = query(usersRef, where("mobile", "==", emailORmobile));

    const [emailSnapshot, mobileSnapshot] = await Promise.all([
      getDocs(emailQuery),
      getDocs(mobileQuery)
    ]);

    const combinedDocs = [...emailSnapshot.docs, ...mobileSnapshot.docs];
    
    if (combinedDocs.length === 0) {
      console.log("No such document!");
      return;
    }

    const userDoc = combinedDocs[0];
    const userData = userDoc.data();

    if (userData.password === password) {
      console.log("Login successful!");
      localStorage.setItem("AuthToken", "userdummyauthtoken");

    } else {
      console.log("Invalid password");
      // Handle invalid password case
    }
  } catch (error) {
    console.error("Error fetching document:", error);
  }
};

