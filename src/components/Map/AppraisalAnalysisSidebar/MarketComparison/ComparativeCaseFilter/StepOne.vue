<template>
    <form novalidate class="md-layout" @submit.prevent="()=>{}">
        <md-card class="form-card">
            <md-card-content>
                <div class="vpmc-step-form-wraper">
                    <div class="vpmc-Step-title">步驟一：載入勘估標的位置</div>
                    <div class="vpmc-step-content">
                        <div class="vpmc-step-item-group">
                            <div class="item-group-title"><input type="radio" v-model="mode.vm" :value="modeMap.landcode">一、地號：</div>
                            
                            <div class="item-group-content">
                                <div class="form-item">
                                    <input type="text" placeholder="請輸入地號" v-model="landcode.vm" :disabled="mode.vm !== modeMap.landcode">
                                </div>
                            </div>
                        </div>
                        <!-- ------------------------------- -->
                        <div class="vpmc-step-item-group">
                            <div class="item-group-title"><input type="radio" v-model="mode.vm" :value="modeMap.address">二、門牌：</div>
                            
                            <div class="item-group-content">
                                <div class="form-item">
                                    <input type="text" placeholder="請輸入路段門牌" v-model="address.vm" :disabled="mode.vm !== modeMap.address">
                                </div>
                            </div>
                        </div>
                        <!-- ------------------------------- -->
                        <div class="vpmc-step-item-group">
                            <div class="item-group-title"><input type="radio" v-model="mode.vm" :value="modeMap.latlng">三、WGS84座標：</div>
                            
                            <div class="item-group-content">
                                <div class="text-item">{{lat.name}}：</div>
                                <div class="form-item">
                                    <input type="number" placeholder="輸入值" v-model="lat.vm" :disabled="mode.vm !== modeMap.latlng">
                                </div>
                                <div class="text-item">{{lng.name}}：</div>
                                <div class="form-item">
                                    <input type="number" placeholder="輸入值" v-model="lng.vm" :disabled="mode.vm !== modeMap.latlng">
                                </div>
                            </div>
                        </div>
                        <!-- ------------------------------- -->
                        <div class="vpmc-step-item-group">
                            <div class="item-group-title"><input type="radio" v-model="mode.vm" :value="modeMap.serialnum">四、CCIS案件編號：</div>
                            <div class="item-group-content">
                                <div class="form-item">
                                    <input type="text" placeholder="輸入值( 10位數字編碼)" v-model="serialnum.vm" :disabled="mode.vm !== modeMap.serialnum">
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </md-card-content>

            <md-card-actions>
                <md-button type="button" class="vpmc-btn" @click="handleClear">清除</md-button>
                <md-button type="submit" class="vpmc-btn" @click="handleSubmit">定位執行</md-button>
            </md-card-actions>
        </md-card>

    </form>
</template>
<script>
import { LatLng } from 'leaflet'
import Global from '../../../../../global'
import api from '../../../../../api'

class FormItem {
    constructor (name ,vm, datas) {
        this.name = name
        this.vm = vm
        this.disable = false
        this.datas = datas
    }
}

const modeMap = { latlng: 'latlng', address: 'address', landcode: 'landcode', serialnum: 'serialnum' }

const getDefaultData = () => ({
    modeMap,
    mode: new FormItem('mode', modeMap.latlng),
    landcode: new FormItem('landcode', undefined),
    address: new FormItem('address', undefined),
    lng: new FormItem('經度', 121.2139),
    lat: new FormItem('緯度', 25.01969),
    serialnum: new FormItem('serialnum', undefined),
})

export default {
    name: 'StepOne',
    data() {
        return {
            ...getDefaultData()
        }
    },
    methods: {
        async handleSubmit(e) {
            e.preventDefault()
            const viewer = await Global.VPMC.asyncViewer
            let latlng = undefined
            let resp = undefined

            switch (this.mode.vm) {
                case this.modeMap.latlng:
                    latlng = new LatLng(this.lat.vm, this.lng.vm)
                    break
                case this.modeMap.address:
                    resp = await api.Location.getGeoinfoFromAddr({oAddress: this.address.vm})
                    const addrInfo = resp.AddressList[0]
                    latlng = new LatLng(addrInfo.Y, addrInfo.X)
                    break
                case this.modeMap.landcode:
                    resp = await api.Location.getGeomByLands({"lands[]": this.landcode.vm})
                    const coords = resp.features[0].geometry
                    console.log(coords)
                    break
                case this.modeMap.serialnum:
                    break
            }
            if (!latlng) return
            viewer.flyTo(latlng, 17)
            this.$emit('submit', latlng)
        },
        handleClear() {
            this.mode = new FormItem('mode', modeMap.latlng)
            this.landcode = new FormItem('landcode', undefined)
            this.address = new FormItem('address', undefined)
            this.lng = new FormItem('經度', undefined)
            this.lat = new FormItem('緯度', undefined)
            this.serialnum = new FormItem('serialnum', undefined)

            this.$emit('onClear')
        }
    }
}
</script>
<style lang="scss" scoped>
@import './Step.scss';
</style>