import Leaflet from 'leaflet'
import { get } from 'lodash'
import Event from "../../lib/Event"
import AssociativeArray from './AssociativeArray'

export default class LayerControl
{
    constructor(viewer, option = {})
    {
        this.viewer = viewer
        this.layerInfos  = []
        this.layers = new AssociativeArray(),
        this.onAddEvent = new Event()
        this.onRemoveEvent = new Event()
    }
    showByNames(names = [], force = false)
    {
        let ids = names.map( name => get(this.getByName(name), "id") )
        let cleanIds = ids.filter( id => id != undefined )
        if( force )
        {
            this.layers.omit(cleanIds).forEach( layer => layer.content.show = false )
        }
        else
        {
            this.layers.gets(cleanIds).forEach( layer => layer.content.show = true )
        }
    }
    setLayerList()
    {
        this.layerInfos = this.layers.values.map( product => { return product.info })
        return this.layerInfos
    }
    add( layer )
    {
        this.viewer.addLayer( layer.content )
        this.layers.set(layer.id, layer)
        this.setLayerList()
        this.onAddEvent.raise(layer)
    }
    get( layer )
    {
        return this.getById(layer.id)
    }
    getById( id )
    {
        return this.layers.get( id )
    }
    getByName( name )
    {
        return this.layers.values.find( layer => layer.name === name)
    }
    remove( layer )
    {
        this.viewer.removeLayer(layer.content)
        this.layers.remove( layer.id )
        this.setLayerList()
        this.onRemoveEvent.raise( layer )
    }
    removeById( id )
    {
        let layer = this.get(id)
        this.remove( layer )
    }
}
