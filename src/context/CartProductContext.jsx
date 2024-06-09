import { createContext, useContext, useEffect, useState } from "react";
import { cartProduct } from "../firebaseConfig/firebaseConfig";
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { notifications } from "@mantine/notifications";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children, userId }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (!userId) return;

    const fetchCartItems = async () => {
      const userCartRef = doc(cartProduct, "carts", userId);
      const cartDoc = await getDoc(userCartRef);

      if (cartDoc.exists()) {
        setCartItems(cartDoc.data().items || []);
      } else {
        setCartItems([]);
      }
    };

    fetchCartItems();
  }, [userId]);

  const addToCart = async (product) => {
    const userCartRef = doc(cartProduct, "carts", userId);
    const cartDoc = await getDoc(userCartRef);

    if (!cartDoc.exists()) {
      await setDoc(userCartRef, { items: [] });
    }

    const existingProductIndex = cartItems.findIndex((item) => item.id === product.id);

    if (existingProductIndex !== -1) {
      // Product exists in the cart, update its quantity
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingProductIndex].quantity += 1;

      await updateDoc(userCartRef, {
        items: updatedCartItems,
      });

      setCartItems(updatedCartItems);
    } else {
      // Product does not exist in the cart, add it with quantity 1
      const productWithQuantity = { ...product, quantity: 1 };

      await updateDoc(userCartRef, {
        items: arrayUnion(productWithQuantity),
      });

      setCartItems((prevItems) => [...prevItems, productWithQuantity]);
    }

    notifications.show({
      title: "Product added to your cart",
    });
  };

  const value = {
    cartItems,
    addToCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
