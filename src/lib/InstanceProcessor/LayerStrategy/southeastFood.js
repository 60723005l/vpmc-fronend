import Leaflet from 'leaflet'
import { 
    defined_showProperty,
    bindTablePopup
 } from "../utilities"

const southeastFood= (geojson_feature, material, markers) =>
{
    const viewer = material.source.viewer
    let name = material.info.name
    geojson_feature.eachLayer( layer =>
        {
            let props = layer.feature.properties
            bindTablePopup(material, props, layer)
            
            let icon = Leaflet.icon({ iconUrl: require(`@/assets/icon/${props.country}.png`), iconSize: [30,40] })
            layer.setIcon( icon )
            markers.addLayer(layer)
            

            

            
        })
    // geojson_feature.setStyle( material.source.style() )
    defined_showProperty( geojson_feature, viewer, material )  

    material.postProcess.add((viewer, productContent)=>
    {
        // console.log(productContent, "\n----------------------")
        if( markers.getLayers().length > 0 )
        {
            markers.eachLayer( layer => productContent.removeLayer(layer) )
            productContent.addLayer(markers)
        }
        
    })
}

export default southeastFood

