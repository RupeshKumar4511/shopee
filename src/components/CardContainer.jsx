import Card from './Card'
import { useSelector } from 'react-redux'
const CardContainer = () => {
  const productList = useSelector(store=>store.productList.list)
  const loading = useSelector(store=>store.productList.loading);
  const error = useSelector(store=>store.productList.error);

  
  if(loading){
    return (<h1 className='text-2xl text-center'>Loading...</h1>)
  }
  if(error){
    return (
      <h1 className='text-2xl text-center'>{error}</h1>
    )
  }
  return (
    <div className='flex flex-wrap justify-evenly mx-2 mt-10'>
      {console.log(productList)}
      {
        
        productList.map((item)=> <Card key={item.id} id={item.id} title ={item.title} rating={item.rating} image={item.image} price={item.price
        } />)
      }
    </div>
  )
}

export default CardContainer
