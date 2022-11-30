import { updateStats } from "./stats.js"
import { initialisePokemon } from "./frontend.js"
import { populatePokemonModal } from "./frontend.js"


function loadAllPokemon()
{
  let promises = []
  for ( let i = 1; i <= MAX_NUMBER_OF_SPECIES; i++  )
    promises.push( fetch( POKEAPI_BASE + i ).then( res => res.json() ) )
  
  Promise.all( promises )
  .then( data => {
      data.forEach( ( pokemon, i ) => {
        populatePokemonModal( pokemon, i )
        ALL_POKEMON.push()
      } )
      
      initialisePokemon( data[ Math.floor( Math.random() * MAX_NUMBER_OF_SPECIES ) + 1 ] )
    } )

}

loadAllPokemon()