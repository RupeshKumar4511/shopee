/* eslint-disable no-useless-catch */
import {  createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const existingCartIndex = (state,action)=>{
    return state.findIndex(cart=>cart.productId == action.payload.productId)
}


export const fetchCartItemsData = createAsyncThunk(
    'cartItems/fetchCartItem' // action types
    ,async()=>{
    try{
        const response = await fetch('https://fakestoreapi.com/carts/5')
        return response.json()
    }catch(error){
        throw error;
    }

})

// console.log(fetchCartItemsData)


const cartItemSlice = createSlice({
    name:'cartItems',
    initialState:{
        loading:false,
        list:[],
        error:''
    },
    reducers:{

        // fetchCartItems:(state)=>{
        //     state.loading = true
        // },
        // loadCartItems:(state,action)=>{
        //     state.loading = false;
        //     state.error='';
        //     state.list= action.payload.products     
        // },

        // fetchCartItemsError:(state)=>{
        //     state.loading = false
        //     state.error = "Something went Wrong"
        // },

        addItem:(state,action)=>{       
            if(existingCartIndex(state.list,action) !==-1){
            state.list[existingCartIndex(state.list,action)].quantity +=1;
            }else{
                state.list.push({...action.payload,quantity:1})
            } 
            
        },
        increaseQuantity:(state,action)=>{
            state.list[existingCartIndex(state.list,action)].quantity +=1;
        },
        decreaseQuantity:(state,action)=>{
            if(state[existingCartIndex(state,action)].quantity == 1){
                state.list.splice(existingCartIndex(state.list,action),1)
            }else{
                state.list[existingCartIndex(state.list,action)].quantity -= 1;
            }       
        },
        removeItem:(state,action)=>{
            state.list.splice(existingCartIndex(state.list,action),1);
        }
    },
    // extraReducers:(builder)=>{
    //     builder.
    //     addCase(fetchCartItemsData.pending,(state)=>{
    //         state.loading = true
    //     })
    //     .addCase(fetchCartItemsData.fulfilled,(state,action)=>{
    //         state.loading = false;
    //         state.error='';
    //         console.log(action.payload.products)
    //         state.list = action.payload.products
    //     })
    //     .addCase(fetchCartItemsData.rejected,(state,action)=>{
    //         state.loading= false;
    //         state.error = action.payload || "Something went wrong"
    //     })
    // }
})
export const cartItemAction  = cartItemSlice.actions

// export const fetchCartItemsData = ()=> (dispatch)=>{
//     fetch('https://fakestoreapi.com/carts/5')
//           .then(response => response.json())
//           .then(data => 
//             dispatch(cartItemAction.loadCartItems(data))).
//           catch(()=>dispatch(cartItemAction.fetchCartItemsError));
// }

  
export default cartItemSlice