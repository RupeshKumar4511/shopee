import { FaCartShopping } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import Footer from './Footer.jsx';

const Home = () => {
    const cartItems = useSelector(store => store.cartItems.list);

    const totalCartQuantity = cartItems
        ? cartItems.reduce((accumulator, currentValue) => Number(accumulator) + Number(currentValue.quantity), 0)
        : 0;

    return (
        <div className="min-h-screen flex flex-col">
            <nav className="flex flex-wrap items-center justify-between px-4 sm:px-8 py-4 shadow-md bg-white">
                <Link to="/" className="text-xl sm:text-2xl font-bold text-gray-800">
                    Shopee
                </Link>

                <ul className="flex items-center gap-3 sm:gap-6">
                    <li className="flex items-center gap-2 sm:gap-3">
                        <Link to="/signin">
                            <button className="bg-blue-500 hover:bg-blue-600 transition-colors px-3 sm:px-4 py-1.5 text-sm sm:text-base rounded-md text-white cursor-pointer">
                                Sign In
                            </button>
                        </Link>
                        <Link to="/signup">
                            <button className="bg-amber-500 hover:bg-amber-600 transition-colors px-3 sm:px-4 py-1.5 text-sm sm:text-base rounded-md text-white cursor-pointer">
                                Sign Up
                            </button>
                        </Link>
                    </li>

                    <li className="relative flex items-center">
                        <Link to="/carts" title="Your carts" className="relative p-1 text-gray-700 hover:text-black">
                            <FaCartShopping className="text-xl sm:text-2xl cursor-pointer" />
                            <span className="absolute -top-1.5 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                                {totalCartQuantity}
                            </span>
                        </Link>
                    </li>
                </ul>
            </nav>

            <main className="flex-grow">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
};

export default Home;
