/* eslint-disable no-useless-catch */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

function getUserName(){
    const user = JSON.parse(localStorage.getItem("user"));
    return user.username;
}

export const buyItem = createAsyncThunk(
    'order/buyItem' // action types
    ,async(orderData,thunkAPI)=>{
     try{
        const response = await fetch('http://localhost/shopee/server/addorder.php',{
            method:'POST',
            headers: { "Content-Type": 'application/json' },
            body: JSON.stringify(orderData)
        })
       const data = await response.json()
        if (!response.ok) {
            return thunkAPI.rejectWithValue(data.message || "failed to place order");
        }
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }

})

export const fetchOrders = createAsyncThunk(
    'order/fetchOrders' // action types
    ,async()=>{
    try{
        const response = await fetch('http://localhost/shopee/server/fetchorders.php',{
            method:'POST',
            headers: { "Content-Type": 'application/json' },
            body: JSON.stringify({user:getUserName()})
        })
        const data = await response.json()
        return data;
    } catch (error) {
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
            // state.error.buyItemError = '';
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
                console.log(action.payload)
                state.response.buyItemResponse= action.payload
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
                state.list = action.payload.orders;
                console.log(action.payload.orders)

            })
            .addCase(fetchOrders.rejected,(state,action)=>{
                state.loading= false;
                state.error = action.payload || "Something went wrong"
            })
        }
})



export const BuyItemActions  = buyItemSlice.actions

export default buyItemSlice;