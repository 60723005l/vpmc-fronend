<template>
  <div class="viewer-container">
    <div :id="viewerContainer" class="leaflet-viewer"></div>
    <Measuerment v-if="measurement.activate" @onClose="measurement.onToggle" />
  </div>
  
</template>

<script>
import Measuerment from "./mapWidget/Measuerment.vue"
import Leaflet from 'leaflet'
import '@geoman-io/leaflet-geoman-free';  //https://github.com/geoman-io/leaflet-geoman
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';
import "leaflet.markercluster/dist/MarkerCluster.css"
import "leaflet.markercluster/dist/MarkerCluster.Default.css"
import 'leaflet.markercluster/dist/leaflet.markercluster'
import 'leaflet/dist/leaflet.css'

import iconUrl  from 'leaflet/dist/images/marker-icon.png'
import iconRetinaUrl  from 'leaflet/dist/images/marker-icon-2x.png'
import shadowUrl  from 'leaflet/dist/images/marker-shadow.png'

import Global from '../global'
import UUID from "../lib/utilities/UUID"
window.Global =Global 
const iconDefault = Leaflet.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
Leaflet.Marker.prototype.options.icon = iconDefault;

export default {
  name: 'LeafletViewer',
  data ()
    {
       return {
        msg: 'Welcome to Your Vue.js App',
        
      }

    },
  props:
    {
      measurement: {
        type: Object,
        default: () => ({
          activate: false,
          onToggle: () => {}
        })
      },
      viewerContainer:
      {
        type: String,
        default: UUID()
      },
      option:
      {
        type: Object,
        default: () => (
          {

          }
        )
      }
    },
  created()
    {

    },
  mounted()
    {
      this.initMap()
    },
  methods:
    {
      initMap()
      {
        let viewer = Global.VPMC.createViewer(this.option)
        this.adjustWidget(viewer)
        this.addBasemap(viewer)
      },
      adjustWidget(viewer)
      {
        viewer.zoomControl._container.parentElement.classList.remove('leaflet-left')
        viewer.zoomControl._container.parentElement.classList.add('leaflet-right')
      },
      addBasemap(viewer)
      {
        viewer.addLayer( Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{ maxZoom: 22, maxNativeZoom: 19}))
      }, 
    },
  components: 
    {
      Measuerment
    }
}
</script>

<style scoped>
.viewer-container{
  position: relative;
    width: 100%;
    height: 100%;
    z-index: 1;
}
.leaflet-viewer{
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  z-index: 1;
}
</style>
