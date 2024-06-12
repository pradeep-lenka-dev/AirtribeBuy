// import { useEffect} from "react";
import { notifications } from "@mantine/notifications";
import { useState, useEffect } from "react";
import {airtribebuyCartDB} from "../firebaseConfig/firebaseConfig"
import { db } from "../firebaseConfig/firebaseConfig";
import { v4 } from "uuid"; 
import { ref, uploadBytes } from "firebase/storage";
import { collection } from "firebase/firestore";

import { doc, setDoc ,getDoc} from "firebase/firestore";
import { useCart } from "../context/CartProductContext";

// import AIRTRIBE_API from "../api/baseapi";

export async  function handelAddToCart(product,userId) {
  const { addToCart } = useCart();
  addToCart(product, userId);
  // try {
  //   // Reference to the user's cart document
  //   const docRef = doc(cartProduct, "carts", userId);

  //   // Retrieve the existing cart from Firestore
  //   const docSnap = await getDoc(docRef);

  //   let userCart = [];
  //   if (docSnap.exists()) {
  //     userCart = docSnap.data().items || [];
  //   }

  //   const existingProductIndex = userCart.findIndex(item => item.id === product.id);
  //   if (existingProductIndex !== -1) {
  //     userCart[existingProductIndex].quantity += 1;
  //   } else {
  //     userCart.push({ ...product, quantity: 1 });
  //   }

  //   // Update the cart in Firestore
  //   await setDoc(docRef, { items: userCart });

  //   notifications.show({
  //     title: "Product added to your cart",
  //   });
  // } catch (error) {
  //   console.log("🚀 ~ handelAddToCart ~ error:", error);
  // }

}



export function useGetCartProduct(userId) {
  const [cartProducts, setProducts] = useState([]);

  useEffect(() => {
    async function getCartProduct() {
      try {
        const docRef = doc(db, "carts", userId); // Correct usage
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProducts(docSnap.data().items || []);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.log("🚀 ~ getCartProduct ~ error:", error);
      }
    }

    getCartProduct();
  }, [userId]);

  return cartProducts;
}