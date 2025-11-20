import { useDispatch,  } from "react-redux";
import { cartItemAction } from '../store/cartItems'
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const FrontCard = ({ id, title, price, rating_rate, image }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [change, setChange] = useState('')


  function handleBuy() {
    alert("Signin to continue");
    setTimeout(() => {
      navigate('/signin')
    })
  }

  function handleCarts(id, price, title) {
    dispatch(cartItemAction.addItem({ productId: id, price: price, title: title }));
    setChange("added");
  }


  return (
    <div className="flex flex-col w-70 h-95 mb-10 shadow-md rounded-2xl overflow-hidden mx-2">

      <img className="max-w-md h-1/2" src={image} alt="image" />
      <div className="h-1/2">
        <h3 className='p-2'><b>Title : </b>{title}</h3>
        <p className="flex gap-8 px-3"><span> <b>Price: </b>${price}</span>
          <span> <b>Rating: </b>{rating_rate}</span></p>
        <div className="flex">
          <button className='w-30 px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700  mx-3 my-4 cursor-pointer' onClick={() => handleCarts(id, price, title)}>{change === 'added' ? 'Added to Cart' : 'Add to Cart'}</button>

          <button className='w-30 px-2 py-1 bg-green-500 text-white rounded hover:bg-green-700  mx-3 my-4 cursor-pointer' onClick={() => handleBuy()}>Buy Now</button>
        </div>
      </div>
    </div>
  )
}

export default FrontCard
