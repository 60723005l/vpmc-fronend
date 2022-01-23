<template>
    <div>
        <StepOne @submit="handleLatlngQuery"></StepOne>
        <StepTwo @submit="handleSerialsQuery"></StepTwo>
    </div>
</template>
<script>
import { Circle, Icon, LatLng } from 'leaflet'
import api from '../../../../../api'
import Global from '../../.././../../global'
export default {
    name: 'ComparativeCaseFilter',
    components:
        {
            StepOne: async () => await import('./StepOne.vue'),
            StepTwo: async () => await import('./StepTwo.vue')
        },
    data() {
        return {
            targetedLatlng: undefined,
            bufferGraphic: undefined,
            mappedLayers: []
        }
    },
    methods: {
        async handleSerialsQuery (params) {
            this.createBufferGraphic(this.targetedLatlng, params.distance)
            const { transactionSerialNumber: serials } = await api.Estimate.getComparativeCases(params)
            const targetLayerGroup = Global.VPMC.transactionDataStreaming.pointCluster
            
            this.mappedLayers = serials.map(id => {
                const mappedLayer = targetLayerGroup.getLayers().find(e => e.properties.id === id)
                return mappedLayer
            }).filter(layer => layer !== undefined && layer.getLatLng().distanceTo(this.targetedLatlng) <= params.distance)

            this.mappedLayers.map(layer => layer.setStyle({
                color: 'red'
            }))

            console.log(serials, this.mappedLayers)
        },
        /**
         * @param {LatLng} latlng
         */
        async handleLatlngQuery (latlng) {
            this.targetedLatlng = latlng
        },
        async createBufferGraphic (latlng, distance) {
            const viewer = await Global.VPMC.asyncViewer
            if (this.bufferGraphic) {
                viewer.removeLayer(this.bufferGraphic)
                this.bufferGraphic = undefined
            }
            const buffer = new Circle(latlng, { radius: distance })
            this.bufferGraphic = buffer
            viewer.addLayer(buffer)

        }
    }
}
</script>