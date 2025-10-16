/* eslint-disable no-useless-catch */
import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";


export const fetchProductsData = createAsyncThunk(
    'productList/fetchProducts' // action types
    ,async()=>{
    try{
        const response = await fetch('https://fakestoreapi.com/products')
        return response.json()
    }catch(error){
        throw error;
    }

})

export const fetchSearchedProduct = createAsyncThunk(
    'productList/fetchSearchedProducts' // action types
    ,async(data)=>{
    try{
        const response = await fetch(`https://fakestoreapi.com/products/${data}`)
        return response.json()
    }catch(error){
        throw error;
    }

})

const productListSlice = createSlice({
    name:'productList',
    initialState:{
        loading:false,
        list:[],
        error:''
    },
    reducers:{

        
      // used in custom action creators 

        // fetchProducts:(state)=>{
        //     state.loading= true;
        // },
        // fetchProductsError:(state,action)=>{
        //     state.loading = false;
        //     state.error = action.payload || 'Something went wrong'

        // },
        // updateAllProducts:(state,action)=>{
        //     state.loading = false;
        //     state.error = '';
        //     state.list = action.payload
        // },

    },
        extraReducers:(builder)=>{
            builder.
            addCase(fetchProductsData.pending,(state)=>{
                state.loading = true
            })
            .addCase(fetchProductsData.fulfilled,(state,action)=>{
                state.loading = false;
                state.error='';
                state.list = action.payload
            })
            .addCase(fetchProductsData.rejected,(state,action)=>{
                state.loading= false;
                state.error = action.payload || "Something went wrong"
            }).
            addCase(fetchSearchedProduct.pending,(state)=>{
                state.loading = true
            })
            .addCase(fetchSearchedProduct.fulfilled,(state,action)=>{
                state.loading = false;
                state.error='';
                state.list = action.payload
            })
            .addCase(fetchSearchedProduct.rejected,(state,action)=>{
                state.loading= false;
                state.error = action.payload || "Something went wrong"
            })
        }
})


const getCartItems = ({productList,cartItems})=>{
    return cartItems.list.map(({quantity,productId})=>{
      const cartproducts = productList.list.find(product =>product.id === productId)

      return {...cartproducts,quantity}
    }).filter(({title})=>title)
  }


  
export const getAllCartItems = createSelector(getCartItems,(state)=>state);



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