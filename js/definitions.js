window.evs                = Array.from( document.getElementById( "stats_evs" ).children )
window.ivs                = Array.from( document.getElementById( "stats_ivs" ).children )
window.natures            = Array.from( document.getElementById( "stats_natures" ).children )
window.calc               = Array.from( document.getElementById( "stats_calc" ).children )
window.CURRENT_POKEMON    = null

window.sprite     = document.querySelector( "#sprite_image>img" )
window.level      = document.getElementById( "pokemon_level" )
window.species    = document.getElementById( "pokemon_species" )

window.evContainer = document.getElementById( "stats_evs" )

window.btn_about      = document.getElementById( "btn_about" )
window.btn_showHints  = document.getElementById( "btn_showHints" )
window.btn_showEVs    = document.getElementById( "btn_showEVs" )

window.btn_maxAll       = document.getElementById( "btn_maxAll" )
window.btn_minAll       = document.getElementById( "btn_minAll" )

window.btn_resetAll          = document.getElementById( "btn_reset" )
window.btn_toggleNatures     = document.getElementById( "btn_toggleNatures" )

window.pokemonModalRoot       = document.querySelector( "#pokemon_modal" )
window.pokemonModal           = document.querySelector( "#pokemon_modal>.modal_content>.pokemon_modal_items" )
window.getPokemonModalChildren   = () => Array.from( window.pokemonModal.children ) 

window.CURRENT_NATURES = {
  hp:  0,
  atk: 0,
  def: 0,
  spa: 0,
  spd: 0,
  spe: 0,
}

window.IGNORING_NATURES = false
window.MAX_NUMBER_OF_SPECIES = 898 // this doesnt include S/V
window.POKEMON_MODAL_NUMBER_ACTIVE = MAX_NUMBER_OF_SPECIES
window.POKEMON_MODAL_LAST_POKEMON_CHIP = null


window.ALL_POKEMON = []
window.getAllPokemon = () => ALL_POKEMON

window.POKEAPI_BASE = "https://pokeapi.co/api/v2/pokemon/"

window.evsShown = false