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

    return (
        <WishListContext.Provider value={{ wishListItems, addToWishList }}>
            {children}
        </WishListContext.Provider>
    );
};
