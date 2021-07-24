<template>
    <div class="full-page col">
        <Banner/>
        <SubBanner/>
        <div class="body">
            
            <LeafletViewer/>
        </div>
        
        
    </div>
</template>
<script>
import LeafletViewer from "@/components/LeafletViewer"
import Banner from "@/components/Map/Banner"
import SubBanner from "@/components/Map/SubBanner"

export default {
    name: "Map",
    data()
        {
            return {
                
            }
        },
    mounted()
        {            
            
        },
    methods:
        {
            
        },
    components:
        {
            LeafletViewer,
            Banner,
            SubBanner
        }            
}
</script>
<style scoped>
.full-page{
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100vw;
    height: 100vh;
    background: antiquewhite;
}
.header{
    background:#1e1e23;
    /* min-height: 70px; */
}
.header-menu-holder{
    background: #41b883;
    padding: 10px;
    margin-top: -1px;
}
.body{
    background: cadetblue;
    height: 100%;
    position: relative;
}
</style>