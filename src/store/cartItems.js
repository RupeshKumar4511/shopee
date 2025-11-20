/* eslint-disable no-useless-catch */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const existingCartIndex = (state, action) => {
    if (state.length <= 0) {
        return -1;
    } else {
        return state.findIndex(cart => cart.productId == action.payload.productId)
    }

}

function getUserName() {
    const user = JSON.parse(localStorage.getItem("user"));
    return user.username;
}

export const fetchCartItemsData = createAsyncThunk(
    'cartItems/fetchCartItem'
    , async () => {
        try {
            const response = await fetch('http://localhost/shopee/server/fetchcarts.php', {
                method: 'POST',
                headers: { "Content-Type": 'application/json' },
                body: JSON.stringify({ user: getUserName() })
            })
            const data = await response.json()
            return data;
        } catch (error) {
            throw error;
        }

    })

export const addCartItemsData = createAsyncThunk(
    'cartItems/addCartItem'
    , async (cartsData, thunkAPI) => {
        try {
            const response = await fetch('http://localhost/shopee/server/addcarts.php', {
                method: 'POST',
                headers: { "Content-Type": 'application/json' },
                body: JSON.stringify(cartsData)
            })
            const data = await response.json()
            if (!response.ok) {
                return thunkAPI.rejectWithValue(data.message || "failed to add cartItem");
            }
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }

    })



export const deleteCartItemsData = createAsyncThunk(
    'cartItems/deleteCartItem'
    , async (id, thunkAPI) => {
        try {
            const response = await fetch('http://localhost/shopee/server/deletecarts.php', {
                method: 'POST',
                headers: { "Content-Type": 'application/json' },
                body: JSON.stringify(id)
            })
            const data = await response.json()
            if (!response.ok) {
                return thunkAPI.rejectWithValue(data.message || "failed to delete cartItem");
            }
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }

    })



const cartItemSlice = createSlice({
    name: 'cartItems',
    initialState: {
        isLoading: false,
        list: [],
        error: ''
    },
    reducers: {

        // fetchCartItems:(state)=>{
        //     state.isLoading = true
        // },
        // loadCartItems:(state,action)=>{
        //     state.isLoading = false;
        //     state.error='';
        //     state.list= action.payload.carts     
        // },

        // fetchCartItemsError:(state)=>{
        //     state.isLoading = false
        //     state.error = "Something went Wrong"
        // },

        addItem: (state, action) => {
            if (existingCartIndex(state.list, action) !== -1) {
                state.list[existingCartIndex(state.list, action)].quantity += 1;
            } else {
                state.list.push({ ...action.payload, quantity: 1 })

            }

        },
        increaseQuantity: (state, action) => {
            if (state.list[existingCartIndex(state.list, action)].quantity < 5) {
                state.list[existingCartIndex(state.list, action)].quantity += 1;
            }
        },
        decreaseQuantity: (state, action) => {

            if (state.list[existingCartIndex(state.list, action)].quantity > 1) {

                state.list[existingCartIndex(state.list, action)].quantity -= 1

            }
        },
        removeItem: (state, action) => {
            const index = existingCartIndex(state.list, action);
            if (index !== -1) {
                state.list.splice(index, 1);
            }
        }

    },
    extraReducers: (builder) => {
        builder.
            addCase(fetchCartItemsData.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchCartItemsData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = '';
                state.list = action.payload.carts;
                console.log(action.payload.carts)
            })
            .addCase(fetchCartItemsData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || "Something went wrong"
            }).
            addCase(addCartItemsData.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addCartItemsData.fulfilled, (state) => {
                state.isLoading = false;
                state.error = '';
            })
            .addCase(addCartItemsData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || "Something went wrong"
            }).
            addCase(deleteCartItemsData.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteCartItemsData.fulfilled, (state) => {
                state.isLoading = false;
                state.error = '';
            })
            .addCase(deleteCartItemsData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || "Something went wrong"
            })
    }
})
export const cartItemAction = cartItemSlice.actions

// export const fetchCartItemsData = ()=> (dispatch)=>{
//     fetch('https://fakestoreapi.com/carts/5')
//           .then(response => response.json())
//           .then(data => 
//             dispatch(cartItemAction.loadCartItems(data))).
//           catch(()=>dispatch(cartItemAction.fetchCartItemsError));
// }


export default cartItemSlice