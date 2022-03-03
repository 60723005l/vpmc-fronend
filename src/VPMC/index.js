import LayerControl from "./module/LayerControl";
import ViewerPromise from "./module/ViewerPromise";
import Leaflet, { Map } from 'leaflet'
import TransactionDataStreaming from "./module/TransactionDataStreaming";
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
        this.transactionDataStreaming = undefined
    }
    /**
     * @returns {Map}
     */
    get asyncViewer () {
        return this.viewerPromise.await
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
        this.transactionDataStreaming = new TransactionDataStreaming(this.viewer)
        this.viewerPromise.setViewer(this.viewer)
        return this.viewer
    }
    addCountdownTask(callback, second)
    {
        return window.setTimeout(() => {
            callback()
        }, second * 1000)
    }
    removeCountdownTask(id)
    {
        clearTimeout(id)
    }
}

export default VPMC