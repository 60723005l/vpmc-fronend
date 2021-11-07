import Type from "../Layer/Type";
import Builder from "./Builder";
import Leaflet from "leaflet"
import LayerInfo from "../Layer/LayerInfo";

class WMTSBuilder extends Builder {
    constructor(){
        super()
        this.type = Type.WMTS
    }
    /**
     * 
     * @param {LayerInfo} info 
     */
    processor( info ){
        return Leaflet.tileLayer(info.options.url, {maxZoom: 22, maxNativeZoom: 18})
    }
}
export default WMTSBuilder