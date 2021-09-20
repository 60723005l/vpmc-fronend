import Processor from "../LayerBuilder/Processor"
import Leaflet from 'leaflet'

const proc = ( material ) =>
{
    var viewer = material.source.viewer
    // console.log(viewer)
    var layer = Leaflet.tileLayer.wms(material.source.url, 
    {
        layers: material.source.layer,
        format: 'image/png',
        transparent: true,
        attribution: "Weather data © 2012 IEM Nexrad"
    });
    Object.defineProperty( layer, '_show', {
        value: false,
        writable:true,
    })
    Object.defineProperty( layer, 'show', {
        get: function ()
        {
            return this._show
        },
        set: function( bool )
        {
            //false
            if( !bool && viewer.hasLayer( this ) ) 
            {
                this.remove()
                this._show = false
                material.info.show = false
            }
            //true
            else if( bool && !viewer.hasLayer( this ) ) 
            {
                viewer.addLayer(this)
                this._show = true
                material.info.show = true
            }

        }
    })
    return layer
}


export default new Processor( proc )