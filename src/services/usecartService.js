// import { useEffect} from "react";
import { notifications } from "@mantine/notifications";
import { useState, useEffect } from "react";

// import AIRTRIBE_API from "../api/baseapi";

export function handelAddToCart(product) {
  try {
    const userCart = JSON.parse(localStorage.getItem("cartProduct")) || [];
    const existingProductIndex = userCart.findIndex(item => item.id === product.id);
// const userCartSet = new Set (userCart.map(item =>item.id))
    // console.log("🚀 ~ handelAddToCart ~ userCartSet:", userCartSet)
    if (existingProductIndex != -1) {
      userCart[existingProductIndex].quantity += 1;
    } else {
      userCart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("cartProduct", JSON.stringify(userCart));
    notifications.show({
      title: "Product added to your cart",
    });
  } catch (error) {
    console.log("🚀 ~ useEffect ~ error:", error);
  }
}

export function useGetCartProduct() {
  const [cartProduct, setProducts] = useState([]);
  useEffect(() => {
    async function getCartProduct() {
      const cartProduct = JSON.parse(localStorage.getItem("cartProduct"));

      setProducts(cartProduct);
    }
    try {
      getCartProduct();
    } catch (error) {
      console.log("🚀 ~ useEffect ~ error:", error);
    }
  }, []);

  return cartProduct;
}
