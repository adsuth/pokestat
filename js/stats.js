const NATURE_STATES = [ "~", "+", "-" ]
const MAX_EVS = 512

function addEvents()
{
  natures.forEach( stat => {
    stat.addEventListener( "click", cycleNature )
    stat.addEventListener( "contextmenu", cycleNature )
  } )
  
  ivs.forEach( stat => {
    stat.addEventListener( "mousewheel", e => updateValueByScrolling( e ) )
    stat.addEventListener( "change", () => updateStats() )
  } )
  
  evs.forEach( stat => {
    stat.addEventListener( "mousewheel", e => updateValueByScrolling( e, "ev" ) )
    stat.addEventListener( "change", () => updateStats() )
  } )
  
  level.addEventListener( "change", () => updateStats() )
  level.addEventListener( "mousewheel", e => updateValueByScrolling( e ) )

}

function cycleNature( e )
{
  e.preventDefault()
  
  let stat = e.target.getAttribute( "data-name" ) 
  let nature = CURRENT_NATURES[ stat ]

  if ( e.type === "contextmenu" || e.ctrlKey )
    nature--
  else
    nature++

  nature = nature % 3
  if ( nature === -1 )
    nature = 2

  CURRENT_NATURES[ stat ] = nature
  
  updateStats()
  updateNature( stat )
  
}

function getStatDataValue( index )
{
  return NATURE_STATES[ index ]
}

export function updateStats( pokemon=CURRENT_POKEMON )
{
  calc.forEach( (stat, i) => {
    setStat(
      stat,
      calcNewStatValue(
        stat.getAttribute( "data-name" ),
        pokemon,
        pokemon.stats[i].base_stat,
        ivs[ i ].valueAsNumber,
        evs[ i ].valueAsNumber,
        level.valueAsNumber,
        convertNatureToFormulaValue( CURRENT_NATURES[ stat.getAttribute( "data-name" ) ] )
      ) 
    )
  } )
}

export function updateNatures()
{
  for ( let stat of Object.keys( CURRENT_NATURES ) )
  {
    updateNature( stat )
  }
}

function updateNature( stat )
{
  document.querySelector( `#stats_natures>[data-name="${stat}"]` ).setAttribute( "data-nature",getStatDataValue( CURRENT_NATURES[ stat ] ) )
  document.querySelector( `#stats_names>[data-name="${stat}"]` ).setAttribute( "data-nature", getStatDataValue( CURRENT_NATURES[ stat ] ) )
  document.querySelector( `#stats_calc>[data-name="${stat}"]` ).setAttribute( "data-nature", getStatDataValue( CURRENT_NATURES[ stat ] ) )
}

function convertNatureToFormulaValue( value )
{
  switch( value )
  {
    case 1:
      return 1.1
    case 2:
      return 0.9
    default:
      return 1
  }
}

function calcNewStatValue( stat, pokemon, baseStat, iv, ev, level, nature )
{
  if ( stat === "hp" )
  {
    if ( pokemon.name === "shedinja" ) return 1

    return Math.floor( ( ( ( 2 * baseStat + iv + Math.floor( ev / 4 ) ) * level ) / 100 ) + level + 10 )
  }
  
  return Math.floor( ( ( ( ( 2 * baseStat + iv + Math.floor( ev / 4 ) ) * level ) / 100 ) + 5 ) * nature )
}

function updateValueByScrolling( e, type = null)
{
  switch( type )
  {
    case "ev":
      updateEV( e )
      break
    default:
      updateNumberInput( e )
      break
  }
}

function updateEV( e )
{
  if ( e.deltaY > 0 )
  {
    if ( e.target.value > e.target.min )
    {
      e.target.value--;
      e.target.dispatchEvent( new Event( "change" ) )
    }
    return
  }

  let remainingEVs = MAX_EVS
  
  evs.forEach( ev => {
    remainingEVs -= ev.valueAsNumber
  } )

  if ( remainingEVs > 0 && e.target.valueAsNumber + 1 <= e.target.max )
  {
    e.target.value++;
    e.target.dispatchEvent( new Event( "change" ) )
  }
    
}


function updateNumberInput( e )
{
  if ( e.deltaY > 0 )
  {
    if ( e.target.value > e.target.min )
    {
      e.target.value--;
      e.target.dispatchEvent( new Event( "change" ) )
    }
    return
  }
  
  if ( e.target.valueAsNumber + 1 <= e.target.max )
  {
    e.target.value++;
    e.target.dispatchEvent( new Event( "change" ) )
  }
}

function setStat( stat, newValue )
{
  stat.innerText = newValue
}

addEvents()