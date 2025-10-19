import { Link, Outlet } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <nav className='flex justify-between px-8 py-4 shadow-md'>
                <h1 className='text-2xl font-bold'>Shopee</h1>
                <ul className="pr-7 pt-2">
                    <li className="flex gap-3">
                        <Link to="/signin"><button className='bg-blue-500 w-20 h-7 rounded-md text-white cursor-pointer'>Sign In</button></Link>
                        <Link to="/signup"><button className='bg-amber-500 w-20 h-7 rounded-md text-white cusror-pointer'>Sign Up</button></Link>
                    </li>

                </ul>
            </nav>

            <Outlet/>
            
        </div>
    )
}

export default Home
