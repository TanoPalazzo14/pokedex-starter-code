import { useEffect, useState } from 'react'
import { useParams , useNavigate } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'

function PokemonPage() {

  const params = useParams()
  const navegate = useNavigate()

  const [ pokemonDetails , setPokemonDetails ] = useState(null)

  useEffect(() => {
    getData()
  }, [params.pokeName])
  
  const getData = async () => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.pokeName}`)
      const data = await response.json()
      setPokemonDetails(data)
    } catch (error) {
      navegate("/error")
      console.log(error)
    }
  }

  if(pokemonDetails === null) {
    return (
      <div><ClipLoader /></div>
    )
  }

  return (
    <div>
      <h1>{pokemonDetails.name}</h1>
      <img style={{height:"150px"}} src={pokemonDetails.sprites.front_default} alt="" />
      <img style={{height:"150px"}} src={pokemonDetails.sprites.front_shiny} alt="" />
      <h2>Type{pokemonDetails.types.length > 1 && ("s")}:</h2>
      <ul>
        {pokemonDetails.types.map((types) => <li>{types.type.name}</li>)}
      </ul>
    </div>
  )
}

export default PokemonPage