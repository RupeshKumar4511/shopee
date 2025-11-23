import { useSelector } from "react-redux"
import { getAllCartItems } from "../store/productList"
import { Link } from "react-router-dom"
import FrontCartItem from "./FrontCartItem"

const FrontCartContainer = () => {
  const carts = useSelector(getAllCartItems)

  if(!carts || carts.length ==0 ){
    return <Message msg={"Your cart is empty."}/>
  }
  
  return (
    <div className=' w-auto h-auto  mx-8 mt-10 py-4 px-4 min-h-96'>
      <Link className="bg-black text-white w-10 rounded-md cursor-pointer py-1 px-2" to="/">Back</Link>
      <h2 className='text-2xl text-center mb-10 font-bold text-green-600'>Items in Your Cart </h2>
      <div className="flex flex-row"><span className="mx-20 text-xl">Item</span><span className="ml-75 text-xl">Price</span><span className="ml-25 text-xl">Quantity</span> <span className="mx-20 text-xl">Total</span>
      </div>
      <div className="border-b"></div>
      {
      
      carts?carts.map(item => (
          <FrontCartItem
            key={item.id}
            id={item.id}
            title={item.title}
            price={item.price}
            rating={item.rating_rate}
            image={item.image}
          />
        )):<h1 className="text-blue-600 ml-96 mt-10 text-2xl font-bold">Your shopee cart is empty.</h1>}
        {
          (carts) && <h1 className="text-end mx-20"><b>Total Amount :</b> ${
          (carts.reduce((acc,curr)=>{
            return acc+(curr.quantity*curr.price)},0)).toLocaleString("en-US")}</h1>
        }
    </div>
  )
}

export default FrontCartContainer
