/* eslint-disable no-useless-catch */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const existingCartIndex = (state,action)=>{
    if(state.length<=0){
        return -1;
    }else{
        return state.findIndex(order=>order.productId == action.payload.productId)
    }
    
}

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

export const deleteOrder = createAsyncThunk(
    'order/deleteOrder'
    ,async(id,thunkAPI)=>{
    try{
        const response = await fetch('http://localhost/shopee/server/deleteorder.php',{
            method:'POST',
            headers: { "Content-Type": 'application/json' },
            body: JSON.stringify(id)
        })
       const data = await response.json()
        if (!response.ok) {
            return thunkAPI.rejectWithValue(data.message || "failed to delete order");
        }
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }

})

const buyItemSlice = createSlice({
    name:'order',
    initialState:{
        isLoading:false,
        list:[],
        response:{
            buyItemResponse: {},
            fetchOrderedItemsResponse:{},
            deleteOrderedItemsResponse:{}
        },
        error:{
            buyItemError:'',
            fetchOrderedItemsError:'',
            deleteOrderedItemsResponse:''
        }
    },
    reducers:{
        updateOrderedItems:(state,action)=>{
            state.isLoading = false;
            state.error = '';
            state.list.push(action.payload)
        },
        updateBuyItemResponse:(state)=>{
            state.isLoading = false;
            // state.error.buyItemError = '';
            state.response.buyItemResponse={};
            
        },
        removeOrder:(state,action)=>{
            state.isLoading = false;
            state.list.splice(existingCartIndex(state.list,action),1); 
        }

    },
        extraReducers:(builder)=>{
            builder.
            addCase(buyItem.pending,(state)=>{
                state.isLoading = true
            })
            .addCase(buyItem.fulfilled,(state,action)=>{
                state.isLoading = false;
                state.error='';
                state.response.buyItemResponse= action.payload
            })
            .addCase(buyItem.rejected,(state,action)=>{
                state.isLoading= false;
                state.error = action.payload || "Something went wrong"
            }).
            addCase(fetchOrders.pending,(state)=>{
                state.isLoading = true
            })
            .addCase(fetchOrders.fulfilled,(state,action)=>{
                state.isLoading = false;
                state.error='';
                state.list = action.payload.orders;
                

            })
            .addCase(fetchOrders.rejected,(state,action)=>{
                state.isLoading= false;
                state.error = action.payload || "Something went wrong"
            }).
            addCase(deleteOrder.pending,(state)=>{
                state.isLoading = true
            })
            .addCase(deleteOrder.fulfilled,(state,action)=>{
                state.isLoading = false;
                state.error='';
                state.response.deleteOrderedItemsResponse = action.payload


            })
            .addCase(deleteOrder.rejected,(state,action)=>{
                state.isLoading= false;
                state.error = action.payload || "Something went wrong"
            })
        }
})



export const BuyItemActions  = buyItemSlice.actions

export default buyItemSlice;