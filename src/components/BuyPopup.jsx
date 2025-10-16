import { useRef } from "react";
import { useForm } from 'react-hook-form';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const BuyPopup = () => {
  const { handleSubmit, register, reset, formState: { errors } } = useForm();
  const formRef = useRef(null);
  const navigate = useNavigate();
  const { response, isLoading, error } = useSelector(store => store.auth);
  const onSubmit = (data) => {    
    console.log(data);
    reset({
      title: '',
      body: '',
      tags: '',
      image: ''
    })

  }

  if (response.sendOTPResponse.success === true) {

      alert("Your order is placed.")
      navigate('/api')

    }

    if (isLoading) {
      return (
        <LoadingSpinner/>
      )
    }

    if (response.sendOTPResponse.success === false) {
      return (
        <h1 className='text-center'>{response.message}</h1>
      )
    }

    if (error.sendOTPError) {
      return (
        <h1 className='text-center'>{error.sendOTPError}</h1>
      )
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
          <label htmlFor="title" className="text-sm md:text-lg mb-1 md:mb-0 md:mr-2">
            Title :
          </label>
          <input
            type="text"
            id="title"
            name="title"
            {...register("title", {
              required: "title is required",
            })}
            className="flex-1 shadow-xs border border-black/10 focus:outline-blue-400 pl-2 py-1 rounded-md w-full md:w-auto" 
            disabled
          />
          <span className="text-red-500 md:text-sm text-[12px] absolute top-16 md:top-8 right-0">{errors.title?.message}</span>
        </div>

        <div className="mt-2 mb-4 flex flex-col md:flex-row md:items-center md:justify-between relative">
          <label htmlFor="title" className="text-sm md:text-lg mb-1 md:mb-0 md:mr-2">
            Price :
          </label>
          <input
            type="text"
            id="price"
            name="price"
            {...register("price", {
              required: "price is required",
            })}
            className="flex-1 shadow-xs border border-black/10 focus:outline-blue-400 pl-2 py-1 rounded-md w-full md:w-auto" 
            disabled
          />
          <span className="text-red-500 md:text-sm text-[12px] absolute top-16 md:top-8 right-0">{errors.price?.message}</span>
        </div>

        <div className="mt-2 mb-4 flex flex-col md:flex-row md:items-center md:justify-between relative">
          <label htmlFor="title" className="text-sm md:text-lg mb-1 md:mb-0 md:mr-2">
            Quantity :
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            {...register("quantity", {
              required: "quantity is required"
            })}
            className="flex-1 shadow-xs border border-black/10 focus:outline-blue-400 pl-2 py-1 rounded-md w-full md:w-auto" 
            
          />
          <span className="text-red-500 md:text-sm text-[12px] absolute top-16 md:top-8 right-0">{errors.quantity?.message}</span>
        </div>

        <div className="mt-2 mb-4 flex flex-col md:flex-row md:items-center md:justify-between relative">
          <label htmlFor="title" className="text-sm md:text-lg mb-1 md:mb-0 md:mr-2">
            Total_amount :
          </label>
          <input
            type="number"
            id="Total_amount"
            placeholder="Enter your Total_amount"
            name="Total_amount"
            {...register("Total_amount", {
              required: "Total_amount is required"
            })}
            className="flex-1 shadow-xs border border-black/10 focus:outline-blue-400 pl-2 py-1 rounded-md w-full md:w-auto" 
            disabled
          />
          <span className="text-red-500 md:text-sm text-[12px] absolute top-16 md:top-8 right-0">{errors.Total_amount?.message}</span>
        </div>




        <button
          type="submit"
          className="shadow-md bg-blue-600 px-4 py-2 rounded-md text-white mt-4 hover:bg-blue-700 transition-colors cursor-pointer"
        >
          Order
        </button>

      </form>
    </div>
  )
}

export default BuyPopup

