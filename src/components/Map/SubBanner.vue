<template>
    <div class="sub-baner">
        <div class="group">
            <select class="item"><option value="測試">測試</option></select>
            <select class="item"><option value="測試">測試</option></select>
            <button class="item">測試</button>
        </div>
        <div class="group">
            <select class="item">
                <option value="估價分析">估價分析</option>
            </select>
            <select class="item">
                <option value="估價分析">內勤作業</option>
            </select>
        </div>
        <div class="group">
            <GeolocationButton class="item"/>
            <LayerButton class="item"/>
            <MeasureButton class="item"/>
        </div>


    </div>
</template>
<script>
import LayerButton from './SubBanner/LayerButton'
import MeasureButton from './SubBanner/MeasureButton'
import GeolocationButton from './SubBanner/GeolocationButton'

export default {
    name: "SubBanner",
    components:
        {
            LayerButton,
            MeasureButton,
            GeolocationButton
        }
}
</script>
<style scoped>
.sub-baner{
    display: flex;
    justify-content: center;
    background: #dcdcdc;
    box-shadow: 0px 5px 2px 0 #0000008c;
    z-index: 500;
    justify-content: space-between;
}
.sub-baner .group{
    display: flex;
    align-items: center;
}
.sub-baner .item{
    /* background: #ffffff6b; */
    border: none;
    margin: 0px 5px;
    padding: 5px 10px;
    border-radius: 0px;
    cursor: pointer;
    -webkit-transition: 0.5s all;
    transition: 0.2s all;
}
.sub-baner .item:hover{
    background: #2280fb69;
}
</style>