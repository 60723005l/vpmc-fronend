<template>
    <div class="form">
        <div class="item col">
            <span>輸入經度</span>
            <input type="text" v-model="lon">
        </div>
        <div class="item col">
            <span>輸入緯度</span>
            <input type="text" v-model="lat">
        </div>
        <div class="item submit">
            <button @click="handleSubmit">確認</button>
        </div>
    </div>
</template>
<script>
import Global from '@/global'

export default {
    name:"Coords",
    data()
        {
            return{
                lat: '',
                lon: ''
            }
        },
    methods:
        {
            handleSubmit()
            {
                Global.viewerPromise.apply( viewer =>
                {
                    viewer.flyTo([this.lat, this.lon], 17)
                })
            }
        },
}
</script>