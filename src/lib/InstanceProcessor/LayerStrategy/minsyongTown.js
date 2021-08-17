import { 
    defined_showProperty,
    isPropertyNormal,
    getKeyType,
    fixValue,
    bindTablePopup
 } from "../utilities"

const minsyongTown= (geojson_feature, material, markers) =>
{
    const viewer = material.source.viewer
    let name = material.info.name
    geojson_feature.eachLayer( layer =>
        {
            let props = layer.feature.properties
            bindTablePopup(material, props, layer)
        })
    geojson_feature.setStyle({
        fill:true,
        color: "#098626",
        fillColor: "#c0ff4a",
        fillOpacity: 0.15,
    })


    defined_showProperty( geojson_feature, viewer, material )  
}

export default minsyongTown

