import {createSlice} from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:"cart",
    initialState :{
        items:[],
    },
    reducers:{
        addItems:(state,action) => {
            //mutating(directly modifying ) the state 
            state.items.push(action.payload);
        },
        removeItems:(state,action) => {
            state.items.pop();
        },
        clearCart:(state,action) => {
            state.items.length = 0; //[]
        },
    },
});

export const {addItems , removeItems , clearCart} = cartSlice.actions;

export default cartSlice.reducer;




