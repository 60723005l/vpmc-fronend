<template>
  <div :id="viewerContainer" class="leaflet-viewer">
      <GeoLocation v-if="geolocation"/>
  </div>
</template>

<script>
import Leaflet from 'leaflet'
import 'leaflet/dist/leaflet.css'
import GeoLocation from "@/components/mapWidget/GeoLocation"
import Global from '../global'
import { UUID } from '../utilities'
console.log(UUID)
// import UUID from "@/lib/LayerManage/UUID"
// import LayerManageCenter from "@/lib/LayerManage/LayerManageCenter"
// import {Factory} from "@/lib/LayerManage/Factory"
// import Product from "@/lib/LayerManage/LayerProduct"

export default {
  name: 'LeafletViewer',
  data ()
    {
       return {
        msg: 'Welcome to Your Vue.js App'
      }

    },
  props:
    {
      viewerContainer:
      {
        type: String,
        default: UUID()
      },
      lat:
      {
        type: Number,
        default: 23
      },
      lon:
      {
        type: Number,
        default: 121
      },
      zoom:
      {
        type: Number,
        default: 7
      },
      geolocation:
      {
        type: Boolean,
        default: true
      },
      zoomControl:
      {
        type:Object,
        default:()=>
        {
          return {
            show: true,
            position: 'right-top'
          }
        }
      }
    },
  mounted()
    {
      this.initMap()
    },
  methods:
    {
      initMap()
      {
        
        let option = 
        {
          elemId: this.viewerContainer,
          position: [this.lat, this.lon],
          zoom: this.zoom
        }
        let viewer = Global.createViewer(option)
        Global.viewerPromise.setViewer(viewer)
        var data = Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
        viewer.addLayer(data)
        viewer.zoomControl.getContainer().hidden = !this.zoomControl.show
        viewer.zoomControl.getContainer().parentElement.classList.remove('leaflet-left')
        viewer.zoomControl.getContainer().parentElement.classList.add('leaflet-right')
        window.Global = Global
        window.viewer = viewer

      },
    },
  components:
    {
      GeoLocation
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.leaflet-viewer{
  width: 100%;
  height: 100%
}
</style>
