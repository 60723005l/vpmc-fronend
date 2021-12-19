import Type from "../Layer/Type";
import Builder from "./Builder";
import Leaflet from "leaflet"
import LayerInfo from "../Layer/LayerInfo";
import store from "../../../store"

class BuildingBuilder extends Builder {
    constructor(){
        super()
        this.type = Type.GEOJSON
    }
    /**
     * 
     * @param {LayerInfo} info 
     */
    processor( info ){
        const geoJSON = Leaflet.geoJSON(info.options.url)
        geoJSON.eachLayer(layer => {
            const { properties } = layer.feature
            layer.on('click', e => {
                store.dispatch('widgetSidebar/activate', 'Info')
                store.commit('widgetSidebar/open', true)
                store.commit('widgetSidebar/setPayload', {key: "Info", payload: { properties }})
            })
            
        })
        return geoJSON
    }
}
export default BuildingBuilder