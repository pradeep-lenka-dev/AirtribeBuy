import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  WishlistProduct: [],
}

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addWishlist: (state,action) => {
      state.value = action.payload;
      try {
        const existingProductIndex = state.WishlistProduct.findIndex(item => item.id === state.value.id);
        if (existingProductIndex == -1) {
          state.WishlistProduct.push(state.value)
        } 
      } catch (error) {
        console.log("🚀 ~ useEffect ~ error:", error);
      }

    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { addWishlist, decrement, incrementByAmount } = wishlistSlice.actions

export default wishlistSlice.reducer