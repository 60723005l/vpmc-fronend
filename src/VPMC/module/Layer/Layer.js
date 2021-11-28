import LayerInfo from "./LayerInfo"
import LayerControl from "../LayerControl"
import Leaflet from 'leaflet'
import Builder from "../LayerBuilder/Builder"
import BuilderCreator from "../LayerBuilder/BuilderCreator"

class Layer {
    /**
     * 
     * @param {LayerInfo} info 
     */
    constructor( info ) {
        /**
         * @type {LayerInfo}
         */
        this.info = info
        /**
         * @type {Leaflet.Layer }
         */
        this.content = undefined
        /**
         * @type {Leaflet.Map}
         */
        this.viewer = undefined
        /**
         * @type {LayerControl}
         */
        this._controler = undefined
        this._show = false
    }
    get id() { return this.info.id }
    get show() { 
        let result = this.viewer.hasLayer(this.content)
        this.info.setShow(result)
        return result
        return this._show 
    }
    set show( val ) {
        if( this.isAddedToMap() && this.show != val){
            this.info.setShow(val)
            if(val) {
                this.viewer.addLayer( this.content )
            } else {
                this.viewer.removeLayer( this.content )
            }
        }
    }
    get zIndex() { return this.info.zIndex }
    set zIndex( val ) {
        if( this.isAddedToMap() ) {
            this.info.setZIndex( val )
            this.content.setZIndex( val )
        }
    }
    isAddedToMap(){
        return this.content !== undefined && this.viewer instanceof Leaflet.Map
    }
    isInControler(){
        return this._controler instanceof LayerControl
    }
    /**
     * 
     * @param {Leaflet.Map} viewer 
     * @param {Builder} builder optional
     */
    addToMap( viewer, builder ){
        if( this.isAddedToMap() ){
            console.warn(`layer ${this.info.name} has already added to map`)
            return
        }
        if ( builder ) {
            this.content = builder.processor( this.info )
        } else {
            let builder = BuilderCreator( this.info.type )
            this.content = builder.processor( this.info )
        }
        this.viewer = viewer
        viewer.addLayer( this.content )
        this.info.setShow( this.show )
        // this.show = false
        return this
    }
    /**
     * 
     * @param {LayerControl} controler 
     */
    addToControler( controler ){
        if( this.isInControler() ){
            console.warn(`layer ${this.info.name} has already in controler`)
            return
        }
        this._controler = controler
        controler.add( this )
    }
    destroy() {
        if( this.isInControler() ){
            this._controler.remove( this )
            this._controler = undefined
        }
        if( this.isAddedToMap() ){
            this.viewer.removeLayer( this.content )
            this.viewer = undefined
            this.content = undefined
        }
    }
}

export default Layer