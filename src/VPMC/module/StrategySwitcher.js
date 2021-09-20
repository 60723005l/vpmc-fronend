import AssociativeArray from "./AssociativeArray"

export default class StrategySwitcher
{
    constructor()
    {
        this.current = undefined
        this.currentName = ''
        this.names = []
        this.strategies = new AssociativeArray()
    }
    add( name, strategy )
    {
        if( this.strategies.contain( name ) ) throw new Error(`strategy ${name} already exist`)
        this.strategies.set(name, strategy)
        this.names = Object.keys(this.strategies._hash)
    }
    remove( name )
    {
        this.strategies.remove( name )
        this.names = Object.keys(this.strategies._hash)
        if( name === this.currentName)
        {
            this.currentName = ''
            this.current = undefined
        }
    }
    use( name )
    {
        if( this.strategies.contain( name ) )
        {
            return this.current = this.strategies.get(name)
        }
        else
        {
            throw new Error(`strategy ${name} was not exist`)
        }
    }
}
