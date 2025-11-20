import { useSelector } from "react-redux"
import OrderItem from "./OrderItem";

import { getAllOrderedItems } from "../store/productList"

const Orders = () => {
  
  const orders = useSelector(getAllOrderedItems)
  
  return (
    <div className=' w-auto h-auto  mx-8 mt-10 py-4 px-4 min-h-96'>
      <button className="bg-black text-white w-10 rounded-md cursor-pointer" onClick={()=>history.back()}>Back</button>
      <h2 className='text-2xl text-center mb-10 font-bold text-blue-800'>Your Orders </h2>
      <div className="flex flex-row"><span className="mx-20 text-xl">Item</span><span className="ml-75 text-xl">Price</span><span className="ml-25 text-xl">Quantity</span> <span className="mx-20 text-xl">Total</span>
      <span className="mx-10 text-xl">Booking Date</span>
       


      </div>
      <div className="border-b"></div>
      
      {
      
      orders && orders.map(item => (
          <OrderItem
            key={item.id}
            id={item.id}
            title={item.title}
            price={item.price}
            rating={item.rating_rate}
            image={item.image}
          />
        ))}
      <h1 className="text-end mx-20"><b>Total Amount :</b> ${
          orders ? (orders.reduce((acc,curr)=>{
            return acc+(curr.quantity*curr.price)},0)).toLocaleString("en-US"):""}</h1>
        
    </div>
  )
}

export default Orders
