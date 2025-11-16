import { useOutletContext } from 'react-router-dom';
import Card from './Card'
import { useSelector } from 'react-redux';
const CardContainer = () => {
  const loading = useSelector(store=>store.productList.loading);
  const error = useSelector(store=>store.productList.error);
    const { filteredData } = useOutletContext();
  
  if(loading){
    return (<h1 className='text-2xl text-center'>Loading...</h1>)
  }
  if(error){
    return (
      <h1 className='text-2xl text-center'>{error}</h1>
    )
  }
  return (
    <div className='flex flex-wrap justify-evenly mx-2 mt-10 '>
      {
        
        filteredData.map((item)=> <Card key={item.id} id={item.id} title ={item.title} rating_rate={item.rating_rate} image={item.image} price={item.price} />)
      }
      
    </div>
  )
}

export default CardContainer
