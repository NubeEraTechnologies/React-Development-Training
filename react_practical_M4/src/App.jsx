import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"

import Home from "./pages/Home"
import About from "./pages/About"
import Search from "./pages/Search"
import Fav from "./pages/Fav"


export default function App() {
  return (
    <BrowserRouter>
      <Navbar/>

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/search" element={<Search/>} />
        <Route path="/fav" element={<Fav/>} />
      </Routes>
    </BrowserRouter>
  )
}
