import { createContext, useState, useEffect } from "react"

export const FavContext = createContext()

export default function FavProvider({children}){
  const [favs, setFavs] = useState([])

  useEffect(()=>{
    const saved = JSON.parse(localStorage.getItem("favs") || "[]")
    setFavs(saved)
  },[])

  function addFav(show){
    const newFavs = [...favs, show]
    setFavs(newFavs)
    localStorage.setItem("favs", JSON.stringify(newFavs))
  }

  return (
    <FavContext.Provider value={{favs, addFav}}>
      {children}
    </FavContext.Provider>
  )
}
