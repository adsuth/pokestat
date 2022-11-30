
export class SearchBar
{
  constructor( options = {} )
  {
    this.root = options.root
    
    this.input = null
    this.button = null
    this.suggestions = null

    this.inputPlaceholder = options.inputPlaceholder ?? ""
    this.buttonContent = options.buttonContent ?? "Click Me"
    this.giveSuggestions = options.giveSuggestions ?? false

    this.cb_onInput     = options.cb_onInput ?? function() {}
    this.cb_buttonClick = options.cb_buttonClick ?? function() {}
    this.cb_onEnterKey = options.cb_onEnterKey ?? options.cb_buttonClick ?? function() {}

    this.classLists = {
      input:       options.classLists.input ?? [],
      button:      options.classLists.button ?? [],
      suggestions: options.classLists.suggestions ?? [],
    }

    this._refreshRate = options.refreshRate ?? 500
    this._throttling = false
    
  }
  
  init()
  {
    this._initHTML()
    this._initEvents()
    return this
  }

  _createInput()
  {
    let tag = document.createElement( "input" )
    tag.type = "text"
    tag.placeholder = this.inputPlaceholder
    tag.classList.add( ...this.classLists.input )
    this.input = tag
    return tag
  }
  _createButton()
  {
    let tag = document.createElement( "button" )
    tag.type = "button"
    tag.innerText = this.buttonContent
    tag.classList.add( ...this.classLists.button )
    this.button = tag
    return tag
  }
  _createSuggestions()
  {
    let tag = document.createElement( "ul" )
    tag.classList.add( ...this.classLists.suggestions )
    this.suggestions = tag
    return tag
  }

  _initHTML()
  {
    this.root.append( this._createInput() )
    this.root.append( this._createButton() )
    this.root.append( this._createSuggestions() )
  }

  _initEvents()
  {
    this.input.addEventListener( "input", ev => {
      if ( !this._throttling )
      {
        setTimeout( () => {
          this._throttling = false
          this.onInput( ev )
        }, this._refreshRate ) 
      }
      this._throttling = true
    } )

    this.input.addEventListener( "keydown", ev => {
      if ( ev.key === "Enter" )
      {
        ev.preventDefault()
        this.onEnterKey( ev )
      }

    } )

    this.button.addEventListener( "click", ev => { this.onButtonClick( ev ) } )
  }

  onInput( ev )
  {
    let text = ev.target.value.trim().toLowerCase()
    this.cb_onInput( text )
  }

  onButtonClick( ev )
  {
    this.cb_buttonClick( this.input.value )
  }

  onEnterKey( ev )
  {
    this.cb_onEnterKey( ev )
  }

  empty()
  {
    this.input.value = ""
    this.cb_onInput( "" )
  }

}

export function createSearchBar( options = {} )
{
  return new SearchBar( options ).init()
}