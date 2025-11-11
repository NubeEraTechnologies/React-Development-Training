# React Mini Project — Routing + API Fetch  
## FULL STEP GUIDE (Beginner Friendly)

---

## What we are building
A small React app where the user can:
- search products (live API call)
- see results list
- click a product → see Details page

This mini project teaches:
- Routing in React (multi pages)
- API fetch using Axios
- Passing data via URL (route params)
- Page structure

---

## Step 0 — Check Node
Open terminal:

```

node -v

```

Node version must be 16+  
(our version 22 is perfect)

---

## STEP 1 — Create React App
Use **Vite** (faster than CRA)

```

npm create vite@latest react-mini -- --template react
cd react-mini
npm install
npm install react-router-dom axios
npm run dev

````

Open shown URL in browser  
→ React welcome screen should appear.

---

## STEP 2 — Clean App

Open `src/App.jsx`  
replace everything:

```jsx
export default function App() {
  return <div>Hello React Mini Project</div>
}
````

This confirms our code is active.

---

## STEP 3 — Setup Router

Open `src/main.jsx`

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
```

---

## STEP 4 — Create Pages Folder

Create:

`src/pages/Home.jsx`

```jsx
import './pages.css'

export default function Home() {
  return <div className="page"><h1>Home Page</h1></div>
}
```



`src/pages/Search.jsx`

```jsx
import './pages.css'

export default function Search() {
  return <div className="page"><h1>Search Page</h1></div>
}
```

---

## STEP 5 — Add Routes

Open `src/App.jsx`

```jsx
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Search from './pages/Search'

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
      </Routes>
    </div>
  )
}
```

Home → Search working.

---

## STEP 6 — Create API file

Create folder `src/services`

create file `api.js`

```jsx
import axios from "axios"

export async function searchProducts(q) {
  const res = await axios.get("https://dummyjson.com/products/search", {
    params: { q }
  })
  return res.data.products
}
```

API is now ready to use.

---

## STEP 7 — Build Search Page Logic

Open `src/pages/Search.jsx`

```jsx
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
```

Search works → shows clickable cards.

---

## STEP 8 — Create Details Page

create file
`src/pages/ProductDetails.jsx`

```jsx
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
```

---

## STEP 9 — Add Route for Details

`src/App.jsx`

```jsx
import ProductDetails from './pages/ProductDetails'
```

inside `<Routes>` add:

```jsx
<Route path="/product/:id" element={<ProductDetails />} />
```

---

## STEP 10 — Style Pages

create file `src/pages/pages.css`

```css
.page {
  max-width: 900px;
  margin: 0 auto;
  padding: 32px 24px;
  font-family: system-ui, Arial, sans-serif;
}

.page h1 {
  margin-bottom: 20px;
  font-size: 36px;
  font-weight: 700;
}

.page input {
  width: 300px;
  padding: 10px 14px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.page button {
  padding: 10px 18px;
  margin-left: 10px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  background: #0078ff;
  color: #fff;
  cursor: pointer;
}

.results {
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
}

.card {
  border: 1px solid #ececec;
  padding: 16px;
  border-radius: 12px;
  background: #fff;
  transition: all .2s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.07);
}

.btn-back {
  display:inline-block;
  margin-bottom:20px;
  text-decoration:none;
  color:#0078ff;
  font-size:18px;
}

.detail-layout {
  display:grid;
  grid-template-columns: 1.1fr 1.3fr;
  gap: 30px;
}

.detail-image img {
  width: 100%;
  border-radius:12px;
}
```

---

# FINISHED ✅

You now built a FULL working React mini project:

* routing
* search API call
* list view
* detail view
* styled pages


...