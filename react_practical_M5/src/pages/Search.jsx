import './pages.css'
import { useState } from "react"
import { Link } from "react-router-dom"
import { searchProducts } from "../services/api"

export default function Search() {
  const [text, setText] = useState("")
  const [data, setData] = useState([])

  async function handleSearch() {
    const products = await searchProducts(text)
    setData(products)
  }

  return (
    <div className="page">
      <h1>Search Products</h1>

      <input 
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="type phone, laptop, watch"
      />

      <button onClick={handleSearch}>Search</button>

      <div className="results">
        {data.map(p => (
          <div key={p.id} className="card">
            <Link to={`/product/${p.id}`}>{p.title}</Link>
            <p style={{marginTop:8,opacity:.7}}>{p.brand}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
