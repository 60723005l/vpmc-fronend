import { values } from "lodash"

export default {
    GEOJSON: 'GEOJSON',
    GEOJSON_BUILDING: 'GEOJSON_BUILDING',
    WMTS: 'WMTS',
    hasType( type ) {
        let result = values(this).find( e => e === type )
        return result !== undefined
    }
}