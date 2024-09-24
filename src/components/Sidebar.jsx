import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function Sidebar() {

  const [ allPokemon , setAllPokemon ] = useState(null)

  useEffect(() =>{
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
    .then((response) => response.json())
    .then((data) => setAllPokemon(data.results))
    .catch((error) => console.log(error,"error"))
  }, [])

  if (allPokemon === null) {
    return (<h3>Abriendo tu pokedex</h3>)
  }

  return (
    <nav className="sidebar">

    {allPokemon.map((pokemon) => {
      return (<Link to={`/pokemon/${pokemon.name}`} key={pokemon.name} >{pokemon.name}</Link> )
    })}

    </nav>
  )
}

export default Sidebar