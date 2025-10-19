/* eslint-disable no-useless-catch */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const buyItem = createAsyncThunk(
    'order/buyItem' // action types
    ,async()=>{
    try{
        const response = await fetch('https://fakestoreapi.com/products')
        return response.json()
    }catch(error){
        throw error;
    }

})

export const fetchOrders = createAsyncThunk(
    'order/fetchOrders' // action types
    ,async(data)=>{
    try{
        const response = await fetch(`https://fakestoreapi.com/products/${data}`)
        return response.json()
    }catch(error){
        throw error;
    }

})

const buyItemSlice = createSlice({
    name:'order',
    initialState:{
        loading:false,
        list:[],
        response:{
            buyItemResponse: {},
            fetchOrderedItemsResponse:{}
        },
        error:{
            buyItemError:'',
            fetchOrderedItemsError:''
        }
    },
    reducers:{
        updateOrderedItems:(state,action)=>{
            state.loading = false;
            state.error = '';
            state.list.push(action.payload)
        },
        updateBuyItemResponse:(state)=>{
            state.loading = false;
            state.error.buyItemError = '';
            state.response.buyItemResponse={};
            
        },

    },
        extraReducers:(builder)=>{
            builder.
            addCase(buyItem.pending,(state)=>{
                state.loading = true
            })
            .addCase(buyItem.fulfilled,(state,action)=>{
                state.loading = false;
                state.error='';
                state.list = action.payload
            })
            .addCase(buyItem.rejected,(state,action)=>{
                state.loading= false;
                state.error = action.payload || "Something went wrong"
            }).
            addCase(fetchOrders.pending,(state)=>{
                state.loading = true
            })
            .addCase(fetchOrders.fulfilled,(state,action)=>{
                state.loading = false;
                state.error='';
                state.list = action.payload
            })
            .addCase(fetchOrders.rejected,(state,action)=>{
                state.loading= false;
                state.error = action.payload || "Something went wrong"
            })
        }
})



export const BuyItemActions  = buyItemSlice.actions

export default buyItemSlice;