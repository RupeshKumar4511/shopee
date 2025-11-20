import { useDispatch, useSelector } from "react-redux"
import FrontCard from "./FrontCard"
import { useEffect } from "react"
import { fetchProductsData } from "../store/productList"

const Intro = () => {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(fetchProductsData());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  const productList = useSelector(store=>store.productList.list)
  
  return (
    <div className='flex flex-wrap justify-evenly mx-2 mt-10 min-w-96'>
      {
        
        productList.map((item)=> <FrontCard key={item.id} id={item.id} title ={item.title} rating_rate={item.rating_rate} image={item.image} price={item.price} />)
      }
      
    </div>
  )
}

export default Intro
