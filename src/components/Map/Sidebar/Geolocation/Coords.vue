<template>
    <form class="md-layout">
        <md-card  class="md-layout-item">
            <md-card-content>
                <md-field >
                    <label >輸入經度</label>
                    <md-input v-model="lng"></md-input>
                </md-field>
                <md-field >
                    <label >輸入緯度</label>
                    <md-input v-model="lat"></md-input>
                </md-field>
            </md-card-content>
            
            <md-card-actions>
                <md-button>清除</md-button>
                <md-button @click="handleSubmit">查詢</md-button>
            </md-card-actions>
        </md-card>
    </form>
</template>
<script>
// import Global from '@/global'
import Global from "../../../../global"

export default {
    name:"Coords",
    data()
        {
            return{
                lat: '',
                lng: ''
            }
        },
    methods:
        {
            handleSubmit()
            {
                Global.VPMC.viewer.flyTo([this.lat, this.lng], 17)
                // Global.viewerPromise.apply( viewer =>
                // {
                //     viewer.flyTo([this.lat, this.lng], 17)
                // })
            }
        },
}
</script>