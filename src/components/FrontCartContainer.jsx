import { useSelector } from "react-redux";
import { getAllCartItems } from "../store/productList";
import { Link } from "react-router-dom";
import FrontCartItem from "./FrontCartItem";
import Message from './Message.jsx';

const FrontCartContainer = () => {
  const carts = useSelector(getAllCartItems);

  if (carts?.length === 0) {
    return <Message msg={"Your cart is empty."} />;
  }

  const totalAmount = carts
    .reduce((acc, curr) => acc + curr.quantity * curr.price, 0)
    .toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 mt-6 sm:mt-10 py-4 min-h-96">
      <Link
        className="inline-block bg-black hover:bg-gray-800 transition-colors text-white text-sm sm:text-base rounded-md cursor-pointer py-1.5 px-4"
        to="/"
      >
        Back
      </Link>

      <h2 className="text-xl sm:text-2xl md:text-3xl text-center my-6 sm:my-10 font-bold text-green-600">
        Items in Your Cart
      </h2>

      <div className="hidden md:grid md:grid-cols-12 gap-4 pb-3 border-b border-gray-300 text-lg font-semibold text-gray-700">
        <span className="col-span-6 pl-4">Item</span>
        <span className="col-span-2 text-center">Price</span>
        <span className="col-span-2 text-center">Quantity</span>
        <span className="col-span-2 text-right pr-40">Total</span>
      </div>

      <div className="divide-y divide-gray-200">
        {carts.map((item) => (
          <FrontCartItem
            key={item.id}
            id={item.id}
            title={item.title}
            price={item.price}
            rating={item.rating_rate}
            image={item.image}
          />
        ))}
      </div>

      <div className="mt-8 pt-4 border-t border-gray-300 flex flex-col sm:flex-row justify-between sm:justify-end items-center gap-4">
        <h3 className="text-lg sm:text-xl text-gray-800">
          <b>Total Amount:</b>{" "}
          <span className="text-green-700 font-bold">${totalAmount}</span>
        </h3>
      </div>
    </div>
  );
};

export default FrontCartContainer;
