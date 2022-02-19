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
            mappedLayers: [],
            serials: [],
            asyncSerials: undefined,
            params: {}
        }
    },
    mounted () {
        Global.VPMC.transactionDataStreaming.updateEvent.addEventListener(this.handleStramingUpdate)
    },
    beforeDestroy () {
        Global.VPMC.transactionDataStreaming.updateEvent.removeEventListener(this.handleStramingUpdate)
    },
    methods: {
        async handleSerialsQuery (params) {
            this.params = { ...params }
            this.createBufferGraphic(this.targetedLatlng, params.distance)
            this.asyncSerials = api.Estimate.getComparativeCases(params)
            const resp = await this.asyncSerials
            this.serials = resp.transactionSerialNumber
            this.hightlightMatchSerialsPoints(this.serials)
        },
        hightlightMatchSerialsPoints (serials = []) {
            const points = Global.VPMC.transactionDataStreaming.pointCluster.getLayers()
            this.mappedLayers = serials.map(id => points.find(e => e.properties.id === id))
            .filter(layer => layer !== undefined && layer.getLatLng().distanceTo(this.targetedLatlng) <= this.params.distance)

            this.mappedLayers.forEach(layer => layer.setStyle({
                color: 'red'
            }))
        },
        async handleStramingUpdate (points) {
            this.hightlightMatchSerialsPoints(this.serials || [])
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
            const buffer = new Circle(latlng, { radius: distance, weight: 1.5, fillColor: '#03fcf8', dashArray: '2, 2' })
            this.bufferGraphic = buffer
            viewer.addLayer(buffer)

        }
    }
}
</script>