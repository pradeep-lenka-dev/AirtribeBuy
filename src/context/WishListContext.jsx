import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebaseConfig/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";

const WishListContext = createContext();

export const useWishList = () => useContext(WishListContext);

export const WishlistProvider = ({ children, userId }) => {
    const [wishListItems, setWishListItems] = useState([]);

    useEffect(() => {
        if (!userId) return;

        const fetchWishListItems = async () => {
            const userWishListRef = doc(db, "wishList", userId);
            const wishListDoc = await getDoc(userWishListRef);

            if (wishListDoc.exists()) {
                setWishListItems(wishListDoc.data().items || []);
            } else {
                setWishListItems([]);
            }
        };

        fetchWishListItems();
    }, [userId]);

    const addToWishList = async (product) => {
        const userWishListRef = doc(db, "wishList", userId);
        const wishListDoc = await getDoc(userWishListRef);
        if(!wishListDoc.exists()){
            await setDoc(userWishListRef,{items:[]})

        }

        const existingProductIndex = wishListItems.findIndex((item)=> item.id == product.id)

        if(existingProductIndex == -1){

            let newWishList = [];
            if (wishListDoc.exists()) {
                newWishList = [...wishListDoc.data().items, product];
            } else {
                newWishList = [product];
            }
    
            await setDoc(userWishListRef, { items: newWishList });
            setWishListItems(newWishList);
        }

    };

    const deleteFromWishList = async (product) => {
        const userWishListRef = doc(db, "wishList", userId);
        const wishListDoc = await getDoc(userWishListRef);
        console.log("🚀 ~ deleteFromWishList ~ wishListDoc:", wishListDoc)
    
        if (wishListDoc.exists()) {
            const wishListItems = wishListDoc.data().items;
            const updatedWishList = wishListItems.filter(item => item.id !== product.id);
    
            await setDoc(userWishListRef, { items: updatedWishList });
            setWishListItems(updatedWishList);
        } else {
            console.log("Wishlist does not exist.");
        }
    };
    

    return (
        <WishListContext.Provider value={{ wishListItems, addToWishList,deleteFromWishList }}>
            {children}
        </WishListContext.Provider>
    );
};
