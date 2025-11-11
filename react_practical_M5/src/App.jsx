import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Search from './pages/Search'
import ProductDetails from './pages/ProductDetails'

export default function App() {
  return (
    <div>
      <nav style={{display:"flex", gap:"20px", marginBottom:"20px"}}>
        <Link to="/">Home</Link>
        <Link to="/search">Search</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/product/:id" element={<ProductDetails />} />

      </Routes>
    </div>
  )
}
