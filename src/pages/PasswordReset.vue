<template>
  <div class="register-container">
    <video autoplay muted restart class="myVideo" loop>
      <source :src="require('@/assets/demo-vid-sm.mp4')" type="video/mp4" />
    </video>
    <form autocomplete="nope">
      <!-- prevent browser autocomplete ignore this block------------------ -->
      <md-field :class="{ 'md-invalid': email.errmsg !== '' }">
        <label>E-mail</label>
        <md-input v-model="email.value" required @input="checkEmail"></md-input>
        <span class="md-error">{{ email.errmsg }}</span>
      </md-field>

      <md-field>
        <label>暫時密碼</label>
        <md-input autocomplete="off" v-model="tempPassword"></md-input>
      </md-field>

      <md-field
        :class="{ 'md-invalid': psw.errmsg !== '' }"
        :md-toggle-password="false"
      >
        <label>新密碼</label>
        <md-input
          :type="psw_inputType"
          autocomplete="off"
          v-model="password"
          @input="checkPassword"
        ></md-input>
        <md-button class="md-icon-button" @click="psw.show = !psw.show"
          ><md-icon>{{ psw_iconType }}</md-icon></md-button
        >
        <span class="md-error">{{ psw.errmsg }}</span>
        <span class="vpmc-helper-text" v-if="password_hint_show === true">
          至少8個字元，混合大小寫英文、數字及符號
        </span>
      </md-field>

      <md-field :class="{ 'md-invalid': psw2.errmsg !== '' }">
        <label>再次輸入密碼</label>
        <md-input
          type="password"
          v-model="password_2"
          required
          @input="checkPassword2"
        ></md-input>
        <span class="md-error">{{ psw2.errmsg }}</span>
      </md-field>

      <div v-if="errmsg !== ''">
        <span class="error">{{ errmsg }}</span>
      </div>

      <md-card-actions>
        <md-button class="md-primary md-raised vpmc-md" @click="handleRegister"
          >重新設置密碼</md-button
        >
      </md-card-actions>
    </form>
  </div>
</template>
<script>
import api from "../api";
import { validate } from "../utilities";

export default {
  name: "PasswordReset",
  data: () => ({
    username: "",
    tempPassword: "",
    password: "",
    password_2: "",
    password_hint_show: true,
    email: {
      value: "",
      errmsg: "",
    },
    phone: null,
    psw: { show: false, inputType: "text", errmsg: "" },
    psw2: { show: false, inputType: "text", errmsg: "" },
    errmsg: "",
  }),
  mounted() {},
  computed: {
    psw_iconType() {
      return this.psw.show ? "visibility_off" : "visibility";
    },
    psw_inputType() {
      return this.psw.show ? "text" : "password";
    },
  },
  methods: {
    validateForm() {
      if (
        this.password !== null &&
        this.password !== "" &&
        this.checkPassword() &&
        this.checkPassword2() &&
        this.checkEmail() &&
        this.phone !== null &&
        this.phone !== ""
      ) {
        this.errmsg = "";
        return true;
      } else {
        this.errmsg = "未輸入完全";
        return false;
      }
    },
    checkPassword() {
      if (validate.isPassword(this.password)) {
        this.psw.errmsg = "此密碼可用";
        return true;
      } else {
        this.password_hint_show = false;
        this.psw.errmsg = "無效的密碼";
        return false;
      }
    },
    checkPassword2() {
      if (this.password_2 === this.password) {
        this.psw2.errmsg = "";
        return true;
      } else {
        this.psw2.errmsg = "密碼不相同";
        return false;
      }
    },
    checkEmail() {
      if (validate.isEmail(this.email.value)) {
        this.email.errmsg = "";
        return true;
      } else {
        this.email.errmsg = "無效的電子信箱";
        return false;
      }
    },
    async handleRegister() {
      this.errmsg = "請求發送中...";
      const response = await api.User.resetPassword({
        email: this.email.value,
        originalPassword: this.tempPassword,
        newPassword: this.password,
      });
      if (response === undefined) {
        this.errmsg = "伺服器錯誤，請聯繫Server team";
        return
      }
      const responseContent = await response.json();
      if (response.status === 200) {
        this.errmsg = `密碼重設成功，5秒後跳轉至登入頁面`;
        setTimeout(() => {
          this.$router.push({ name: "Login" });
        }, 5000);
      } else {
        this.errmsg = `${responseContent.status}`;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~vue-material/dist/theme/engine"; // Import the theme engine

@include md-register-theme(
  "default",
  (
    primary: md-get-palette-color(blue, A200),
    // The primary color of your applicatio
    accent: md-get-palette-color(red, A200),
    // The accent or secondary colo
    theme: light // This can be dark or ligh,,,,,,,,,,,,,,,,,,,,,,,,,,,,
  )
);

@import "~vue-material/dist/theme/all";

.register-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  form {
    padding: 15px;
    background: #ffffffed;
    margin: 15px;
    min-width: 300px;
    z-index: 1;
    .preventer {
      position: fixed;
      top: -10000px;
      left: 0px;
    }
    .error {
      color: var(--md-theme-default-fieldvariant, #ff1744);
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