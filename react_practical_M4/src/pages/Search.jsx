import { useState, useContext } from "react"
import { FavContext } from "../context/FavContext"
import "../components/Card.css"


export default function Search(){
  const [input, setInput] = useState("")
  const [movies, setMovies] = useState([])
  const { addFav } = useContext(FavContext)

  async function searchMovie(){
    //alert("clicked search") // temporary debug
    const res = await fetch(`https://api.tvmaze.com/search/shows?q=${input}`)
    const data = await res.json()
    setMovies(data)
  }

  return (
    <div>
      <h1>TV Show Search</h1>

      <input 
        value={input}
        onChange={(e)=>setInput(e.target.value)}
        placeholder="Type movie name"
      />

      <button onClick={searchMovie}>Search</button>


      <div style={{marginTop: "20px", display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"20px"}}>
  {movies.map((m)=>(
    <div className="card" key={m.show.id}>
      {m.show.image && <img src={m.show.image.medium} />}
      <div className="card-title">{m.show.name}</div>
      <button onClick={()=>addFav(m.show)}>Add to Favourites</button>
    </div>
  ))}
</div>

    </div>
  )
}
