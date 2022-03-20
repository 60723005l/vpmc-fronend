<template>
  <div>
    <StepOne @submit="handleLatlngQuery" @onClear="handleLocationClear"></StepOne>
    <StepTwo @submit="handleSerialsQuery"></StepTwo>
    <div class="filterResults" ref='filter-result'>
      <div class="count" v-if="filterResults.length">
        <p class="title">篩選筆數</p>
        <p class="number">{{filterResults.length}}</p>
        <p class="title">筆</p>
      </div>
      <FilterResultCard
        v-for="(item, index) in filterResults"
        :key="index"
        :name="item.manageName"
        :type="item.buildingState"
        :unitNumber="item.unitNumber"
        :year="item.completionDate"
        :totalPrice="item.totalPrice"
        :unitPrice="item.unitPrice"
        @click="flyToCardLocation(item.coordinateY, item.coordinateX)"
      />
    </div>
  </div>
</template>
<script>
import { Circle, Icon, latLng, LatLng, Marker } from "leaflet";
import api from "../../../../../api";
import Global from "../../.././../../global";
import projector, { EPSG } from "../../../../../VPMC/module/projector";
export default {
  name: "ComparativeCaseFilter",
  components: {
    StepOne: async () => await import("./StepOne.vue"),
    StepTwo: async () => await import("./StepTwo.vue"),
    FilterResultCard: async () => await import("./FilterResultCard.vue"),
  },
  data() {
    return {
      targetedLatlng: undefined,
      pinMark: undefined,
      bufferGraphic: undefined,
      mappedLayers: [],
      serials: [],
      asyncSerials: undefined,
      params: {},
      filterResults: [],
    };
  },
  mounted() {
    // Global.VPMC.transactionDataStreaming.updateEvent.addEventListener(this.handleStramingUpdate)
  },
  beforeDestroy() {
    // Global.VPMC.transactionDataStreaming.updateEvent.removeEventListener(this.handleStramingUpdate)
  },
  methods: {
    async handleSerialsQuery(params) {
      this.params = { ...params };
      this.createBufferGraphic(this.targetedLatlng, params.distance);
      this.asyncSerials = api.Estimate.getComparativeCases(params);
      this.serials = await this.asyncSerials;
      const layers = this.hightlightMatchSerialsPoints(this.serials);
      this.filterResults = layers.map((layer) => layer.properties || {});
      const elem = this.$refs['filter-result']
      setTimeout(() => elem.scrollIntoView(), 500)
    },
    hightlightMatchSerialsPoints(serials = []) {
      const viewer = Global.VPMC.viewer;
      this.mappedLayers.forEach((layer) => viewer.removeLayer(layer));
      serials.forEach((serial) => {
        const [x, y] = projector(EPSG[3826], EPSG[4326], {
          x: serial.coordinateY,
          y: serial.coordinateX,
        });
        const marker = new Marker(latLng(y, x));
        marker.on("mouseover", function (ev) {
          ev.target.openPopup();
        });

        marker.on("mouseout", function (ev) {
          ev.target.closePopup();
        });
        marker.properties = { ...serial }
        marker.bindPopup(`
                <div>
                    ${
                      Math.floor(
                        ((marker.properties.unitPrice * 3.3) / 10000) * 100
                      ) / 100
                    }萬/坪
                </div>
                `);
        this.mappedLayers.push(marker)
        viewer.addLayer(marker)
      });
      return this.mappedLayers
    },
    async handleStramingUpdate(points) {
      const layers = this.hightlightMatchSerialsPoints(this.serials || []);
      this.filterResults = layers.map((layer) => layer.properties || {});
    },
    /**
     * @param {LatLng} latlng
     */
    async handleLatlngQuery(latlng) {
      const viewer = await Global.VPMC.asyncViewer
      const marker = new Marker(
        latlng,
        {
          icon: new Icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          })
        }
      )
      await this.handleLocationClear()
      this.targetedLatlng = latlng
      this.pinMark = marker
      viewer.addLayer(marker)
    },
    async handleLocationClear() {
      const viewer = await Global.VPMC.asyncViewer
      this.pinMark && viewer.removeLayer(this.pinMark)
    },
    async createBufferGraphic(latlng, distance) {
      const viewer = await Global.VPMC.asyncViewer;
      if (this.bufferGraphic) {
        viewer.removeLayer(this.bufferGraphic);
        this.bufferGraphic = undefined;
      }
      const buffer = new Circle(latlng, {
        radius: distance,
        weight: 1.5,
        fillColor: "#03fcf8",
        dashArray: "2, 2",
      });
      this.bufferGraphic = buffer;
      viewer.addLayer(buffer);
    },
    async flyToCardLocation (x, y) {
      const viewer = await Global.VPMC.asyncViewer
      const [lng, lat] = projector(EPSG[3826], EPSG[4326], {x, y})
      viewer.flyTo(latLng(lat, lng), 19)
    }
  },
};
</script>
<style lang="scss" scoped>
.count{
  font-size: 20px;
  font-weight: bold;
  display: inline-flex;
  align-items: center;
  .title{
    margin-right: 5px;
  }
  .number{
    font-size: 25px;
    color: red;
    padding: 8px;
  }
}
</style>