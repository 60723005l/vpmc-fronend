import UUID from "../utilities/UUID"
import Collection from '../Collection'
import Global from "../../global"

class Info
{
    constructor( option = {} )
    {
        this.id = option.id
        this.layerType = option.layerType
        // this.group = option.group
        this.name = option.name || ''
        this.tags = option.tags = []
        this.description = option.description || ''
        this.owner = option.owner || ''
        this.show = option.show === undefined ? true : option.show
        this.popup = option.popup === undefined ? true : option.popup
        this.opacity = 0
    }
    get group()
    {
        switch( this.layerType)
        {
            case Global.LayerType.BASEMAP:
                return '影像資料'
            case Global.LayerType.POINT:
                return '向量資料'
            case Global.LayerType.LINE:
                return '向量資料'
            case Global.LayerType.POLYGON:
                return '向量資料'
        }
    }
}

class Processes extends Collection
{
    constructor()
    {
        super()
    }
    add( callback )
    {
        const task = { 
            id: UUID(),
            callback,
        }
        super.add(task)
        return task
    }
    raise( viewer, productContent )
    {
        this._values.forEach( task =>
            {
                task.callback( viewer, productContent )
            })
    }
}


class Material
{
    constructor( id, option = {} )
    {
        this.id = id || UUID()
        this.name = option.name
        this.info = new Info({
                        id: id,
                        layerType: option.layerType,
                        group: option.group,
                        name: option.name,
                        tags: option.tags,
                        description: option.description,
                        owner: option.owner,
                        show: option.show
                    })
        this.type = option.type
        this.source = option.source
        this.postProcess = new Processes()
        //...
    }
    static Info(option)
    {
        return new Info(option)
    }
    static Process()
    {
        return new Processes()
    }
}

export default Material