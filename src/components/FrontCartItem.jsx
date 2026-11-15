import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { cartItemAction } from '../store/cartItems';
import { useNavigate } from "react-router-dom";

const FrontCartItem = ({ id, title, price, rating_rate, image }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((store) => store.cartItems.list);

  const currentItem = cartItems.find((cart) => cart.productId == id);
  const quantity = currentItem ? currentItem.quantity : 0;

  if (!currentItem) return null;

  const handleBuyItem = () => {
    alert("Sign in to buy products");
    setTimeout(() => {
      navigate('/signin');
    });
  };

  const itemTotal = (price * quantity).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className="py-4 px-2 sm:px-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-center border-b border-gray-200">
      {/* Item Image & Title (6 columns on desktop) */}
      <div className="md:col-span-6 flex items-center gap-3 sm:gap-4">
        <img
          className="w-16 h-16 sm:w-20 sm:h-20 object-contain shrink-0 bg-gray-50 p-1 rounded-md border border-gray-100"
          src={image}
          alt={title || "cart-image"}
        />
        <div className="flex flex-col min-w-0">
          <h2 className="text-sm sm:text-base font-medium text-gray-800 line-clamp-2" title={title}>
            {title}
          </h2>
          {rating_rate && (
            <span className="text-xs sm:text-sm text-amber-500 mt-1">
              {rating_rate} ★ ★ ★ ★
            </span>
          )}
        </div>
      </div>

      <div className="md:col-span-2 flex justify-between md:justify-center items-center text-sm sm:text-base md:text-lg text-gray-700">
        <span className="md:hidden font-semibold text-gray-500">Price:</span>
        <span>${price}</span>
      </div>

      <div className="md:col-span-2 flex justify-between md:justify-center items-center">
        <span className="md:hidden font-semibold text-sm text-gray-500">Quantity:</span>
        <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
          <button
            className="bg-gray-200 hover:bg-gray-300 transition-colors px-3 py-1 font-bold cursor-pointer"
            onClick={() => dispatch(cartItemAction.decreaseQuantity({ productId: id }))}
            aria-label="Decrease quantity"
          >
            -
          </button>
          <span className="px-3 sm:px-4 py-1 text-sm sm:text-base font-medium bg-white">
            {quantity}
          </span>
          <button
            className="bg-gray-200 hover:bg-gray-300 transition-colors px-3 py-1 font-bold cursor-pointer"
            onClick={() => dispatch(cartItemAction.increaseQuantity({ productId: id }))}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      <div className="md:col-span-2 flex flex-wrap sm:flex-nowrap items-center justify-between md:justify-end gap-3 pt-2 md:pt-0 border-t md:border-t-0 border-gray-100">
        <div className="flex items-center gap-1 md:hidden">
          <span className="font-semibold text-sm text-gray-500">Total:</span>
        </div>

        <p className="text-base sm:text-lg font-bold text-gray-900">
          ${itemTotal}
        </p>

        <div className="flex items-center gap-2">
          <button
            title="Delete item"
            className="text-red-500 hover:text-red-700 transition-colors p-1 cursor-pointer"
            onClick={() => dispatch(cartItemAction.removeItem({ productId: id }))}
          >
            <MdDelete size={24} />
          </button>

          <button
            className="py-1.5 px-3 sm:px-4 bg-blue-600 hover:bg-blue-700 transition-colors rounded-md text-xs sm:text-sm font-medium text-white cursor-pointer"
            onClick={handleBuyItem}
          >
            Buy
          </button>
        </div>
      </div>
    </div>
  );
};

export default FrontCartItem;
