<template>
    <!-- <div class="banner row">
        <div class="system-info row">
            <div class="logo group">
                <img :src="require('@/assets/logo.png')">
            </div>
            <div class="title">
                <span>VPMC不動產資情網</span>
            </div>
        </div>

        <div class="push-notification  group">
            <span>焦點要聞:  眾所矚目的旋轉豪宅「陶朱隱園」傳每坪 8百萬天價全棟完售</span>
        </div>
        <div class="user group" @click="handleUserClick">
            <img :src="require('@/assets/img/unknown-user.jpg')">
            <span>{{userState.username}}</span>
            <router-link style="color:#44b2ff;" v-if="!userState.isLogin" to="/">登入</router-link>
        </div>
        
    </div> -->
    <md-toolbar class="md-dense banner ">
        <div class="system-info row md-toolbar-section-start">
            <div class="logo group">
                <img :src="require('@/assets/logo.png')">
            </div>
            <div class="title">
                <span>VPMC不動產資情網</span>
            </div>
        </div>

        <div class="push-notification  group">
            <span>焦點要聞:  眾所矚目的旋轉豪宅「陶朱隱園」傳每坪 8百萬天價全棟完售</span>
        </div>
        <div class="md-toolbar-section-end group">
            
            <div class="divider user" @click="handleUserClick">
                <img :src="require('@/assets/img/unknown-user.jpg')">
                <span>{{userState.username}}</span>
                <router-link style="color:#44b2ff;" v-if="!userState.isLogin" to="/">登入</router-link>
            </div>
        </div>
    </md-toolbar>
</template>
<script>
export default {
    name: "Banner",
    data() 
        {
            return {
                userState:
                {}
            }
        },
    mounted()
        {
            this.userState = 
            {
                username: this.$store.state.user.username || '未知',
                isLogin: this.$store.state.user.isLogin
            }
        },
    methods:
        {
            handleUserClick()
            {
                
                if( this.userState.isLogin )
                {
                    let url = `${process.env.BASE_BACKEND_URL}Identity/Account/Manage`
                    window.open(url, '_blank').focus();
                }
            }
        }
}
</script>
<style scoped>
.banner{
    justify-content: space-between;
    /* background: #0e3c63; */
    padding: 5px 0px;
    color: white;
}
.group{
    align-items: center;
    padding: 0px 10px;
    margin: 5px 0px;
    height: 80%;
}
.divider{
    border-left: 2px solid rgba(255, 255, 255, 0.335);
}
.logo{
    height: 40px;
    background: #ffffffd9;
    border-radius: 0px 0px 10px 0px;
}
.logo img{
    height: inherit;
}
.title{
    display: flex;
    margin: 0px 10px;
    font-size: x-large;
}
.push-notification{
    display: flex;
    align-items: center;
    background: #ffffff3b;
    border-radius: 0px 10px 5px 0px;
    width: 400px;
    overflow: hidden;
}
.push-notification span{
    white-space: nowrap;
    
    transform:translateX(100%);
    animation: push-notification 20s linear infinite;
}
.marquee {
height: 50px;
overflow: hidden;
}
.marquee h3 {
font-size: 1em;
color: #000;
transform:translateX(100%);
animation: push-notification 20s linear infinite;
}
@keyframes push-notification {
    0% { 
        transform: translateX(100%);
    }
    100% {
        transform: translateX(-100%);
    }
}


.user{
    cursor: pointer;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    margin: 0px 10px;
    background: none;
    height: 100%;
    padding: 3px 10px;
    transition: 0.3s all;
    /* padding: 10px; */
}
.user:hover{
    background: rgba(255, 255, 255, 0.199);
}
.user img{
    height:20px;
}
.user span{
    margin: 0px 5px;
}
</style>