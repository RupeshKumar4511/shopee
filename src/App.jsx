import NavBar from "./components/NavBar"
import { Outlet } from "react-router-dom"
import useFilter from './Hooks/useFilter';
import Footer from "./components/Footer"
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "./store/buyItems";
import { useState } from "react";
function App() {
  const productList = useSelector(store=>store.productList.list)
  const dispatch = useDispatch();
  dispatch(fetchOrders());
  const [filteredData, setQuery] = useFilter(productList, (productList) => productList.category);
  localStorage.setItem("order",JSON.stringify({"place":false}));
  const [order,setOrder] = useState(JSON.parse(localStorage.getItem("order")));
  

  return (
    <>
      <NavBar setQuery={setQuery} order={order}></NavBar>
      <Outlet context={{filteredData,setQuery,order,setOrder}} />
      <Footer/>
    </>
  )
}

export default App
