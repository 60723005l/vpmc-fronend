import { values, isEmpty, pick, omit } from "lodash"

export default class AssociativeArray
{
    constructor()
    {
        this.values = []
        this._hash = {}
    }
    gets(keys = [])
    {
        let target = pick(this._hash, keys)
        return values(target)
    }
    omit(keys = [])
    {
        let target = omit(this._hash, keys)
        return values(target)
    }
    get( key )
    {
        return this._hash[key]
    }
    set( key, value )
    {
        this._hash[key] = value
        this.values = values(this._hash)
    }
    remove(key)
    {
        if( this.contain(key) ) 
        {
            delete this._hash[key]
            this.values = values(this._hash)
        }
    }
    removeAll()
    {
        this._hash = {}
        this.values = []
    }
    contain(key)
    {
        return isEmpty(this.get(key))
    }
}