import { Map, latLng, featureGroup, CircleMarker } from "leaflet"
import 'leaflet.markercluster/dist/MarkerCluster.css'
import { debounce } from "lodash"
import Event from "../../utilities/Event"
import projector, { EPSG } from "./projector"
// import TransactionDataBufferQuery from "./TransactionDataBufferQuery"

class TransactionDataStreaming {
  /**
   * 
   * @param {Map} viewer 
   * @param {(params: { xmin: Number, xmax: Number, ymin: Number, ymax: Number }) => Promise<{}>} apiFactory 
   */
  constructor(viewer, apiFactory) {
    /**@type {Map} */
    this.viewer = viewer
    this.apiFactory = apiFactory
    this.maxZoom = 16
    this.rawdata = []
    this.pointCluster = featureGroup()
    this.handleDragEnd = this.handleDragEnd.bind(this)
    this.handleDragStart = this.handleDragStart.bind(this)
    this.updateEvent = new Event()
    this.beforeUpdateEvent = new Event()
    // this.bufferQuery = new TransactionDataBufferQuery(viewer, 500)

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
    this.viewer.addEventListener('dragend', debounce(this.handleDragEnd, 500, { maxWait: 500, leading: true, trailing: false, }))
    this.viewer.addEventListener('zoomend', debounce(this.handleDragEnd, 500, { maxWait: 500, leading: true, trailing: false, }))
  }

  async handleDragEnd (event) {
    this.beforeUpdateEvent.raise()
    this.pointCluster.getLayers().forEach(layer => this.pointCluster.removeLayer(layer))
    if (this.viewer.getZoom() >= this.maxZoom) {
      this.rawdata = await this.fetchDataFromBound()
      const points = this.createPointsFromRawData()
      points.forEach(point => this.pointCluster.addLayer(point))
      // this.bufferQuery.query(points)
    }
    this.updateEvent.raise(this.pointCluster.getLayers())
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
    return await this.apiFactory({
      xmax: Math.floor(xmax),
      xmin: Math.floor(xmin),
      ymax: Math.floor(ymax),
      ymin: Math.floor(ymin)
    })
  }

  createPointsFromRawData () {
    return this.rawdata.map(data => {
      const [x, y] = projector(EPSG[3826], EPSG[4326], { x: data.coordinateY, y: data.coordinateX })
      const marker = new CircleMarker(latLng(y, x), { radius: 3 })
      marker.setStyle({
        color: 'orange'
      })
      marker.properties = { ...data }
      // const content = Object.keys(data).map(key => (`<div>${key}: ${data[key]}</div>`))
      // marker.bindPopup(`
      // <div>
      //   ${content.join("")}
      // </div>
      // `)
      return marker
    })

  }
}

export default TransactionDataStreaming
