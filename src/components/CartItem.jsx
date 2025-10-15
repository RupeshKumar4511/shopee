import { MdDelete } from "react-icons/md";
import { useDispatch,useSelector} from "react-redux";
import {cartItemAction} from '../store/cartItems'
const CartItem = ({id,title,price,rating,image}) => {

  const dispatch = useDispatch();
  const cartItems = useSelector(store=>store.cartItems.list)

  
  return (
   <div className='my-3 flex flex-row px-2 items-center border-b py-2'>
        
        <img className='w-15' src={image} alt="cart-image" />
        <h2 className='mx-2 text-wrap flex flex-col w-90'>{title} 
        <span>{rating.rate} ★ ★ ★ ★</span>
        </h2>
        <p className='mx-14 text-xl w-20'>${price} </p>
        <button className='bg-gray-300 p-2 'onClick={()=>dispatch(cartItemAction.increaseQuantity({productId:id}))}>+</button>
        
        <span className='px-4'>{cartItems.filter(cart=>cart.productId == id)[0].quantity}</span>
        
        <button className='bg-gray-300 py-2 px-2.5' onClick={()=>dispatch(cartItemAction.decreaseQuantity({productId:id}))}>-</button>

        <p className="text-xl mx-20 w-20">${(price * cartItems.filter(cart=>cart.productId == id)[0].quantity).toLocaleString("en-US")}</p>

        <button onClick={()=> {dispatch(cartItemAction.removeItem({productId:id}))}} ><MdDelete className="cursor-pointer"  size={30}/></button>

        <button className="ml-5 py-2 px-4 bg-blue-600 rounded-md text-white" onClick={()=> {console.log("Buy Now")}}>Buy Now</button>

      </div>
  )
}

export default CartItem
