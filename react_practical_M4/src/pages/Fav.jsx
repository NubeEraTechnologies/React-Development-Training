import { useContext } from "react"
import { FavContext } from "../context/FavContext"

export default function Fav(){
  const { favs } = useContext(FavContext)

  return (
    <div>
      <h1>Favourites</h1>

      {favs.map(f=>(
        <div key={f.id}>{f.name}</div>
      ))}
    </div>
  )
}
