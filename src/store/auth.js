/* eslint-disable no-useless-catch */
import {  createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const sendOTP = createAsyncThunk(
    'auth/send-otp' // action types
    ,async()=>{
    try{
        const response = await fetch('http://localhost/shopee/server/mail.php',{
            method:'POST',
        })
        return response.json()
    }catch(error){
        throw error;
    }

})
export const signUp = createAsyncThunk(
    'auth/sign-up' // action types
    ,async()=>{
    try{
        const response = await fetch('http://localhost/shopee/server/signup.php',{
            method:'POST'
        })
        return response.json()
    }catch(error){
        throw error;
    }

})

export const signIn = createAsyncThunk(
    'auth/sign-in' // action types
    ,async()=>{
    try{
        const response = await fetch('http://localhost/shopee/server/signin.php',{
            method:'POST'
        })
        return response.json()
    }catch(error){
        throw error;
    }

})



const authSlice = createSlice({
    name:'auth',
    initialState:{
        loading:false,
        response:{
            signUpResponse:'',
            signInResponse:'',
            sendOTPResponse:''

        },
        error:{
            signUpError : '',
            signInError : '',
            sendOTPError : ''
        }
    },

    extraReducers:(builder)=>{
        builder.
        addCase(signUp.pending,(state)=>{
            state.loading = true
        })
        .addCase(signUp.fulfilled,(state,action)=>{
            state.loading = false;
            state.error.signUpError='';
            state.signUpResponse = action.payload;
        })
        .addCase(signUp.rejected,(state,action)=>{
            state.loading= false;
            state.error = action.payload || "Something went wrong"
        }).
        addCase(signIn.pending,(state)=>{
            state.loading = true
        })
        .addCase(signIn.fulfilled,(state,action)=>{
            state.loading = false;
            state.error.signUpError='';
            state.response.signUpResponse = action.payload;
        })
        .addCase(signIn.rejected,(state,action)=>{
            state.loading= false;
            state.error.signInError = action.payload || "Something went wrong"
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
            state.error.sendOTPError = action.payload || "Something went wrong"
        })
    }
})
export const cartItemAction  = authSlice.actions


  
export default authSlice