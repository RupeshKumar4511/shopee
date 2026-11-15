import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, useOutletContext } from "react-router-dom";
import { buyItem, BuyItemActions, fetchOrders } from "../store/buyItems";
import LoadingSpinner from "./LoadingSpinner";

const BuyItem = () => {
  const { handleSubmit, register, formState: { errors } } = useForm();
  const formRef = useRef(null);
  const [newQuantity, setNewQuantity] = useState(1);
  const [isPlacing, setIsPlacing] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { title = "", price = 0, id } = location.state || {};
  const dispatch = useDispatch();
  const { setOrder } = useOutletContext();

  function getUserName() {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.username || "";
  }

  const { response, isLoading, error } = useSelector((store) => store.order);

  const onSubmit = (data) => {
    setIsPlacing(true);
    dispatch(
      buyItem({
        ...data,
        title,
        price,
        Total_amount: Number((newQuantity * price).toFixed(2)),
        "payment mode": "Cash on Delivery",
        user: getUserName(),
        productId: id,
      })
    );
  };

  useEffect(() => {
    let timer;

    if (response.buyItemResponse.success === true) {
      timer = setTimeout(() => {
        alert("Your order is placed.");
        localStorage.setItem("order", JSON.stringify({ place: true, productId: id }));
        setOrder(JSON.parse(localStorage.getItem("order")));
        dispatch(BuyItemActions.updateBuyItemResponse());
        dispatch(fetchOrders());
        setIsPlacing(false);
        navigate("/api");
      }, 1000);
    } else if (response.buyItemResponse.success === false) {
      timer = setTimeout(() => {
        alert(response.buyItemResponse.message);
        dispatch(BuyItemActions.updateBuyItemResponse());
        setIsPlacing(false);
      }, 1000);
    }

    return () => clearTimeout(timer);
  }, [response.buyItemResponse, id, setOrder, dispatch, navigate]);

  useEffect(() => {
    let timer;

    if (error.buyItemError) {
      timer = setTimeout(() => {
        alert(error.buyItemError);
        dispatch(BuyItemActions.updateBuyItemError());
        setIsPlacing(false);
      }, 1000);
    }

    return () => clearTimeout(timer);
  }, [error.buyItemError, dispatch]);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <button
        type="button"
        className="inline-block bg-black hover:bg-gray-800 transition-colors text-white text-sm sm:text-base py-1.5 px-4 rounded-md cursor-pointer mb-6"
        onClick={() => navigate(-1)}
      >
        Back
      </button>

      <form
        className="p-5 sm:p-8 flex flex-col bg-white w-full border border-gray-200 rounded-xl shadow-md space-y-5"
        ref={formRef}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-center text-xl sm:text-2xl font-bold text-blue-900">
          Buy Now
        </h1>

        <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4">
          <label htmlFor="title" className="sm:w-36 text-sm sm:text-base font-bold text-gray-700 shrink-0">
            Title :
          </label>
          <input
            type="text"
            id="title"
            value={title}
            disabled
            className="flex-1 bg-gray-50 border border-gray-200 font-semibold px-3 py-2 rounded-md w-full text-sm sm:text-base text-blue-600"
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4">
          <label htmlFor="price" className="sm:w-36 text-sm sm:text-base font-bold text-gray-700 shrink-0">
            Price ($) :
          </label>
          <input
            type="text"
            id="price"
            value={price}
            disabled
            className="flex-1 bg-gray-50 border border-gray-200 font-semibold px-3 py-2 rounded-md w-full text-sm sm:text-base text-blue-600"
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-start gap-1.5 sm:gap-4">
          <label htmlFor="quantity" className="sm:w-36 sm:pt-2 text-sm sm:text-base font-bold text-gray-700 shrink-0">
            Quantity :
          </label>
          <div className="flex-1 w-full">
            <input
              type="number"
              max={5}
              min={1}
              defaultValue={1}
              id="quantity"
              placeholder="1"
              {...register("quantity", {
                required: "Quantity is required",
                min: { value: 1, message: "Minimum quantity is 1" },
                max: { value: 5, message: "Maximum quantity is 5" },
                onChange: (event) => setNewQuantity(Number(event.target.value) || 0),
              })}
              className="w-full border border-gray-300 focus:border-blue-500 focus:outline-none font-semibold px-3 py-2 rounded-md text-sm sm:text-base text-blue-600"
            />
            {errors.quantity && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">
                {errors.quantity.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4">
          <label htmlFor="Total_amount" className="sm:w-36 text-sm sm:text-base font-bold text-gray-700 shrink-0">
            Total Amount :
          </label>
          <input
            type="text"
            id="Total_amount"
            value={`$${(newQuantity * price).toFixed(2)}`}
            disabled
            className="flex-1 bg-gray-50 border border-gray-200 font-bold px-3 py-2 rounded-md w-full text-sm sm:text-base text-blue-600"
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-start gap-1.5 sm:gap-4">
          <label htmlFor="address" className="sm:w-36 sm:pt-2 text-sm sm:text-base font-bold text-gray-700 shrink-0">
            Address :
          </label>
          <div className="flex-1 w-full">
            <input
              type="text"
              id="address"
              placeholder="Enter your delivery address"
              {...register("address", {
                required: "Address is required",
                minLength: { value: 10, message: "Address must be at least 10 characters long" },
                maxLength: { value: 100, message: "Address cannot exceed 100 characters" },
              })}
              className="w-full border border-gray-300 focus:border-blue-500 focus:outline-none font-semibold px-3 py-2 rounded-md text-sm sm:text-base text-gray-800"
            />
            {errors.address && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">
                {errors.address.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4">
          <label htmlFor="payment_mode" className="sm:w-36 text-sm sm:text-base font-bold text-gray-700 shrink-0">
            Payment Mode :
          </label>
          <input
            type="text"
            id="payment_mode"
            value="Cash on Delivery"
            disabled
            className="flex-1 bg-gray-50 border border-gray-200 font-semibold px-3 py-2 rounded-md w-full text-sm sm:text-base text-green-600"
          />
        </div>

        {(isLoading || isPlacing) && <LoadingSpinner />}

        <button
          type="submit"
          disabled={isLoading || isPlacing}
          className="w-full shadow-md bg-blue-600 px-4 py-2.5 rounded-md text-white mt-2 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors cursor-pointer font-bold text-sm sm:text-base"
        >
          {isLoading || isPlacing ? "Placing Order..." : "Place Order"}
        </button>
      </form>
    </div>
  );
};

export default BuyItem;
