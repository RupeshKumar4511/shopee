import { useDispatch } from "react-redux"
import { cartItemAction } from "../store/cartItems";

const card = ({id,title,image,price,rating}) => {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = useDispatch();
  
  function handleCarts(id,price){
    dispatch(cartItemAction.addItem({productId:id,price:price}))
  }
  
  return (
    <div className="flex flex-col w-70 h-95 mb-10 shadow-md rounded-2xl overflow-hidden mx-2">
        
        <img className="max-w-md h-1/2" src={image} alt="image" />
        <div className="h-1/2">
          <h3 className='p-2'><b>Title : </b>{title}</h3>
        <p className="flex gap-8 px-3"><span> <b>Price: </b>${price}</span>
        <span> <b>Rating: </b>{rating.rate}</span></p>
        <div className="flex">
          <button className='w-30 px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700  mx-3 my-4 cursor-pointer' onClick={()=> handleCarts(id,price)}>Add To Cart</button>
        <button className='w-30 px-2 py-1 bg-green-500 text-white rounded hover:bg-green-700  mx-3 my-4 cursor-pointer' onClick={()=> console.log("buy now")}>Buy Now</button>
        </div>
        </div>
      </div>
  )
}

export default card
