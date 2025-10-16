import {  createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const sendOTP = createAsyncThunk(
    'auth/send-otp' // action types
    ,async(userData,thunkAPI)=>{
    try{
        const response = await fetch('http://localhost/shopee/server/mail.php',{
            method:'POST',
            headers: { "Content-Type": 'application/json' },
            body: JSON.stringify(userData)
        })
       const data = await response.json()
        if (!response.ok) {
            return thunkAPI.rejectWithValue(data.message || "failed to send email");
        }
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})
export const signUp = createAsyncThunk(
    'auth/sign-up' // action types
    ,async(userData,thunkAPI)=>{
    try{
        const response = await fetch('http://localhost/shopee/server/signup.php',{
            method:'POST',
            headers: { "Content-Type": 'application/json' },
            body: JSON.stringify(userData),
            
        })
        const data = await response.json()
        if (!response.ok) {
            return thunkAPI.rejectWithValue(data.message || "failed to send email");
        }
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})

export const signIn = createAsyncThunk(
    'auth/sign-in' // action types
    ,async(userData,thunkAPI)=>{
    try{
        const response = await fetch('http://localhost/shopee/server/signin.php',{
            method:'POST',
           headers: { "Content-Type": 'application/json' },
            body: JSON.stringify(userData)
        })
        const data = await response.json()
        if (!response.ok) {
            return thunkAPI.rejectWithValue(data.message || "failed to send email");
        }
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})

export const signOut = createAsyncThunk(
    'auth/sign-out' // action types
    ,async(userData,thunkAPI)=>{
    try{
        const response = await fetch('http://localhost/shopee/server/signout.php',{
            method:'POST',
           headers: { "Content-Type": 'application/json' },
            body: JSON.stringify(userData)
        })
        const data = await response.json()
        if (!response.ok) {
            return thunkAPI.rejectWithValue(data.message || "failed to send email");
        }
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})

let authResponse ="";
if(localStorage.getItem("user")){
     authResponse = localStorage.getItem("user")
}else{
    authResponse = {};
}
const authSlice = createSlice({
    name:'auth',
    initialState:{
        loading:false,
        response:{
            signUpResponse:{},
            signInResponse:authResponse,
            sendOTPResponse:{},
            signOutResponse:{}

        },
        error:{
            signUpError : '',
            signInError : '',
            sendOTPError : '',
            signOutError: ''
        }
    },

    extraReducers:(builder)=>{
        builder.
        addCase(signUp.pending,(state)=>{
            state.loading = true;
        })
        .addCase(signUp.fulfilled,(state,action)=>{
            state.loading = false;
            state.error.signUpError='';
            state.response.signUpResponse = action.payload;
        })
        .addCase(signUp.rejected,(state,action)=>{
            state.loading= false;
            state.error.signUpError = action.payload || action.error.message || "Something went wrong.";
        }).
        addCase(signIn.pending,(state)=>{
            state.loading = true
        })
        .addCase(signIn.fulfilled,(state,action)=>{
            state.loading = false;
            state.error.signUpError='';
            localStorage.setItem('user',JSON.stringify(action.payload))
            state.response.signInResponse = action.payload;
        })
        .addCase(signIn.rejected,(state,action)=>{
            state.loading= false;
            state.error.signInError = action.payload || action.error.message || "Something went wrong.";
        }).
        addCase(sendOTP.pending,(state)=>{
            state.loading = true
        })
        .addCase(sendOTP.fulfilled,(state,action)=>{
            state.loading = false;
            state.error.signUpError='';
            state.response.sendOTPResponse = action.payload;
        })
        .addCase(sendOTP.rejected,(state,action)=>{
            state.loading= false;
            state.error.sendOTPError = action.payload || action.error.message || "Something went wrong.";
        }).
        addCase(signOut.pending,(state)=>{
            state.loading = true
        })
        .addCase(signOut.fulfilled,(state,action)=>{
            state.loading = false;
            state.error.signUpError='';
            localStorage.removeItem('user')
            state.response.signOutResponse = action.payload;
        })
        .addCase(signOut.rejected,(state,action)=>{
            state.loading= false;
            state.error.signOutError = action.payload || action.error.message || "Something went wrong.";
        })
    }
})
export const cartItemAction  = authSlice.actions


  
export default authSlice