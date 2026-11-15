import { useSelector, useDispatch } from "react-redux";
import { BuyItemActions, deleteOrder } from "../store/buyItems";
import { MdDelete } from "react-icons/md";

const OrderItem = ({ id, title, price, rating_rate, image }) => {
  const orderedItems = useSelector((store) => store.order.list);
  const dispatch = useDispatch();

  function getUserName() {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.username || "";
  }

  const currentOrder = orderedItems.find((order) => order.productId == id);
  if (!currentOrder) return null;

  const quantity = currentOrder.quantity;
  const itemTotal = (price * quantity).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const bookingDate = new Date(currentOrder.Booking_Date).toLocaleDateString("en-GB");

  const isDelivered = currentOrder.status?.toLowerCase() === "delivered";

  const handleCancelOrder = async () => {
    const isConfirmed = window.confirm(
      `Are you sure you want to cancel your order for "${title}"?`
    );

    if (!isConfirmed) return;

    try {
      const result = await dispatch(
        deleteOrder({ productId: id, user: getUserName() })
      ).unwrap();

      alert(result?.message || "Order cancelled successfully.");
      dispatch(BuyItemActions.removeOrder({ productId: id }));
    } catch (error) {
      alert(error?.message || error || "Failed to cancel order. Please try again.");
    }
  };

  return (
    <div className="py-4 px-2 sm:px-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-center border-b border-gray-200">
      <div className="md:col-span-3 flex items-center gap-3 sm:gap-4">
        <img
          className="w-16 h-16 sm:w-20 sm:h-20 object-contain shrink-0 bg-gray-50 p-1 rounded-md border border-gray-100"
          src={image}
          alt={title || "order-image"}
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

      <div className="md:col-span-2 flex justify-between md:justify-center items-center text-sm sm:text-base text-gray-700">
        <span className="md:hidden font-semibold text-gray-500">Price:</span>
        <span>${price}</span>
      </div>

      {/* Quantity (1 column on desktop) */}
      <div className="md:col-span-1 flex justify-between md:justify-center items-center text-sm sm:text-base font-medium text-gray-800">
        <span className="md:hidden font-semibold text-gray-500">Quantity:</span>
        <span>{quantity}</span>
      </div>

      <div className="md:col-span-2 flex justify-between md:justify-center items-center text-sm sm:text-base font-bold text-gray-900">
        <span className="md:hidden font-semibold text-gray-500">Total:</span>
        <span>${itemTotal}</span>
      </div>

      <div className="md:col-span-2 flex justify-between md:justify-center items-center">
        <span className="md:hidden font-semibold text-sm text-gray-500">Status:</span>
        <span
          className={`px-2.5 py-1 rounded-full text-xs sm:text-sm font-semibold ${
            isDelivered
              ? "bg-green-100 text-green-700"
              : "bg-amber-100 text-amber-700"
          }`}
        >
          {isDelivered ? "Delivered" : "Not Delivered"}
        </span>
      </div>

      <div className="md:col-span-2 flex items-center justify-between md:justify-end gap-3 pt-2 md:pt-0 border-t md:border-t-0 border-gray-100">
        <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-600">
          <span className="md:hidden font-semibold text-gray-500">Order Date:</span>
          <span>{bookingDate}</span>
        </div>

        {!isDelivered && (
          <button
            title="Cancel order"
            className="text-red-500 hover:text-red-700 transition-colors p-1 cursor-pointer"
            onClick={handleCancelOrder}
          >
            <MdDelete size={22} />
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderItem;
