import Type from "../Layer/Type";
import Builder from "./Builder";
import Leaflet from "leaflet"
import LayerInfo from "../Layer/LayerInfo";

class GeoJsonBuilder extends Builder {
    constructor(){
        super()
        this.type = Type.GEOJSON
    }
    /**
     * 
     * @param {LayerInfo} info 
     */
    processor( info ){
        return Leaflet.geoJSON(info.options.url)
    }
}
export default GeoJsonBuilder