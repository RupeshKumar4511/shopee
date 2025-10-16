import { useEffect, useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProductsData, fetchSearchedProduct } from "../store/productList";
import { fetchCartItemsData } from "../store/cartItems";
// import { fetchedData } from "../middlewares/api";

const NavBar = () => {
  const dispatch = useDispatch()
  const [searchData,setSearchData]= useState("");

  console.log(fetchSearchedProduct());

  function handleSearch(event){
    if(event.key == "Enter"){
      // send request to server for a particular product
      console.log("result : "+searchData)
    }
  }

  function handleChange(event){
    setSearchData(event.target.value);
  }

  

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
        <div className="text-xl">Search : <input type="text" className="border-1  rounded-md px-2 py-1" onKeyDown={(event)=>handleSearch(event)} onChange={(event)=>handleChange(event)}/></div>
        <div className="text-xl">Welcome {}</div>
        <ul className="pr-7 pt-2 flex">
          <li><Link to="/api/orders" className="text-blue-700 relative top-3 right-3">Your Orders </Link></li>
            <li className="flex flex-col gap-0" >
              <span className="relative pl-1">{cartItems.reduce((accumulator,currentValue)=> accumulator+currentValue.quantity,0)}</span>
              <Link to="/api/carts"><FaCartShopping size={20} className="cursor-pointer" /></Link>
              
              </li>
            
        </ul>
    </nav>
  )
}

export default NavBar
