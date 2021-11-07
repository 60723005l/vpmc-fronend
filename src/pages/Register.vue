<template>
    <div class="register-container">
        <video autoplay muted restart class="myVideo">
            <source src="/static/domo-vdo.mp4" type="video/mp4">
        </video>
        <form autocomplete="nope">
<!-- prevent browser autocomplete ignore this block------------------ -->
<md-field class="preventer"><label for="username2">帳號</label><md-input name="username2" required></md-input></md-field>
<md-field  class="preventer" :md-toggle-password="false"><label >密碼</label><md-input type="password" ></md-input></md-field>
<!-- ------------------ -->


            <md-field>
                <label for="username">帳號</label>
                <md-input name="username"  v-model="username" required></md-input>
            </md-field>
            <md-field :class="{'md-invalid': psw.errmsg !== ''}" :md-toggle-password="false">
                <label >密碼</label>
                <md-input :type="psw_inputType" autocomplete="off" v-model="password" @input="checkPassword"></md-input>
                <md-button class="md-icon-button" @click="psw.show = !psw.show"><md-icon>{{psw_iconType}}</md-icon></md-button>
                <span class="md-error">{{psw.errmsg}}</span>
            </md-field>
            <md-field :class="{'md-invalid': psw2.errmsg !== ''}">
                <label >再次輸入密碼</label>
                <md-input type="password" v-model="password_2" required @input="checkPassword2"></md-input>
                <span class="md-error">{{psw2.errmsg}}</span>
            </md-field>

            <md-field :class="{'md-invalid':email.errmsg !== ''}">
                <label >E-mail</label>
                <md-input v-model="email.value" required @input="checkEmail"></md-input>
                <span class="md-error">{{email.errmsg}}</span>
            </md-field>
            <md-field>
                <label>電話</label>
                <md-input v-model="phone" required></md-input>
            </md-field>
            <div v-if="errmsg !== ''">
                <span class="error">{{errmsg}}</span>
            </div>
                
            <md-card-actions>
                <md-button class="md-primary md-raised vpmc-md" @click="handleRegister">註冊</md-button>
            </md-card-actions>
        </form>
    </div>
</template>
<script>
import api from "../api"
import { validate } from "../utilities"

export default {
    name: "Register",
    data: () => ({
        username: "",
        password: "",
        password_2: "",
        email: {
            value: "",
            errmsg: ''
        },
        phone: null,
        psw: { show: false, inputType: 'text', errmsg: '' },
        psw2: { show: false, inputType: 'text', errmsg: '' },
        errmsg: ""
    }),
    mounted()
        {
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
            },
            
        },
    methods:
        {
            validateForm()
            {
                if (
                    (this.password !== null && this.password !== "") &&
                    this.checkPassword() &&
                    this.checkPassword2() &&
                    this.checkEmail() &&
                    (this.phone !== null && this.phone !== "")
                ) {
                    this.errmsg = ''
                    return true
                } else {
                    this.errmsg = '未輸入完全'
                    return false
                }
            },
            checkPassword()
            {
                if( validate.isPassword( this.password )) {
                    this.psw.errmsg = ''
                    return true
                } else {
                    this.psw.errmsg = 'invalid password'
                    return false
                }
            },
            checkPassword2()
            {
                if( this.password_2 === this.password ) {
                    this.psw2.errmsg = ''
                    return true
                } else {
                    this.psw2.errmsg = 'different password'
                    return false
                }
            },
            checkEmail()
            {
                if( validate.isEmail( this.email.value )) {
                    this.email.errmsg = ''
                    return true
                } else {
                    this.email.errmsg = 'invalid email'
                    return false
                }
            },
            async handleRegister()
            {
                if ( this.validateForm() ) {
                    try{
                        await api.User.register({
                            username: this.username,
                            password: this.password,
                            email: this.email.value,
                            phoneNumber: this.phone
                        })
                        this.$router.push({name: 'Login'})
                    } catch ( error ) {
                        this.errmsg = error.message
                    }
                }
                
            },
        }
}
</script>
<style lang="scss" scoped>
@import "~vue-material/dist/theme/engine"; // Import the theme engine

@include md-register-theme("default", (
  primary: md-get-palette-color(blue, A200), // The primary color of your application
  accent: md-get-palette-color(red, A200), // The accent or secondary color
  theme: light // This can be dark or light
));

@import "~vue-material/dist/theme/all";

.register-container{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    form{
        padding: 15px;
        background: #ffffffed;
        margin: 15px;
        min-width: 300px;
        z-index: 1;
        .preventer{
            position: fixed;
            top: -10000px;
            left: 0px;
        }
        .error{
            color: var(--md-theme-default-fieldvariant, #ff1744)
        }
    }
}
.myVideo {
  object-fit: cover;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
}
</style>