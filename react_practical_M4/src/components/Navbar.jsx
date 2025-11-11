import { Link } from "react-router-dom"
import "./Navbar.css"

export default function Navbar(){
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/search">Search</Link>
      <Link to="/fav">Favourites</Link>
    </nav>
  )
}
