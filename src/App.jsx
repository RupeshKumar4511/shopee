import NavBar from "./components/NavBar"
import { Outlet } from "react-router-dom"
import useFilter from './Hooks/useFilter';
import Footer from "./components/Footer"
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "./store/buyItems";
function App() {
  const productList = useSelector(store=>store.productList.list)
  const dispatch = useDispatch();
  dispatch(fetchOrders())
  const [filteredData, setQuery] = useFilter(productList, (productList) => productList.category);

  return (
    <>
      <NavBar setQuery={setQuery}></NavBar>
      <Outlet context={{filteredData,setQuery}}/>
      <Footer/>
    </>
  )
}

export default App
