<template>
    <div class="custom-popup" ref="custom-popup">
        <div class="group-props">
            <div class="title">建物資料</div>
            <div class="content">
                <li>類型：{{payload.buildingState.buildingState}}</li>
                <li>成交坪數：{{Math.floor(payload.buildingState.landShiftingArea / 3.3 * 100) / 100}}坪</li>
                <li>成交價格：{{Math.floor(payload.buildingState.totalPrice / 10000 * 100) / 100}}萬元</li>
                <li>成交單價：{{Math.floor((payload.buildingState.unitPrice * 3.3) / 10000 * 100) / 100}}萬元/坪</li>
                <li>成交時間：{{transactionDate}}</li>
            </div>
        </div>
        <div class="group-props">
            <div class="title">區域成交行情</div>
            <div class="content">
                <li>近一年成交均價：{{Math.floor((payload.queryState.lastYearTransUnitPrice * 3.3) / 10000 * 100) / 100}}萬元/坪</li>
                <li>歷史最高價：{{Math.floor((payload.queryState.maxTransUnitPrice * 3.3) / 10000 * 100) / 100}}萬元/坪</li>
                <li>歷史最低價：{{Math.floor((payload.queryState.minTransUnitPrice * 3.3) / 10000 * 100) / 100}}萬元/坪</li>
                <li>平均成交坪數：{{Math.floor(payload.queryState.meanTransArea / 3.3 * 100) / 100}}坪</li>
            </div>
        </div>
    </div>
</template>
<script>
import { IPopupPayload } from './index'
import Leaflet from 'leaflet'
import { QueryType, TransLayer } from '../../VPMC/module/TransactionDataBufferQuery'
import Global from '../../global'

// /**@returns {IPopupPayload & QueryType} */
const defaultProps = () =>{
    return {
        queryState: {
            lastYearTransUnitPrice: '',
            maxTransUnitPrice: '',
            minTransUnitPrice: '',
            meanTransArea: ''
        },
        /**@type {TransLayer['properties']} */
        buildingState: {
            buildingState: '',
            landShiftingArea: '',
            totalPrice: '',
            transactionDate: null,
            unitPrice: ''
        }
    }
}

export default {
    name: 'CustomMapPopup',
    data: () => ({
        payload: defaultProps()
    }),
    created()
        {
            this.$bus.$on("map-popup:msg", this.handleOnMsg);
        },
    computed:
        {
            transactionDate() {
                if (this.payload.buildingState.transactionDate) {
                    return Global.VPMC.transactionDataBufferQuery.parseDateStringToYear(this.payload.buildingState.transactionDate)
                }
                return null
            }
        },
    methods: 
        {
            /**@param {TransLayer} layer*/
            async handleOnMsg(layer){
                const queryState = Global.VPMC.transactionDataBufferQuery.state
                this.payload.queryState = {...queryState}
                console.log(queryState)
                this.payload.buildingState = {...layer.properties}
                layer.setPopupContent(`<p style="width:400px; height:200px"><img src="${require('@/assets/img/processing.gif')}"/></p>`)
                layer.bindPopup(this.$refs['custom-popup'], { maxWidth: '400px' })
                layer.openPopup()
            },
        }
}
</script>
<style lang="scss" scoped>
.custom-popup{
    display: flex;
    flex-direction: column;
    max-height: 350px;
    overflow: auto;
    .group-props{
        margin-top: 10px;
        border-radius: 5px;
        background: rgba(97, 192, 255, 0.452);
        .title{
            padding: 5px;
            color: white;
            background: rgb(23, 84, 124);
        }
        .content{
            padding: 10px;
            li{
            white-space: nowrap;
        }
        }
    }
}
</style>