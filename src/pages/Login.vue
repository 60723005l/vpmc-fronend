<template>
    <div style="width: 100vw;height: 100vh;overflow: hidden;">
        <video autoplay muted restart class="myVideo">
            <source :src="require('@/assets/domo-vdo.mp4')" type="video/mp4">
        </video>
        <div class="login-container col" autocomplete="off">
            <div class="logo row">
                <img :src="logoImg">
            </div>
            <div class="form">
                <md-field class="field">
                    <label for="username">帳號</label>
                    <md-input type="text" id="username" v-model="username"></md-input>
                </md-field>
                <md-field class="field" :md-toggle-password="false">
                    <label for="password">密碼</label>
                    <md-input :type="psw_inputType" id="password" class="" v-model="password"></md-input>
                    <md-button class="md-icon-button" @click="togglePassword"><md-icon>{{psw_iconType}}</md-icon></md-button>
                </md-field>
                <div class="errmsg">
                    <span>{{errmsg}}</span>
                </div>
                <md-card-actions>
                    <md-button class="md-primary md-raised" @click="handleDevLogin('訪客')">訪客登入</md-button>
                    <md-button class="md-primary md-raised" @click="handleFormSubmit">登入</md-button>
               </md-card-actions>
                <div>
                    <!-- <p><input type="submit" value="登入"></p> -->
                    <!-- <p><button @click="handleDevLogin('Admin')">DEV_Admin</button></p> -->
                    <!-- <p><md-button @click="handleDevLogin('Anymouse')">DEV_Anymouse</md-button></p> -->
                </div>
                <div>
                    <router-link :to="{ name: 'Register' }">註冊</router-link>
                    <a :href="href.forgotPassword">忘記密碼</a>
                </div>
                
            </div>
        </div>
    </div>
    
</template>
<script>
import config from "../../config"
import API from '../api'
import { ILoginPayload } from "../store/modules/user"
const axios = require('axios').default;
window.axios = axios
export default {
    name: "Login",
    data()
        {
            return{
                // username:'jimmg35',
                // password:'Jim60308#',
                username:'Bryant',
                password:'HEpHED#d5d',
                logoImg:require('@/assets/logo.png'),
                errmsg:'',
                psw: {
                    show: false,
                },
                href:
                {
                    register: `${process.env.BASE_BACKEND_URL}Identity/Account/Register`,
                    forgotPassword: `${process.env.BASE_BACKEND_URL}Identity/Account/ForgotPassword`
                }
            }
        },
    computed:
        {
            psw_iconType()
            {
                return this.psw.show?
                "visibility_off":
                "visibility"
            },
            psw_inputType()
            {
                return this.psw.show?
                "text":
                "password"
            }
        },
    mounted()
        {
            console.log(this)
            console.log(process.env)
            window.api = API

        },
    methods:
        {
            togglePassword()
            {
                this.psw.show = !this.psw.show
            },
            async handleFormSubmit()
            {
                console.log(this)
                try{
                    let token = await API.User.login({username: this.username, password: this.password})
                    let userInfo = await API.User.validate(token)
                    
                    let payload /** @type {ILoginPayload} */ = {
                        username: this.username,
                        token: token,
                        role: userInfo.UserRole,
                        id: userInfo.UserID
                    }
                    let {username} = await this.$store.dispatch('user/login', payload)
                    this.$cookies.set('vpmc-token', token)
                    this.$cookies.set('vpmc-username', username)
                    this.$router.push(`./${username}/map`)
                }
                catch(err)
                {
                    this.errmsg = `${err.message}`
                    console.log(err)
                }
                
            },
            async handleDevLogin( role )
            {
                let {username} = await this.$store.dispatch('user/login', {
                        username: `${role}`,
                        token: `dev_${role}`,
                        role: role,
                        id: `dev_${role}`
                    })
                this.$router.push(`./${username}/map`)
            }
        }
}
</script>
<style scoped>
.myVideo {
  object-fit: cover;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
}
.login-container{
    padding: 30px;
    border: 1px rgb(187 187 187) solid;
    border-radius: 5px;
    background: rgb(255 255 255 / 90%);
    width: fit-content;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.logo{
    height: 95px;
    justify-content: center;
}
.logo img{
    height: inherit;
}
.login-container input[type="submit"]{
    cursor: pointer;
    
    background: #0072ff;
    color: white;
    border: 1px solid #0072ff;
    padding: 5px;
    border-radius: 3px;
}
.login-container input[type="submit"]:hover{
    background: #0064df;
}

.field input{
    /* padding: 5px 3px;
    width: 100%;
    border: 1px solid white;
    border-radius: 3px;
    transition: 0.5s all; */
    /* -webkit-text-fill-color: black !important; */
}
.field input svg {
    fill: #444;
}
.field label{
    /* -webkit-text-fill-color: var(--md-theme-default-primary); */
}
/* .login-container input:hover{
    border: 1px black solid;
} */

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active  {
    /* -webkit-text-fill-color: #000000; */
    /* -webkit-box-shadow: 0 0 0 1000px rgba(255,255,255,0) inset; */
    /* transition: background-color 5000s ease-in-out 0s; */
}
.errmsg{
    color: red;
}
</style>
<style lang="scss" scoped>
@import "~vue-material/dist/theme/engine"; // Import the theme engine

@include md-register-theme("default", (
  primary: md-get-palette-color(blue, A200), // The primary color of your application
  accent: md-get-palette-color(red, A200), // The accent or secondary color
  theme: light // This can be dark or light
));

@import "~vue-material/dist/theme/all";

#app .field .md-icon.md-theme-default.md-icon-image svg{
    fill: black;
}
</style>