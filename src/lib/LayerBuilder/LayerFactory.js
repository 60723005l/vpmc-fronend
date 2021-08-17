import UUID from "../utilities/UUID"
import { LayerProduct } from "."

class LayerFactory
{
    /**
     * 
     * @param {*} option.id
     * @param {*} option.material
     * @param {*} option.processor
     */
    constructor( option )
    {
        this._id = option.id || UUID()
        this._material = option.material
        this._processor = option.processor
        this.finish = false
    }
    work()
    {
        let layer = this._processor.exe_function( this._material )
        return new LayerProduct( { material: this._material, content: layer} )
    }
}

export default LayerFactory