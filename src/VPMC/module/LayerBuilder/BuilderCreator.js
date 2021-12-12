import Type from "../Layer/Type"
import BuildingBuilder from "./BuildingBuilder"
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
        case Type.GEOJSON_BUILDING:
            return new BuildingBuilder()
        default:
            throw new Error(`type ${type} found no builder`)
    }
}

export default BuilderCreator