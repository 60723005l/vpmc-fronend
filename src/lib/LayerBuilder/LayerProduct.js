import UUID from "../utilities/UUID"

class LayerProduct
{
    constructor( option )
    {
        this.material = option.material
        this.content = option.content
        this.info = this.material.info
        this.id = this.info.id || UUID()
        this.name = this.material.info.name

        // this.info.id = this.id
    }
}

export default LayerProduct