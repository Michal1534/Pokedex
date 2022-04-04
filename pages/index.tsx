import axios from 'axios'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { Pokemon } from '../types/Pokemon'
import { PokemonCard } from '../components/PokemonCard'
import { PokemonModal } from '../components/PokemonModal'
import { Switch } from '@mantine/core'



const Home: NextPage = () => {
  const [textButton,settextButton]=useState("Load More")
  const [offset, setOffset] = useState(0)
  const [pokemonsList, setPokemonsList] = useState<Pokemon[]>([])
  const [pokemons, setPokemons] = useState<{
    [key: string]: Pokemon
  }>({})
  const [filteredPokemon, setFilteredPokemon] = useState("")

  const getPokemons = async () => {
    try {
      const response = (await axios.get('https://pokeapi.co/api/v2/pokemon', { params: { limit: 20, offset: offset } })).data.results
      setPokemonsList(response)
    } catch (error) {
      console.log(error)
    }
  }
  const getMoreInfo = async (pokemon: Pokemon) => {
    if (pokemons[pokemon.name]) {
      return
    }
    const details = (await axios.get('https://pokeapi.co/api/v2/pokemon/' + pokemon.name)).data
    setPokemons(currentList => ({ ...currentList, [details.name]: details }))
  }


  useEffect(() => {
    getPokemons()
  }, [offset])

  useEffect(() => {
    pokemonsList.forEach((pokemon) => {
      getMoreInfo(pokemon)
    })
  }, [pokemonsList])

  const addOffset = ()=>{
    if(offset < 1120){
      setOffset(offset => offset + 20)
    }
    else if(offset >1120 && offset < 1126){
      setOffset(offset => offset + 6)
    }
    else{
      settextButton("That's all we got")
      return
    }
  }

  const filteredPokemons = Object.values(pokemons).sort((old, current) => old.id - current.id).filter((pokemon) => {
    const nameCondition = pokemon.name.includes(filteredPokemon.toLowerCase())
    const typesArray = pokemon.types.map((type) => type.type.name).join(' ')
    const typeCondition = typesArray.includes(filteredPokemon.toLowerCase())
    return nameCondition || typeCondition
  })

  const [modalPokemon, setModalPokemon] = useState<Pokemon | null>(null)

  const [isDarkMode, setDarkMode] = useState(false)
  const darkMode = () => {
    setDarkMode(!isDarkMode)
  }
  return (
    <div className={`wrapper ${isDarkMode ? 'dark' : 'light'}`}>
      <Switch className='switch'
        onClick={darkMode}
        label="Dark Mode"
        size="md"
        color="indigo"
      />
      <div className='header'>
        <h1>Pokedex</h1>
      </div>
      <div>
        <div className='search'>
          <span>Find your Pokemon:</span>
          <input value={filteredPokemon} onChange={(event) => { setFilteredPokemon(event.target.value) }} placeholder='Enter name or type of the pokemon' />
        </div>
      </div>
      <main>
        <div className='list'>
          {filteredPokemons.map((pokemon) => <PokemonCard key={pokemon.id} pokemon={pokemon} onClick={() => {
            setModalPokemon(pokemon)
          }} />)}
        </div>
        <button onClick={addOffset}>{textButton}</button>
      </main>
      <PokemonModal pokemon={modalPokemon} onClose={() => {
        setModalPokemon(null)
      }} />
      <footer >
        <span>Michał Szczerek Zadanie rekrutacyjne Virstulab</span>
      </footer>
    </div>
  )
}

export default Home
