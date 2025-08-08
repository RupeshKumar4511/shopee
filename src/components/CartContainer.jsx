import { useSelector } from "react-redux"
import CartItem from "./CartItem"
import { getAllCartItems } from "../store/productList"

const CartContainer = () => {
  const carts = useSelector(getAllCartItems)
  
  return (
    <div className=' w-auto h-auto  mx-8 mt-10 py-4 px-4'>
      <h2 className='text-2xl text-center mb-10'>Items in Your Cart </h2>
      <div className="flex flex-row"><span className="mx-20 text-xl">Item</span><span className="ml-75 text-xl">Price</span><span className="ml-25 text-xl">Quantity</span> <span className="mx-20 text-xl">Total</span>
      </div>
      <div className="border-b"></div>
      {
      
      carts.map(item => (
          <CartItem
            key={item.id}
            id={item.id}
            title={item.title}
            price={item.price}
            rating={item.rating}
            image={item.image}
          />
        ))}
        <h1 className="text-end mx-20"><b>Total Amount :</b> ${
          (carts.reduce((acc,curr)=>{
            return acc+(curr.quantity*curr.price)},0)).toLocaleString("en-US")}</h1>
    </div>
  )
}

export default CartContainer
