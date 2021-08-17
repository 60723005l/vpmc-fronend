import Processor from "../LayerBuilder/Processor"
import Leaflet from 'leaflet'
import LayerStrategy from "./LayerStrategy"
import { defined_showProperty } from "./utilities"

const proc = ( material ) =>
{
    const viewer = material.source.viewer
    let geojson_feature = Leaflet.geoJSON( material.source.data )
    // let labelEventParent = new Leaflet.Evented()
    let markers = Leaflet.markerClusterGroup()
    let name = material.info.name
    // console.log(name)
    switch(name)
    {
        case "景點":
            LayerStrategy.scenePOI(geojson_feature, material, markers)
            break;
        // case "民雄村里":
        //     LayerStrategy.minsyongVillage(geojson_feature, material, markers)
        //     break;
        // case "民雄鄉":
        //     LayerStrategy.minsyongTown(geojson_feature, material, markers)
        //     break;
        // case "東南亞美食":
        //     LayerStrategy.southeastFood(geojson_feature, material, markers)
        //     break;
    }
    defined_showProperty( geojson_feature, viewer, material ) 
    return geojson_feature
}

export default new Processor( proc )