import image from '../assets/ecommerce.jpg';

const Intro = () => {
  return (
    <div className='w-full flex justify-center items-center h-full mt-4'>
      <img src={image} alt="ecommerce image" className='rounded-full w-125 h-125 ' />
    </div>
  )
}

export default Intro
