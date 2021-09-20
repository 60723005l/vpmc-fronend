import Collection from "../Collection"
import uuid from "../utilities/UUID"
class Event extends Collection
{
    constructor()
    {
        super()
    }
    addEventListener( callback )
    {
        let listener = 
        {
            id: uuid(),
            callback
        }
        super.add(listener)
        return listener.id
    }
    removeEventListener( id )
    {
        super.removeById(id)
    }
    raise(...arg)
    {
        this._values.forEach( listener =>
            {
                listener.callback(...arg)
            })
    }
}

export default Event