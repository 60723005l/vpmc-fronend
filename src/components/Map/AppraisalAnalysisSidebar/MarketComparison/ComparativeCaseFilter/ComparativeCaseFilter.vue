<template>
  <div>
    <StepOne @submit="handleLatlngQuery"></StepOne>
    <StepTwo @submit="handleSerialsQuery"></StepTwo>
    <div class="filterResults">
      <FilterResultCard
        v-for="(item, index) in filterResults"
        :key="index"
        :name="item.manageName"
        :type="item.buildingState"
        :unitNumber="item.unitNumber"
        :year="item.completionDate"
        :totalPrice="item.totalPrice"
        :unitPrice="item.unitPrice"
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
      console.log(this.serials);
      const layers = this.hightlightMatchSerialsPoints(this.serials);
      this.filterResults = layers.map((layer) => layer.properties || {});
      console.log(this.filterResults);
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
        marker.properties = { ...serial };
        // const content = Object.keys(serial).map(
        //   (key) => `<div>${key}: ${serial[key]}</div>`
        // );
        marker.bindPopup(`
                <div>
                    ${
                      Math.floor(
                        ((marker.properties.unitPrice * 3.3) / 10000) * 100
                      ) / 100
                    }萬/坪
                </div>
                `);
        this.mappedLayers.push(marker);
        viewer.addLayer(marker);
      });
      return this.mappedLayers;
      // const points = Global.VPMC.transactionDataStreaming.pointCluster.getLayers()
      // this.mappedLayers = serials.map(serial => points.find(e => e.properties.id === serial.id))
      // .filter(layer => layer !== undefined && layer.getLatLng().distanceTo(this.targetedLatlng) <= this.params.distance)

      // this.mappedLayers.forEach(layer => layer.setStyle({
      //     color: 'red'
      // }))
      // return this.mappedLayers
    },
    async handleStramingUpdate(points) {
      const layers = this.hightlightMatchSerialsPoints(this.serials || []);
      this.filterResults = layers.map((layer) => layer.properties || {});
    },
    /**
     * @param {LatLng} latlng
     */
    async handleLatlngQuery(latlng) {
      this.targetedLatlng = latlng;
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
  },
};
</script>