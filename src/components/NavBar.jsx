import { useEffect, useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchProductsData } from "../store/productList";
import { fetchCartItemsData } from "../store/cartItems";
import { FaSignOutAlt } from "react-icons/fa";
import {signOut} from '../store/auth';

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [searchData,setSearchData]= useState("");
  //  const { response, isLoading, error } = useSelector(store => store.auth);

  function handleSearch(event){
    if(event.key == "Enter"){
      // send request to server for a particular product
      console.log("result : "+ searchData)
    }
  }

  function handleChange(event){
    setSearchData(event.target.value);
  }

  function getUserName(){
    const user = JSON.parse(localStorage.getItem("user"));
    return user.username;
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

  const cartItems = useSelector(store=>store.cartItems.list);

  function handleSignOut(){
    const username = getUserName()
    dispatch(signOut({username:username}))
    setTimeout(()=>{
      navigate('/')
    },100)
  }


  return (
    <nav className='flex justify-between px-8 py-1.5 shadow-md'>
        <h1 className='text-2xl font-bold py-2'>Shopee</h1>
        <div className="text-xl relative top-3"><input type="text" placeholder="Search for products" className="border-1  rounded-md px-2 py-0.5" onKeyDown={(event)=>handleSearch(event)} onChange={(event)=>handleChange(event)}/></div>
        <div className="text-xl relative top-3">Welcome <span className="text-blue-800">{getUserName()}</span></div>
        <button title="sign out"><FaSignOutAlt size={20} className="cursor-pointer relative top-1" onClick={()=>{handleSignOut()}}/></button>
        <ul className="pr-7 pt-2 flex">
          <li ><Link to="/api/orders" title="Your orders" className="text-blue-700 relative top-3 right-4 font-bold">Orders </Link></li>
            <li className="flex flex-col gap-0" >
              <span className="relative pl-1">{cartItems.reduce((accumulator,currentValue)=> accumulator+currentValue.quantity,0)}</span>
              <Link to="/api/carts" title="Your carts"><FaCartShopping size={20} className="cursor-pointer" /></Link>
              
              </li>
            
        </ul>
    </nav>
  )
}

export default NavBar
