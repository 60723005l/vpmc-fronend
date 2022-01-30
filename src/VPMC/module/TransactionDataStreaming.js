import { Map, latLng, Marker, markerClusterGroup, featureGroup, CircleMarker } from "leaflet"
// import markercluster from 'leaflet.markercluster'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import projector, { EPSG } from "./projector"

class TransactionDataStreaming {
  /**
   * 
   * @param {Map} viewer 
   * @param {(params: { xmin: Number, xmax: Number, ymin: Number, ymax: Number }) => Promise<{}>} apiFactory 
   */
  constructor (viewer, apiFactory) {
    /**@type {Map} */
    this.viewer = viewer
    this.apiFactory = apiFactory
    this.maxZoom = 16
    this.rawdata = []
    this.pointCluster = featureGroup()
    this.handleDragEnd = this.handleDragEnd.bind(this)
    this.handleDragStart = this.handleDragStart.bind(this)

    this.viewer.addLayer(this.pointCluster)
  }
  setViewer (viewer) {
    if (!viewer) {
      this.viewer = viewer
      this.viewer.addLayer(this.pointCluster)
    }
  }
  start () {
    window.TTT = this
    this.viewer.addEventListener('dragend', this.handleDragEnd)
    this.viewer.addEventListener('zoomend', this.handleDragEnd)
  }
  
  async handleDragEnd (event) {
    if (this.viewer.getZoom() >= this.maxZoom) {
      this.rawdata = await this.fetchDataFromBound()
      
      // this.pointCluster.removeLayers(this.pointCluster.getLayers())
      this.pointCluster.getLayers().map(layer => this.pointCluster.removeLayer(layer))
      // this.viewer.removeLayer(this.pointCluster)
      const points = this.createPointsFromRawData()
      points.forEach(point => this.pointCluster.addLayer(point))
      
      // this.pointCluster.addLayers(points)
      // this.viewer.addLayer(this.pointCluster)
      console.log(this.pointCluster.getLayers().length)
    } else {

    }
  }

  handleDragStart (event) {
    // const bound = this.viewer.getBounds()
    // console.log('start', event)
  }

  async fetchDataFromBound () {
    const bound = this.viewer.getBounds()
    
    const [xmin, ymin] = projector(EPSG[4326], EPSG[3826], {
      x: bound.getWest(), y: bound.getSouth()
    })
    const [xmax, ymax] = projector(EPSG[4326], EPSG[3826], {
      x: bound.getEast(), y: bound.getNorth()
    })
    // const visualBound = polygon([bound.getSouthWest(), bound.getNorthWest(), bound.getNorthEast(), bound.getSouthEast()])
    // this.viewer.addLayer(visualBound)
    return await this.apiFactory({
      xmax: Math.floor(xmax),
      xmin: Math.floor(xmin),
      ymax: Math.floor(ymax),
      ymin: Math.floor(ymin)
    })
  }

  createPointsFromRawData() {
    return this.rawdata.map(data => {
      const [x, y] = projector(EPSG[3826], EPSG[4326], { x: data.coordinateY, y: data.coordinateX })
      const marker =  new CircleMarker(latLng(y, x))
      marker.properties = {...data}
      const content = Object.keys(data).map(key => (`<div>${key}: ${data[key]}</div>`))
      marker.bindPopup(`
      <div>
        ${content.join("")}
      </div>
      `)
      return marker
    })
    
  }
}

export default TransactionDataStreaming