<template>
  <div style="width: 100vw; height: 100vh; overflow: hidden">
    <video autoplay muted restart class="myVideo" loop>
      <source :src="require('@/assets/demo-vid-sm.mp4')" type="video/mp4" />
    </video>
    <div class="login-container col" autocomplete="off">
      <div class="logo row">
        <img :src="logoImg" />
      </div>
      <div class="form">
        <md-field class="field">
          <label for="email">E-mail</label>
          <md-input type="text" id="email" v-model="email"></md-input>
          <!-- <span class="vpmc-helper-text">請輸入6-20碼英/數混合字元</span> -->
        </md-field>
        <md-field class="field" :md-toggle-password="false">
          <label for="password">密碼</label>
          <md-input
            :type="psw_inputType"
            id="password"
            class=""
            v-model="password"
          ></md-input>
          <md-button class="md-icon-button" @click="togglePassword"
            ><md-icon>{{ psw_iconType }}</md-icon></md-button
          >
          <!-- <span class="vpmc-helper-text">
            至少8個字元，混合大小寫英文、數字及符號
          </span> -->
        </md-field>
        <div class="errmsg">
          <span>{{ errmsg }}</span>
        </div>
        <md-card-actions>
          <md-button
            class="md-primary md-raised vpmc-md"
            @click="handleDevLogin('訪客')"
            >訪客登入</md-button
          >
          <md-button
            class="md-primary md-raised vpmc-md"
            @click="handleFormSubmit"
            >登入</md-button
          >
        </md-card-actions>
        <div>
          <!-- <p><input type="submit" value="登入"></p> -->
          <!-- <p><button @click="handleDevLogin('Admin')">DEV_Admin</button></p> -->
          <!-- <p><md-button @click="handleDevLogin('Anymouse')">DEV_Anymouse</md-button></p> -->
        </div>
        <div>
          <router-link :to="{ name: 'Register' }">註冊</router-link>
          <router-link :to="{ name: 'ForgetPassword' }">忘記密碼</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import config from "../../config";
import API from "../api";
import Global from "../global";
import { ILoginPayload } from "../store/modules/user";
const axios = require("axios").default;
window.axios = axios;
export default {
  name: "Login",
  data() {
    return {
      // username:'jimmg35',
      // password:'Jim60308#',
      email: "",
      password: "",
      logoImg: require("@/assets/logo.png"),
      errmsg: "",
      psw: {
        show: false,
      },
      href: {
        register: `${process.env.BASE_BACKEND_URL}Identity/Account/Register`,
        forgotPassword: `${process.env.BASE_BACKEND_URL}Identity/Account/ForgotPassword`,
      },
    };
  },
  computed: {
    psw_iconType() {
      return this.psw.show ? "visibility_off" : "visibility";
    },
    psw_inputType() {
      return this.psw.show ? "text" : "password";
    },
  },
  mounted() {
    window.api = API;
  },
  methods: {
    togglePassword() {
      this.psw.show = !this.psw.show;
    },
    async handleFormSubmit() {
      //   try {
      this.errmsg = "請求發送中...";
      const response = await API.User.login({
        email: this.email,
        password: this.password,
      });
      if (response === undefined) {
        this.errmsg = "伺服器錯誤，請聯繫Server team";
        return;
      }
      const responseContent = await response.json();
      if (response.status === 200) {
        const token = responseContent.token;
        const responsePayload = (
          await (await API.User.validate(responseContent.token)).json()
        ).payload;
        const payload = {
          _userId: responsePayload._userId,
          username: responsePayload.username,
          email: responsePayload.email,
          token: token,
          role: responsePayload.roles[0].id,
        };
        let { username } = await this.$store.dispatch("user/login", payload);
        localStorage.setItem("token", token);
        localStorage.setItem("username", responsePayload.username);
        this.$cookies.set("token", token);
        this.$cookies.set("username", responsePayload.username);
        // this.$cookies.set("vpmc-token", token);
        // this.$cookies.set("vpmc-username", responsePayload.username);
        this.$router.push(`./${responsePayload.username}/map`);
        this.addCountdownEvent();
      } else {
        this.errmsg = `${responseContent.status}`;
      }
    },
    async handleDevLogin(role) {
      let { username } = await this.$store.dispatch("user/login", {
        username: `${role}`,
        token: `dev_${role}`,
        role: role,
        id: `dev_${role}`,
      });
      this.addCountdownEvent();
      this.$router.push(`./${username}/map`);
    },
    addCountdownEvent() {
      let timeoutId = null;
      const TIME = 2 * 60 * 60;
      const handleTimeout = () => {
        this.$bus.$emit("alert:message", {
          title: "登出通知",
          text: `系統閒置超過 ${TIME / 60 / 60} 小時，跳轉登入頁面`,
          confirm: () => this.$router.push({ name: "Login" }),
        });
      };
      timeoutId = Global.VPMC.addCountdownTask(handleTimeout, TIME);
      document.body.addEventListener("click", () => {
        Global.VPMC.removeCountdownTask(timeoutId);
        timeoutId = Global.VPMC.addCountdownTask(handleTimeout, TIME);
      });
    },
  },
};
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
.login-container {
  padding: 30px;
  border-width: 1px;
  border-style: solid;
  border-color: #444;
  background-color: rgb(255, 255, 255);
  width: fit-content;
  position: absolute;
  top: 50%;
  left: 80%;
  transform: translate(-80%, -50%);
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.logo {
  height: 95px;
  justify-content: center;
}
.logo img {
  height: inherit;
}
.login-container input[type="submit"] {
  cursor: pointer;

  background: #0072ff;
  color: white;
  border: 1px solid #0072ff;
  padding: 5px;
  border-radius: 3px;
}
.login-container input[type="submit"]:hover {
  background: #0064df;
}

.field input {
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
.field label {
  /* -webkit-text-fill-color: var(--md-theme-default-primary); */
}
/* .login-container input:hover{
    border: 1px black solid;
} */

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  /* -webkit-text-fill-color: #000000; */
  /* -webkit-box-shadow: 0 0 0 1000px rgba(255,255,255,0) inset; */
  /* transition: background-color 5000s ease-in-out 0s; */
}
.errmsg {
  color: red;
}
</style>

<style lang="scss" scoped>
@import "~vue-material/dist/theme/engine"; // Import the theme engine

@include md-register-theme(
  "default",
  (
    primary: md-get-palette-color(blue, A200),
    // The primary color of your applicatio
    accent: md-get-palette-color(red, A200),
    // The accent or secondary colo
    theme: light
      // This can be dark or ligh,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
  )
);

@import "~vue-material/dist/theme/all";

#app .field .md-icon.md-theme-default.md-icon-image svg {
  fill: black;
}
</style>