import { useRef, useState } from "react";
import { useForm } from 'react-hook-form';
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {sendOTP,authActions} from '../store/auth'
import LoadingSpinner from "./LoadingSpinner";



const SignUp = () => {
  const { handleSubmit, register, reset, formState: { errors } } = useForm();
  const formRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { response, isLoading, error } = useSelector(store => store.auth);
  const [formData ,setFormData] = useState({});
  const onSubmit = (data) => {    
    dispatch(sendOTP(data));
    setFormData(data);
    reset({
      title: '',
      body: '',
      tags: '',
      image: ''
    })

  }

  if (response.sendOTPResponse.success === true) {

      setTimeout(() => {
        navigate('/verify-user', {
          state: formData
        })
      })

      dispatch(authActions.updateSendOTPResponse())

    }

    if (isLoading) {
      return (
        <LoadingSpinner/>
      )
    }

    if (response.sendOTPResponse.success === false) {
      alert(response.sendOTPResponse.message);
      dispatch(authActions.updateSendOTPResponse())
    }

    if (error.sendOTPError) {
      alert(error.sendOTPError);
      dispatch(authActions.updateSendOTPError())
    }

  return (
    <div className="w-full flex">
      <form
        className="py-8 px-8 flex flex-col bg-white overflow-hidden w-[90%] md:max-w-130 lg:max-w-150  mx-auto border-white rounded-md my-10 shadow-md"
        ref={formRef}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="flex justify-center items-center md:text-2xl text-xl mb-5 font-bold text-blue-900">Sign Up</h1>

        <div className="mt-2 mb-4 flex flex-col md:flex-row md:items-center md:justify-between relative">
          <label htmlFor="username" className="text-sm md:text-lg mb-1 md:mb-0 md:mr-2">
            Username :
          </label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            name="username"
            {...register("username", {
              required: "username is required",
              minLength: { value: 3, message: "Username must atleast 3 characters long" },
              maxLength: {
                value: 32, message: "Length of username cannot exceeds 32 characters."
              }
            })}
            className="flex-1 shadow-xs border border-black/10 focus:outline-blue-400 pl-2 py-1 rounded-md w-full md:w-auto" autoComplete="on"
          />
          <span className="text-red-500 md:text-sm text-[12px] absolute top-16 md:top-8 right-0">{errors.username?.message}</span>
        </div>

        <div className="mt-2 mb-4 flex flex-col md:flex-row md:items-center md:justify-between relative">
          <label htmlFor="email" className="text-sm md:text-lg mb-1 md:mb-0 md:mr-2">
            Email :
          </label>
          <input
            type="text"
            id="email"
            placeholder="Enter your email"
            name="email"
            {...register("email", {
              required: "email is required",
              minLength: { value: 12, message: "email must atleast 12 characters long" },
              maxLength: {
                value: 52, message: "Length of email cannot exceeds 52 characters."
              }
            })}
            className="flex-1 shadow-xs border border-black/10 focus:outline-blue-400 pl-2 py-1 rounded-md w-full md:w-auto" autoComplete="on"
          />
          <span className="text-red-500 md:text-sm text-[12px] absolute top-16 md:top-8 right-0">{errors.email?.message}</span>
        </div>

        <div className="mt-2 mb-4 flex flex-col md:flex-row md:items-center md:justify-between relative">
          <label htmlFor="password" className="text-sm md:text-lg mb-1 md:mb-0 md:mr-2">
            Password :
          </label>
          <input
            type="text"
            id="password"
            placeholder="Enter your password"
            name="password"
            {...register("password", {
              required: "password is required",
              minLength: { value: 8, message: "password must atleast 8 characters long" },
              maxLength: {
                value: 12, message: "Length of password cannot exceeds 12 characters." 
              }
            })}
            className="flex-1 shadow-xs border border-black/10 focus:outline-blue-400 pl-2 py-1 rounded-md w-full md:w-auto" autoComplete="on"
          />
          <span className="text-red-500 md:text-sm text-[12px] absolute top-16 md:top-8 right-0">{errors.password?.message}</span>
        </div>

        <div className="mt-2 mb-4 flex flex-col md:flex-row md:items-center md:justify-between relative">
          <label htmlFor="phone_no" className="text-sm md:text-lg mb-1 md:mb-0 md:mr-2">
            Phone No :
          </label>
          <input
            type="text"
            id="phone_no"
            placeholder="Enter your phone_no"
            name="phone_no"
            {...register("phone_no", {
              required: "phone_no is required",
              minLength: { value: 10, message: "phone_no must atleast 10 characters long" },
              maxLength: {
                value: 10, message: "Length of phone_no cannot exceeds 10 characters."
              }
            })}
            className="flex-1 shadow-xs border border-black/10 focus:outline-blue-400 pl-2 py-1 rounded-md w-full md:w-auto" autoComplete="on"
          />
          <span className="text-red-500 md:text-sm text-[12px] absolute top-16 md:top-8 right-0">{errors.phone_no?.message}</span>
        </div>




        <button
          type="submit"
          className="shadow-md bg-blue-600 px-4 py-2 rounded-md text-white mt-4 hover:bg-blue-700 transition-colors cursor-pointer"
        >
          Submit
        </button>

      </form>
    </div>
  )
}

export default SignUp
