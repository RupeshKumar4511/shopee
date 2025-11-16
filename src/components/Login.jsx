import { useRef } from "react";
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../store/auth";
import { useNavigate } from "react-router-dom";
import {authActions} from '../store/auth';
import LoadingSpinner from "./LoadingSpinner";
const Login = () => {
  const { handleSubmit, register, reset, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { response, isLoading, error } = useSelector(store => store.auth);
  const formRef = useRef(null);
  const dispatch = useDispatch()
  const onSubmit = (data) => {
    dispatch(signIn(data));
    reset({
      username: '',
      password: '',
    })

  }


  if (isLoading) {
        return <LoadingSpinner />
    }

    if (response.signInResponse.success === true) {
        setTimeout(()=>{
          navigate('/api');
        },0)
    }

    if (response.signInResponse.success === false) {
        alert(response.signInResponse.message);
        dispatch(authActions.updateSignInResponse())
    }

    if (error.signInError) {
        alert("error: "+ error.signInError);
        dispatch(authActions.updateSignInError())
    }

  return (
    <div className="w-full flex">
      <form
        className="py-8 px-8 flex flex-col bg-white overflow-hidden w-[90%] md:max-w-130 lg:max-w-150  mx-auto border-white rounded-md my-10 shadow-md"
        ref={formRef}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="flex justify-center items-center md:text-2xl text-xl mb-5 font-bold text-blue-900">Login</h1>

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
            className="flex-1 shadow-xs border border-black/10 focus:outline-blue-400 pl-2 py-1 rounded-md w-full md:w-auto"
          />
          <span className="text-red-500 md:text-sm text-[12px] absolute top-16 md:top-8 right-0">{errors.username?.message}</span>
        </div>

            <div className="mt-2 mb-4 flex flex-col md:flex-row md:items-center md:justify-between relative">
          <label htmlFor="password" className="text-sm md:text-lg mb-1 md:mb-0 md:mr-2">
            Password :
          </label>
          <input
            type="password"
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
            className="flex-1 shadow-xs border border-black/10 focus:outline-blue-400 pl-2 py-1 rounded-md w-full md:w-auto"
          />
          <span className="text-red-500 md:text-sm text-[12px] absolute top-16 md:top-8 right-0">{errors.password?.message}</span>
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

export default Login
