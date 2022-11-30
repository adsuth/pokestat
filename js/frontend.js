import { updateNatures, updateStats } from "./stats.js"
import { SearchBar } from "./adsu_searchbar.js"

btn_showEVs.addEventListener( "click", toggleEVs )
btn_toggleNatures.addEventListener( "click", toggleNatures )

btn_minAll.addEventListener( "click", minAll )
btn_maxAll.addEventListener( "click", maxAll )
btn_resetAll.addEventListener( "click", resetAll )

sprite.addEventListener( "click", () => { showModal( pokemonModalRoot ) } )

const OPTIONS = {
  root: document.getElementById( "pokemon_modal_search" ),
  classLists: {
    input: ["pokemon_modal_search"],
    button: ["pokemon_modal_search_button"],
    suggestions: ["unset"]
  },
  buttonContent: "Search",
  inputPlaceholder: "Type here to search...",

  cb_onInput: filterPokemon,
  cb_onEnterKey: ev => {
    if ( POKEMON_MODAL_NUMBER_ACTIVE === 1 )
      selectPokemon( POKEMON_MODAL_LAST_POKEMON_CHIP.getAttribute( "data-index" ) ) 
  }
}

const POKEMON_SEARCH_BAR = new SearchBar( OPTIONS ).init()

function filterPokemon( searchTerm )
{
  POKEMON_MODAL_NUMBER_ACTIVE = MAX_NUMBER_OF_SPECIES

  getPokemonModalChildren().forEach( chip => {
    let name = chip.querySelector( ".pokemonName" ).innerText.toLowerCase().trim()
    
    if ( searchTerm.length === 0 || name.includes( searchTerm ) )
    {
      POKEMON_MODAL_LAST_POKEMON_CHIP = chip
      chip.style.display = "block"
    }
    else
    {
      POKEMON_MODAL_NUMBER_ACTIVE--
      chip.style.display = "none"
    }
  } )
}

function selectPokemon( index )
{
  fetchAndInitialisePokemonWithIndex( index )
  closePokemonModal()
}

function toggleEVs( e )
{
  if ( evsShown ) hideEVs(e)
  else showEVs(e)
}

function showEVs( e )
{
  evContainer.style.display = "flex"
  e.target.classList.toggle( "off_button" )
  window.evsShown = true
  
}

function hideEVs( e )
{
  evs.forEach( stat => {
    stat.value = "0"
  } )

  evContainer.style.display = "none"
  e.target.classList.toggle( "off_button" )
  window.evsShown = false
  updateStats()
  
}

export function populatePokemonModal( pokemon, index )
{
  pokemonModal.appendChild( createPokemonModalChip( pokemon, index ) )
}

function createPokemonModalChip( pokemon, index )
{

  let chip = document.createElement( "button" )
  chip.classList.add( "pokemon_chip" )

  let img = document.createElement( "img" )
  img.src = pokemon.sprites.front_default
  img.alt = `${pokemon.name}'s sprite. `
  
  let pokemonName = document.createElement( "p" )
  pokemonName.classList.add( "pokemonName" )
  pokemonName.innerText = pokemon.name
  
  chip.setAttribute( "data-index", index + 1 )

  let pokemonType = document.createElement( "p" )
  let types = pokemon.types.map( data => `<span class="pokemonType" data-type="${data.type.name}">${data.type.name}</span>` ).join( " " )
  pokemonType.innerHTML = types

  chip.appendChild( img )
  chip.appendChild( pokemonName ) 
  chip.appendChild( pokemonType ) 

  chip.addEventListener( "click", e => {
    selectPokemon( chip.getAttribute( "data-index" ) )
  } )
  
  return chip
}

export function initialisePokemon( pokemon )
{
  species.innerText = pokemon.name
  sprite.src = pokemon.sprites.front_default
  
  window.CURRENT_POKEMON = pokemon
  updateStats( CURRENT_POKEMON )
}

function fetchAndInitialisePokemonWithIndex( index )
{
  let promise = fetch( POKEAPI_BASE + index ).then( res => res.json() )
  promise.then( data => initialisePokemon( data ) )
}

function closePokemonModal()
{
  POKEMON_SEARCH_BAR.empty()
  closeModal( pokemonModalRoot )
}

function closeModal( modal )
{
  modal.style.display = "none"
}

function showModal( modal )
{
  modal.style.display = "flex"
}

function minAll()
{
  for ( let i = 0; i < ivs.length; i++ )
  {
    ivs[ i ].value = 0
    evs[ i ].value = 0

    if ( !IGNORING_NATURES ) 
      CURRENT_NATURES[ Object.keys( CURRENT_NATURES )[ i ] ] = 2
  }  
  
  updateStats()

  if ( !IGNORING_NATURES )
    updateNatures()
}

function maxAll()
{
  for ( let i = 0; i < ivs.length; i++ )
  {
    ivs[ i ].value = 31

    if ( !IGNORING_NATURES ) 
      CURRENT_NATURES[ Object.keys( CURRENT_NATURES )[ i ] ] = 1
  }  

  updateStats()

  if ( !IGNORING_NATURES )
    updateNatures()
}

function resetAll()
{
  for ( let i = 0; i < ivs.length; i++ )
  {
    ivs[ i ].value = 15
    CURRENT_NATURES[ Object.keys( CURRENT_NATURES )[ i ] ] = 0
  }  

  updateStats()
  updateNatures()
}

function toggleNatures()
{
  IGNORING_NATURES = !IGNORING_NATURES
  btn_toggleNatures.classList.toggle( "off_button" )
}