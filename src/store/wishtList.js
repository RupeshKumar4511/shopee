import { createSlice } from "@reduxjs/toolkit";
const wishListSlice = createSlice({
    name:'wishList',
    initialState:[],
    reducers:{
        
    }
})


export const wishListAction  = wishListSlice.actions
export default wishListSlice