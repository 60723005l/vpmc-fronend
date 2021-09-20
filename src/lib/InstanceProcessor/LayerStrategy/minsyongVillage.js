import Leaflet from 'leaflet'
import { 
    defined_showProperty,
    getCentroid2,
    bindTablePopup
 } from "../utilities"

const minsyongVillage= (geojson_feature, material, markers) =>
{
    const viewer = material.source.viewer
    let name = material.info.name
    geojson_feature.eachLayer( layer =>
        {
            let props = layer.feature.properties,
                label = props["--label"]
            bindTablePopup(material, props, layer)
            let [centroid_x, centroid_y] = getCentroid2(layer.feature.geometry.coordinates[0][0])
            let myIcon = Leaflet.divIcon(
                {
                    html:`
                    <div style="
                        width: max-content;
                        border: 1px solid #717171;
                        background: #d8d8d8;
                        padding: 2px 5px;
                        border-radius: 3px;
                        color: #7b7b7b;">
                        <span>${label}</span>
                    </div>`
                });
            let labelMarker = Leaflet.marker([centroid_y, centroid_x], {icon: myIcon})
            geojson_feature.addLayer( labelMarker )

            const event_callback = e =>
            {
                let zoom = e.target._map.getZoom() //11
                if( zoom < 12 ) labelMarker.show = false
                else labelMarker.show = true
            }
            defined_showProperty( labelMarker, viewer, material )  

            
            geojson_feature.addEventListener('zoomend', event_callback);
        })
    const handleZoomFireEvent = () => geojson_feature.fire('zoomend')
    const onShow = () => viewer.addEventListener('zoomend', handleZoomFireEvent)
    const onHidden = () => viewer.removeEventListener('zoomend', handleZoomFireEvent)
    defined_showProperty( geojson_feature, viewer, material, {onShow, onHidden} )  
    viewer.addEventListener( 'zoomend', handleZoomFireEvent)
    geojson_feature.setStyle({
        fill: false,
        color:"#24853c",
        dashArray: null,
        weight: 2,
    })
}

export default minsyongVillage