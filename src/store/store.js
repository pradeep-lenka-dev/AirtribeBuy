import { configureStore } from '@reduxjs/toolkit'
import wishListReducer  from "./wishListSlice"

export const store = configureStore({
  reducer: {
    addWishlist : wishListReducer
  },
})