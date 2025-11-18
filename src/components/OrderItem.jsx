import { useSelector} from "react-redux";
const OrderItem = ({id,title,price,rating_rate,image}) => {

  const orderedItems = useSelector(store=>store.order.list)
  
  
  return (
   <div className='my-3 flex flex-row px-2 items-center border-b py-2'>
        
        <img className='w-15' src={image} alt="cart-image" />
        <h2 className='mx-2 text-wrap flex flex-col w-90'>{title} 
        <span>{rating_rate} ★ ★ ★ ★</span>
        </h2>
        <p className='mx-14 text-xl w-20'>${price} </p>
        
        <span className='px-4'>{orderedItems.filter(order=>order.productId == id)[0].quantity}</span>

        <p className="text-xl mx-28 w-20">${(price * orderedItems.filter(order=>order.productId == id)[0].quantity).toLocaleString("en-US")}</p>

        <p className=' text-xl w-20 '>{new Date(orderedItems.filter(order=>order.productId == id)[0].Booking_Date).toLocaleDateString()}</p>

      </div>
  )
}

export default OrderItem
