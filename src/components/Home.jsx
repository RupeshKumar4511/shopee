import { FaCartShopping } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';

const Home = () => {
    const cartItems = useSelector(store => store.cartItems.list);

    return (
        <div>
            <nav className='flex justify-between px-8 py-4 shadow-md'>
                <Link to="/" className='text-2xl font-bold'>Shopee</Link>
                <ul className="pr-10 pt-2 flex gap-5">
                    <li className="flex gap-3">
                        <Link to="/signin"><button className='bg-blue-500 w-20 h-7 rounded-md text-white cursor-pointer'>Sign In</button></Link>
                        <Link to="/signup"><button className='bg-amber-500 w-20 h-7 rounded-md text-white cusror-pointer'>Sign Up</button></Link>
                    </li>

                    <li className="flex flex-col gap-0" >
                        <span className="relative pl-1 bottom-2">{cartItems ? cartItems.reduce((accumulator, currentValue) => Number(accumulator) + Number(currentValue.quantity), 0) : 0}</span>
                        <Link to="/carts" title="Your carts"><FaCartShopping size={20} className="cursor-pointer relative bottom-3" /></Link>

                    </li>

                </ul>
            </nav>

            <Outlet />

        </div>
    )
}

export default Home
