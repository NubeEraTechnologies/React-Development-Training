import './pages.css'
import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

export default function ProductDetails() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)

  useEffect(() => {
    axios.get(`https://dummyjson.com/products/${id}`).then(res => {
      setProduct(res.data)
    })
  }, [id])

  if(!product) return <p className="page">Loading...</p>

  return (
    <div className="page">
      <Link to="/search" className="btn-back">← Back to Search</Link>

      <div className="detail-layout">
        <div className="detail-image">
          <img src={product.thumbnail} alt={product.title} />
        </div>

        <div>
          <h1>{product.title}</h1>
          <p style={{fontSize:20,marginBottom:10}}>{product.brand} • {product.category}</p>
          <h2 style={{marginBottom:20}}>${product.price}</h2>
          <p style={{lineHeight:1.6}}>{product.description}</p>
        </div>
      </div>
    </div>
  )
}
