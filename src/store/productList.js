/* eslint-disable no-useless-catch */
import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";


export const fetchProductsData = createAsyncThunk(
    'productList/fetchProducts' // action types
    ,async()=>{
    try{
        const response = await fetch('http://localhost/shopee/server/products.php');
        
        return response.json()
    }catch(error){
        throw error;
    }

})



const productListSlice = createSlice({
    name:'productList',
    initialState:{
        isLoading:false,
        list:[],
        error:''
    },
    reducers:{

        
      // used in custom action creators 

        // fetchProducts:(state)=>{
        //     state.isLoading= true;
        // },
        // fetchProductsError:(state,action)=>{
        //     state.isLoading = false;
        //     state.error = action.payload || 'Something went wrong'

        // },
        // updateAllProducts:(state,action)=>{
        //     state.isLoading = false;
        //     state.error = '';
        //     state.list = action.payload
        // },

    },
        extraReducers:(builder)=>{
            builder.
            addCase(fetchProductsData.pending,(state)=>{
                state.isLoading = true
            })
            .addCase(fetchProductsData.fulfilled,(state,action)=>{
                state.isLoading = false;
                state.error='';
                state.list = action.payload.data
                console.log(action.payload.data)
            })
            .addCase(fetchProductsData.rejected,(state,action)=>{
                state.isLoading= false;
                state.error = action.payload || "Something went wrong"
            })
        }
})


const getCartItems = ({productList,cartItems})=>{
    if(productList.list && cartItems.list){
    return cartItems.list.map(({quantity,productId})=>{
      const cartproducts = productList.list.find(product =>product.id === productId)

      return {...cartproducts,quantity}
    }).filter(({title})=>title)
    }
  }

const getOrderedItems = ({productList,order})=>{
    if(productList.list && order.list){
    return order.list.map(({quantity,productId})=>{
      const orderedproducts = productList.list.find(product =>product.id === productId)

      return {...orderedproducts,quantity}
    }).filter(({title})=>title)
    }
  }


export const getAllCartItems = createSelector(getCartItems,(state)=>state);
export const getAllOrderedItems = createSelector(getOrderedItems,(state)=>state);



// Thunk action creators
// export const fetchProductsData = ()=> (dispatch)=>{
//     fetch('https://fakestoreapi.com/carts/5')
//           .then(response => response.json())
//           .then(data => 
//             dispatch(productListAction.updateAllProducts(data))).
//           catch(()=>dispatch(productListAction.fetchProductsError));
// }

export const productListAction  = productListSlice.actions

export default productListSlice