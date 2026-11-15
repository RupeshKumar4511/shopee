import NavBar from "./components/NavBar"
import { Outlet, useNavigate } from "react-router-dom"
import useFilter from './Hooks/useFilter';
import Footer from "./components/Footer"
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "./store/buyItems";
import { useEffect, useState } from "react";
function App() {
  const productList = useSelector(store => store.productList.list)
  const { signInResponse } = useSelector(store => store.auth.response)
  const dispatch = useDispatch();
  dispatch(fetchOrders());
  const [filteredData, setQuery] = useFilter(productList, (productList) => productList.category);
  localStorage.setItem("order", JSON.stringify({ "place": false }));
  const [order, setOrder] = useState(JSON.parse(localStorage.getItem("order")));
  const navigate = useNavigate()

  useEffect(() => {
    console.log(signInResponse)
    if (!signInResponse?.username) {
      navigate("/signin")
    }
  }, [navigate, signInResponse])


  return (
    <>
      <NavBar setQuery={setQuery} order={order}></NavBar>
      <Outlet context={{ filteredData, setQuery, order, setOrder }} />
      <Footer />
    </>
  )
}

export default App
