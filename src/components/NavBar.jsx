import { useEffect, useState } from "react";
import { FaCartShopping, FaBars, FaXmark } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchProductsData } from "../store/productList";
import { cartItemAction, deleteCartItemsData, fetchCartItemsData } from "../store/cartItems";
import { FaSignOutAlt } from "react-icons/fa";
import { signOut } from "../store/auth";

const NavBar = ({ setQuery, order }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchData, setSearchData] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const cartItems = useSelector((store) => store.cartItems.list);

  function handleSearch(event) {
    if (event.key === "Enter") {
      setQuery(searchData);
      setMenuOpen(false);
    }
  }

  function handleChange(event) {
    setSearchData(event.target.value);
  }

  function getUserName() {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.username || "User";
  }

  useEffect(() => {
    dispatch(fetchProductsData());
    dispatch(fetchCartItemsData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (order?.place) {
      dispatch(deleteCartItemsData({ productId: order.productId, user: getUserName() }));
      dispatch(cartItemAction.removeItem({ productId: order.productId }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order]);

  function handleSignOut() {
    const username = getUserName();
    dispatch(signOut({ username }));
    setTimeout(() => {
      navigate("/");
      localStorage.removeItem("user");
    }, 100);
  }

  const totalCartQuantity = cartItems
    ? cartItems.reduce((accumulator, currentValue) => Number(accumulator) + Number(currentValue.quantity), 0)
    : 0;

  return (
    <nav className="bg-white shadow-md px-4 sm:px-8 py-5 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <Link to="/api" className="text-xl sm:text-2xl font-bold text-gray-800">
          Shopee
        </Link>

        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <input
            type="text"
            value={searchData}
            placeholder="Search for products..."
            className="w-full border border-gray-300 focus:border-blue-500 focus:outline-none rounded-lg px-3 py-1.5 text-sm sm:text-base"
            onKeyDown={handleSearch}
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <div className="hidden md:flex items-center gap-5 text-sm lg:text-base">
            <span className="text-gray-700">
              Welcome,{" "}
              <Link to="/api/profile" className="text-blue-800 font-semibold hover:underline">
                {getUserName()}
              </Link>
            </span>

            <Link to="/api/orders" title="Your orders" className="text-blue-700 hover:underline font-bold">
              Orders
            </Link>

            <button
              title="Sign out"
              onClick={handleSignOut}
              className="flex items-center gap-1 text-gray-700 hover:text-red-600 transition-colors cursor-pointer"
            >
              <FaSignOutAlt size={18} />
            </button>
          </div>

          <Link to="/api/carts" title="Your carts" className="relative p-1 text-gray-700 hover:text-black">
            <FaCartShopping className="text-xl sm:text-2xl cursor-pointer" />
            <span className="absolute -top-1.5 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {totalCartQuantity}
            </span>
          </Link>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
            className="md:hidden p-1.5 text-gray-700 hover:text-black focus:outline-none cursor-pointer"
          >
            {menuOpen ? <FaXmark size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      <div className="mt-3 md:hidden">
        <input
          type="text"
          value={searchData}
          placeholder="Search for products..."
          className="w-full border border-gray-300 focus:border-blue-500 focus:outline-none rounded-lg px-3 py-1.5 text-sm"
          onKeyDown={handleSearch}
          onChange={handleChange}
        />
      </div>

      {menuOpen && (
        <div className="md:hidden mt-3 pt-3 border-t border-gray-200 flex flex-col gap-3 text-sm">
          <div className="text-gray-700">
            Welcome,{" "}
            <Link
              to="/api/profile"
              onClick={() => setMenuOpen(false)}
              className="text-blue-800 font-semibold hover:underline"
            >
              {getUserName()}
            </Link>
          </div>

          <Link
            to="/api/orders"
            onClick={() => setMenuOpen(false)}
            className="text-blue-700 font-bold hover:underline"
          >
            Orders
          </Link>

          <button
            onClick={() => {
              setMenuOpen(false);
              handleSignOut();
            }}
            className="flex items-center gap-2 text-red-600 font-medium pt-1 cursor-pointer w-fit"
          >
            <FaSignOutAlt size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
