import LayerControl from "./module/LayerControl";
import ViewerPromise from "./module/ViewerPromise";
import Leaflet from 'leaflet'
import { defaults } from "lodash";

/**
 *  @class
 *  @constructor
 *  @property {Leaflet.Map} viewer 
 */
class VPMC
{
    constructor(id, option = {})
    {
        this.id = id
        /**@type {Leaflet.Map} */
        this.viewer = undefined
        this.layerControl = undefined
        this.viewerPromise = new ViewerPromise()
    }
    createViewer( option = {})
    {
        let _option = defaults(option, {
            center: [24.86471, 121.29002],
            zoom: 13,
            maxZoom: 22
        })

        this.viewer = Leaflet.map( this.id, _option)
        this.layerControl = new LayerControl(this.viewer)
        this.viewerPromise.setViewer(this.viewer)
        return this.viewer
    }
}

export default VPMC