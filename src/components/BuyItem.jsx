import { useRef, useState } from "react";
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector, } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { buyItem, BuyItemActions } from "../store/buyItems";
import LoadingSpinner from "./LoadingSpinner";

const BuyItem = () => {
  const { handleSubmit, register, formState: { errors } } = useForm();
  const formRef = useRef(null);
  const [newQuantity, setNewQuantity] = useState(1)
  const navigate = useNavigate();
  const { state: { title, price } } = useLocation();
  const dispatch = useDispatch();
  const { state } = useLocation()


  function getUserName() {
    const user = JSON.parse(localStorage.getItem("user"));
    return user.username;
  }
  const { response, isLoading, error } = useSelector(store => store.order);


  const onSubmit = (data) => {
    dispatch(buyItem({ ...data, user: getUserName(), productId: state.id }));

  }

  if (response.buyItemResponse.success === true) {

    alert("Your order is placed.")
    dispatch(BuyItemActions.updateBuyItemResponse());
    setTimeout(() => {
      navigate('/api')
    }, 0)


  }

  if (isLoading) {
    return (
      <LoadingSpinner />
    )
  }

  if (response.buyItemResponse.success === false) {
    alert(response.buyItemResponse.message);
    dispatch(BuyItemActions.updateBuyItemResponse())
  }

  if (error.buyItemError) {
    alert(error.buyItemError);
    dispatch(BuyItemActions.updateBuyItemError())
  }




  return (
    <>
      <button className="bg-black text-white w-10 relative top-10 left-10 rounded-md cursor-pointer" onClick={() => history.back()}>Back</button>
      <div className="w-full flex">

        <form
          className="py-8 px-8 flex flex-col bg-white overflow-hidden w-[90%] md:max-w-130 lg:max-w-150  mx-auto border-white rounded-md my-10 shadow-md"
          ref={formRef}
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="flex justify-center items-center md:text-2xl text-xl mb-5 font-bold text-blue-900">Buy Now</h1>

          <div className="mt-2 mb-4 flex flex-col md:flex-row md:items-center md:justify-between relative">
            <label htmlFor="title" className="text-sm md:text-lg mb-1 md:mb-0 md:mr-2 font-bold">
              Title :
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}

              {...register("title", {
                required: "title is required",
              })}
              className="flex-1 shadow-xs border font-semibold border-black/10 focus:outline-blue-400 pl-2 py-1 rounded-md w-full md:w-auto text-blue-500"
              disabled
            />
            <span className="text-red-500 md:text-sm text-[12px] absolute top-16 md:top-8 right-0">{errors.title?.message}</span>
          </div>

          <div className="mt-2 mb-4 flex flex-col md:flex-row md:items-center md:justify-between relative">
            <label htmlFor="title" className="text-sm md:text-lg mb-1 md:mb-0 md:mr-2 font-bold">
              Price ($):
            </label>
            <input
              type="text"
              id="price"
              name="price"
              value={price}
              {...register("price", {
                required: "price is required",
              })}
              className="flex-1 shadow-xs border font-semibold border-black/10 focus:outline-blue-400 pl-2 py-1 rounded-md w-full md:w-auto text-blue-500"
              disabled
            />
            <span className="text-red-500 md:text-sm text-[12px] absolute top-16 md:top-8 right-0">{errors.price?.message}</span>
          </div>

          <div className="mt-2 mb-4 flex flex-col md:flex-row md:items-center md:justify-between relative">
            <label htmlFor="title" className="text-sm md:text-lg mb-1 md:mb-0 md:mr-2 font-bold">
              Quantity :
            </label>
            <input
              type="number"
              max={5}
              min={1}
              defaultValue={1}
              id="quantity"
              placeholder="1"
              name="quantity"
              onChange={(event) => { console.log(event) }}
              {...register("quantity", {
                required: "quantity is required",
                onChange: (event) => {
                  setNewQuantity(event.target.value)
                }
              })}
              className="flex-1 shadow-xs border font-semibold border-black/10 focus:outline-blue-400 pl-2 py-1 rounded-md w-full md:w-auto text-blue-500"

            />
            <span className="text-red-500 md:text-sm text-[12px] absolute top-16 md:top-8 right-0">{errors.quantity?.message}</span>
          </div>

          <div className="mt-2 mb-4 flex flex-col md:flex-row md:items-center md:justify-between relative">
            <label htmlFor="title" className="text-sm md:text-lg mb-1 md:mb-0 md:mr-2 font-bold">
              Total Amount :
            </label>
            <input
              type="number"
              id="Total_amount"
              name="Total_amount"
              value={newQuantity * price}
              {...register("Total_amount", {
                required: "Total_amount is required"
              })}
              className="flex-1 shadow-xs border font-semibold border-black/10 focus:outline-blue-400 pl-2 py-1 rounded-md w-full md:w-auto text-blue-500"
              disabled
            />
            <span className="text-red-500 md:text-sm text-[12px] absolute top-16 md:top-8 right-0">{errors.Total_amount?.message}</span>
          </div>

          <div className="mt-2 mb-4 flex flex-col md:flex-row md:items-center md:justify-between relative">
            <label htmlFor="title" className="text-sm md:text-lg mb-1 md:mb-0 md:mr-2 font-bold">
              Addresss
            </label>
            <input
              type="text"
              id="address"
              placeholder="Enter your address"
              name="address"
              {...register("address", {
                required: "address is required",
                minLength: { value: 10, message: "Address must atleast 10 characters long" },
                maxLength: {
                  value: 100, message: "Length of Address cannot exceeds 100 characters."
                }
              })}
              className="flex-1 shadow-xs border font-semibold border-black/10 focus:outline-blue-400 pl-2 py-1 rounded-md w-full md:w-auto text-blue-500"

            />
            <span className="text-red-500 md:text-sm text-[12px] absolute top-16 md:top-8 right-0">{errors.address?.message}</span>
          </div>


          <div className="mt-2 mb-4 flex flex-col md:flex-row md:items-center md:justify-between relative">
            <label htmlFor="title" className="text-sm md:text-lg mb-1 md:mb-0 md:mr-2 font-bold">
              Payment Mode :
            </label>
            <input
              type="text"
              id="payment_mode"
              value="Cash on Delivery"
              name="payment mode"
              {...register("payment mode", {
                required: "payment mode is required",
              })}

              className="flex-1 shadow-xs border font-semibold border-black/10 focus:outline-blue-400 pl-2 py-1 rounded-md w-full md:w-auto text-green-500"
              disabled
            />
            <span className="text-red-500 md:text-sm text-[12px] absolute top-16 md:top-8 right-0">{errors.payment_mode?.message}</span>
          </div>

          <button
            type="submit"
            className="shadow-md bg-blue-600 px-4 py-2 rounded-md text-white mt-4 hover:bg-blue-700 transition-colors cursor-pointer font-bold"
          >
            Order
          </button>

        </form>
      </div>
    </>
  )
}

export default BuyItem

