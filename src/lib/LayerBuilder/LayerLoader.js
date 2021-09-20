import LayerFactory from "./LayerFactory"
import InstanceProcessor from "../InstanceProcessor/InstanceProcessor"

class LayerLoader
{
    constructor( viewer, option = {} )
    {
        this.viewer = viewer
        this.materials = option.materials || []
    }
    loadLayers()
    {
        var products = []

        this.materials.forEach( material =>
            {
                
                material.source.viewer = this.viewer
                let shouldShow = material.source.show === undefined ? true : material.source.show
                let layerFactory = new LayerFactory({
                    material: material,
                    processor: this.choseProcessor(material)
                })
                let product = layerFactory.work()
                products.push(product)
                this.viewer.addLayer(product.content)
                material.postProcess.raise( this.viewer, product.content)
                product.content.show = shouldShow
                product.info.show  = shouldShow
            })
        return products
    }
    choseProcessor(material)
    {
        switch(material.type)
        {
            case Global.LayerType.POINT:
                return InstanceProcessor.GeoJson
            case Global.LayerType.LINE:
                return InstanceProcessor.GeoJson
            case Global.LayerType.POLYGON:
                return InstanceProcessor.GeoJson
            case Global.LayerType.BASEMAP:
                return InstanceProcessor.WMTS
        }
    }

}

export default LayerLoader