import NavBar from "./components/NavBar"
import CardContainer from "./components/CardContainer"
import { Outlet } from "react-router-dom"
import Footer from "./components/Footer"
function App() {
  

  return (
    <>
      <NavBar></NavBar>
      <Outlet/>
      <Footer/>
    </>
  )
}

export default App
