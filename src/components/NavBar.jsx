import { useEffect } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProductsData } from "../store/productList";
import { fetchCartItemsData } from "../store/cartItems";
// import { fetchedData } from "../middlewares/api";

const NavBar = () => {
  const dispatch = useDispatch()

  useEffect(()=>{


  dispatch(fetchProductsData())
  dispatch(fetchCartItemsData())


  // using custom middleware


   // dispatch(fetchedData({
  //     url:'products',
  //     onStart:productListAction.fetchProducts.type,
  //     onSuccess:productListAction.updateAllProducts.type,
  //     onError:productListAction.fetchProductsError.type
  //   }))


  // dispatch(fetchedData({
  //     url:'carts/5',
  //     onStart:cartItemAction.fetchCartItems.type,
  //     onSuccess:cartItemAction.loadCartItems.type,
  //     onError:cartItemAction.fetchCartItemsError.type
  //   }))


  

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const cartItems = useSelector(store=>store.cartItems.list)


  return (
    <nav className='flex justify-between px-8 py-4 shadow-md'>
        <h1 className='text-2xl font-bold'>Shopee</h1>
        <ul className="pr-7 pt-2">
            <li className="flex flex-col gap-0" >
              <span className="relative pl-1">{cartItems.reduce((accumulator,currentValue)=> accumulator+currentValue.quantity,0)}</span>
              <Link to="/api/carts"><FaCartShopping size={20} className="cursor-pointer" /></Link>
              
              </li>
            
        </ul>
    </nav>
  )
}

export default NavBar
