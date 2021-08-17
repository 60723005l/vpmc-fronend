import uuid from "../utilities/UUID"

class Collection 
{
    constructor(option = {})
    {
        this.name = option.name
        this.id = option.id || uuid()
        this._values = []
    }
    add( value )
    {
        if( value.id ) this._values.push(value)
        else throw new Error('value object needs an id key')
    }
    getById( id )
    {
        let index = this._values.findIndex( value => value.id === id )
        return this._values[index]//this._values.find( value => value.id === id )
    }
    remove( value )
    {
        this.removeById( value.id )
    }
    removeById( id )
    {
        let index = this._values.findIndex( value => value.id === id )
        if( index === -1 ) return false
        this._values.splice( index, 1 )
        return true
    }
}

export default Collection