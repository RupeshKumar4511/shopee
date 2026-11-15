import { useDispatch } from "react-redux";
import { addCartItemsData, cartItemAction } from "../store/cartItems";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Card = ({ id, title, image, price, rating_rate }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [change, setChange] = useState("");

  function getUserName() {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.username || "";
  }

  function handleBuy(image, title, price, id) {
    navigate("/api/buy-item", { state: { image, title, price, id } });
  }

  function handleCarts(id, price, title) {
    dispatch(cartItemAction.addItem({ productId: id, price: price, title: title }));
    setChange("added");

    setTimeout(() => {
      dispatch(
        addCartItemsData({
          productId: id,
          price: price,
          title: title,
          quantity: 1,
          user: getUserName(),
        })
      );
    }, 1000);
  }

  return (
    <div className="flex flex-col w-full max-w-[18rem] sm:w-72 h-[24rem] sm:h-[25rem] bg-white border border-gray-200 shadow-md hover:shadow-lg transition-shadow rounded-2xl overflow-hidden mx-auto">
      
      <div className="w-full h-48 shrink-0 bg-gray-100 flex items-center justify-center p-4 overflow-hidden">
        <img
          className="w-full h-full object-contain"
          src={image}
          alt={title || "Product image"}
        />
      </div>

      
      <div className="flex flex-col flex-1 justify-between p-4 overflow-hidden">
        <div>
          
          <h3
            className="text-sm sm:text-base font-medium text-gray-800 line-clamp-2 min-h-[2.5rem] sm:min-h-[3rem] mb-2"
            title={title}
          >
            <b>Title: </b>{title}
          </h3>

          
          <div className="flex items-center justify-between text-sm sm:text-base text-gray-700">
            <span>
              <b>Price: </b>${price}
            </span>
            <span>
              <b>Rating: </b>{rating_rate}
            </span>
          </div>
        </div>

        
        <div className="flex gap-2 sm:gap-3 mt-auto pt-3">
          <button
            className="flex-1 px-3 py-2 text-xs sm:text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
            onClick={() => handleCarts(id, price, title)}
          >
            {change === "added" ? "Added to Cart" : "Add to Cart"}
          </button>

          <button
            className="flex-1 px-3 py-2 text-xs sm:text-sm font-medium bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors cursor-pointer"
            onClick={() => handleBuy(image, title, price, id)}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
