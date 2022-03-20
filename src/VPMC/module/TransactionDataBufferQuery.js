import { Map, CircleMarker, LatLng, Circle } from "leaflet"
import { GetByExtenResp } from '../../api/module/transaction'
import Event from "../../utilities/Event"

 /**
 * @type {CircleMarker & { properties: GetByExtenResp[0] }}
 */
export let TransLayer

/** @type {{lastYearTransUnitPrice,maxTransUnitPrice,minTransUnitPrice,meanTransArea}} */
export let QueryType

class TransactionDataBufferQuery {
  constructor (viewer, buffer) {
    /** @type {Map} */
    this.viewer = viewer
    this.buffer = buffer || 500
    /** @type {Circle | undefined} */
    this.bufferGraphic = undefined
    /**@type {QueryType} */
    this.state = {}
    this.stateUpdateEvent = new Event()
  }

  /**
   * 
   * @param {LatLng} latlng
   * @param {TransLayer[]} transLayers
   */
  query (transLayers, latlng = this.viewer.getCenter()) {
    const targetLayers = transLayers.filter(layer => layer.getLatLng().distanceTo(latlng) <= this.buffer)
    this.state = this.parseTransData(targetLayers)
    this.stateUpdateEvent.raise(this.state)
    return targetLayers
  }

  /**
   * 
   * @param {TransLayer[]} transLayers
   * @returns {QueryType}
   */
  parseTransData (transLayers) {
    const lastYearLayers = transLayers.filter(layer => this.parseDateStringToYear(layer.properties.transactionDate) <= new Date().getFullYear())

    const lastYearTransUnitPrice = lastYearLayers.reduce((total, layer) => total + layer.properties.unitPrice, 0) / lastYearLayers.length
    const maxTransUnitPrice = Math.max(...transLayers.map(layer => layer.properties.unitPrice))
    const minTransUnitPrice = Math.min(...transLayers.map(layer => layer.properties.unitPrice))
    const meanTransArea = transLayers.reduce((total, layer) => total + layer.properties.landShiftingArea, 0) / transLayers.length
    return {
      lastYearTransUnitPrice,
      maxTransUnitPrice,
      minTransUnitPrice,
      meanTransArea
    }
  }

  parseDateStringToYear (d) {
    const yyyy = Number(d.slice(0, d.length-4)) + 1911
    return yyyy
  }

  createBufferGraphic(latlng) {
    if (this.bufferGraphic) {
      this.viewer.removeLayer(this.bufferGraphic)
      this.bufferGraphic = undefined;
    }

    const buffer = new Circle(latlng, {
      radius: this.buffer,
      weight: 2,
      fillColor: "#ffaa69",
      fillOpacity: 0.1,
      color: '#575757',
      dashArray: "4, 4",
    });
    this.bufferGraphic = buffer;
    this.viewer.addLayer(buffer);
  }
}

export default TransactionDataBufferQuery
