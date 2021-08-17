import Leaflet from 'leaflet'
import { 
    bindTablePopup
 } from "../utilities"

const scenePOI= (geojson_feature, material, markers) =>
{
    const viewer = material.source.viewer
    let name = material.info.name
    geojson_feature.eachLayer( layer =>
        {
            let props = layer.feature.properties,
                {type} = props,
                icon
            switch(type)
            {
                case "1":
                    icon = Leaflet.icon({ iconUrl: require('@/assets/icon/northern_n0001_01.png'), iconSize: [30,40] })
                    break;
                case "2":
                    icon = Leaflet.icon({ iconUrl: require('@/assets/icon/northern_n0001_02.png'), iconSize: [30,40] })
                    break;
                case "3":
                    icon = Leaflet.icon({ iconUrl: require('@/assets/icon/northern_n0001_03.png'), iconSize: [30,40] })
                    break;
                case "4":
                    icon = Leaflet.icon({ iconUrl: require('@/assets/icon/northern_n0001_04.png'), iconSize: [30,40] })
                    break;
                case "5":
                    icon = Leaflet.icon({ iconUrl: require('@/assets/icon/northern_n0001_05.png'), iconSize: [30,40] })
                    break;
                case "6":
                    icon = Leaflet.icon({ iconUrl: require('@/assets/icon/northern_n0001_06.png'), iconSize: [30,40] })
                    break;
            }
            layer.setIcon( icon )
            markers.addLayer(layer)

            bindTablePopup(material, props, layer)

            
        })
    // geojson_feature.setStyle( material.source.style() )
    // defined_showProperty( geojson_feature, viewer, material )  

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

export default scenePOI