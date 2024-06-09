import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    cartProduct:[]
}

export const cartListSlice = createSlice({
    name:"carList",
    initialState,
    reducers:{
        addCartList(state,action){
            state.value = action.payload
            try {
                const existingProductIndex = state.cartProduct.findIndex(item => item.id === state.value.id);
                if (existingProductIndex == -1) {
                  state.cartProduct.push(state.value)
                } 
              } catch (error) {
                console.log("🚀 ~ useEffect ~ error:", error);
              }
        }
    }
})