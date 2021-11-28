import Type from "../Layer/Type"
import GeoJsonBuilder from "./GeoJsonBuilder"
import WMTSBuilder from "./WMTSBuilder"

/**
 * 
 * @param {Type} type one of Type
 */
const BuilderCreator = ( type ) => {
    switch ( type ) {
        case Type.GEOJSON:
            return new GeoJsonBuilder()
        case Type.WMTS:
            return new WMTSBuilder()
        default:
            throw new Error(`type ${type} found no builder`)
    }
}

export default BuilderCreator