<template>
    <!-- <md-button class="md-icon-button"  @click="handleClick"> -->
        <IconButton :src="require('@/assets/icon/full-screen.png')" :text="'全畫面'" @Click="handleClick"/>
    <!-- </md-button> -->
</template>
<script>
import IconButton from "@/components/basicUI/IconButton"
import { toggleFullScreen } from '@/utilities'
export default {
    name: "FullScreenButton",
    data()
        {
            return{
                status: false
            }
        },
    methods:
        {
            handleClick()
            {
                toggleFullScreen()
            }
        },
    components:
        {
            IconButton
        }
}
</script>
<style scoped>

</style>