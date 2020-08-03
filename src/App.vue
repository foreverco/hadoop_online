<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: "App"
};
</script>
<style lang="scss">
@import "./src/styles/main.scss";
#app {
  background: #e6f7e7;
}
</style>
