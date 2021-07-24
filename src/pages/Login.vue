<template>
    <div style="width: 100vw;height: 100vh;overflow: hidden;">
        <video autoplay muted restart style="width: 100vw;">
            <source src="/static/domo-vdo.mp4" type="video/mp4">
        </video>
        <form class="login-container col" autocomplete="off" v-on:submit.prevent="handleFormSubmit">
            <div class="logo row">
                <img :src="logoImg">
            </div>
            <div class="form" v-on:submit.prevent="handleFormSubmit">
                <div>
                    <p>帳號:</p>
                    <input type="text" name="username" v-model="username">
                </div>
                <div>
                    <p>密碼:</p>
                    <p><input type="password" name="password" v-model="password"></p>
                </div>
                <div>
                    <p><input type="submit" value="登入"></p>
                </div>
                <div>
                    <a href="https://localhost:44367/Identity/Account/Register">註冊</a>
                    <a href="https://localhost:44367/Identity/Account/ForgotPassword">忘記密碼</a>
                </div>
                
            </div>
        </form>
    </div>
    
</template>
<script>
// import API from '../api'
const axios = require('axios').default;
export default {
    name: "Login",
    data()
        {
            return{
                username:'jimmg35',
                password:'Jim60308#',
                logoImg:require('@/assets/logo.png')
            }
        },
    mounted()
        {
            console.log(axios)
        },
    methods:
        {
            async handleFormSubmit()
            {
                console.log(this)
                try{
                    let {token, username} = await this.$store.dispatch('user/login', {
                        username: this.username,
                        password: this.password
                    })
                    localStorage.setItem('vpmc-token',token)
                    this.$router.push(`./${username}/map`)
                }
                catch(err)
                {
                    console.log(err)
                }
                
            }
        }
}
</script>
<style scoped>
.login-container{
    padding: 30px;
    border: 1px rgb(187 187 187) solid;
    border-radius: 5px;
    background: rgb(255 255 255 / 75%);
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

.login-container input{
    padding: 5px 3px;
    width: 100%;
    border: 1px solid white;
    border-radius: 3px;
    transition: 0.5s all;
}
.login-container input:hover{
    border: 1px black solid;
}

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active  {
      -webkit-text-fill-color: #000000;
      -webkit-box-shadow: 0 0 0 1000px rgba(255,255,255,0) inset;
      /* transition: background-color 5000s ease-in-out 0s; */
  }
</style>