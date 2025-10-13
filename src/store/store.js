import { configureStore } from "@reduxjs/toolkit";
import cartItemSlice from './cartItems';
import productListSlice from './productList'
import wishListSlice from './wishtList'
import authSlice from "./auth";
// import { api } from "../middlewares/api";
// import {logger} from "../middlewares/logger"

const store = configureStore({
    reducer:{
        productList:productListSlice.reducer,
        cartItems:cartItemSlice.reducer,
        wishList:wishListSlice.reducer,
        auth:authSlice.reducer
        

    },
    // middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(api,logger)
})



export default store;










// using redux,react-redux 

// import { createStore } from "redux";
// import {data} from '../../data.js';
// const INITIAl_STATE =  {
//     products:data,
//     cartItems:[],
//     wishList:[]
// }
// const reducer = (state=INITIAl_STATE,action) => {

//     if(action.type == 'cart/ADD_ITEM'){
//         const existingCart = state.cartItems.find(cart=>cart.productId == action.payload.productId)
//         if(existingCart){
//             return {
//                 ...state,cartItems:state.cartItems.map(cart=> {
//                     if(cart.productId== existingCart.productId){
//                         return {...cart,quantity:cart.quantity+1}
//                     }
//                     return cart;
//                 })
//             }
//         }

//         return {...state, cartItems:[...state.cartItems,action.payload]}
//     }
//     else if(action.type == 'cart/INCREASE_CART_QUANTITY'){
//         return {...state, cartItems:state.cartItems.map((cart)=>{
//             if(cart.productId == action.payload.productId){
//                 return {...cart,quantity:cart.quantity+1}
//             }
//             return cart;
//         })}
    
//     }

//     else if(action.type == 'cart/DECREASE_CART_QUANTITY'){
//         const existingCart = state.cartItems.find(item=>item.productId==action.payload.productId)
          
//         if(existingCart.quantity == 1){
//             return {...state,cartItems:state.cartItems.filter(cart=>cart.productId != action.payload.productId)}
//         }

//         return {...state, cartItems:state.cartItems.map((cart)=>{
//             if(cart.productId == action.payload.productId){
//                 return {...cart,quantity:cart.quantity-1}
//             }
//             return cart;
//         })}
    
//     }

//     else if(action.type == 'cart/REMOVE_ITEM'){
//         return {...state, cartItems:state.cartItems.filter((cart)=> cart.productId != action.payload.productId)}
//     }
//     return state;
// }


// const store = createStore(reducer)
// store.dispatch({type:'cart/ADD_ITEM',payload:{productId:1,quantity:1}})
// store.dispatch({type:'cart/ADD_ITEM',payload:{productId:1,quantity:1}})
// store.dispatch({type:'cart/ADD_ITEM',payload:{productId:2,quantity:1}})


// export default store;