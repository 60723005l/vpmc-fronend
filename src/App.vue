<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <VpmcAlert />
    <router-view/>
  </div>
</template>

<script>
import VpmcAlert from './components/basicUI/VpmcAlert.vue'
export default {
  name: 'App',
  components:
    {
      VpmcAlert
    }
}
</script>

<style>
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
body{
  --darkblue: #0e3c63
}
</style>
<style lang="scss">
@import "~vue-material/dist/theme/engine"; // Import the theme engine

@include md-register-theme("default", (
  primary: md-get-palette-color(blue, 800), // The primary color of your application
  accent: md-get-palette-color(red, A200), // The accent or secondary color
  theme: light // This can be dark or light
));
@import "~vue-material/dist/theme/all";
</style>
