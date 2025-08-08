import NavBar from "./components/NavBar"
import CardContainer from "./components/CardContainer"
import { Outlet } from "react-router-dom"
function App() {
  

  return (
    <>
      <NavBar></NavBar>
      <Outlet/>
    </>
  )
}

export default App
