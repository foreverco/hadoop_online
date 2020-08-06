<template>
  <div class="indexView">
    <NavVue></NavVue>
    <MainVue></MainVue>
    <FooterVue></FooterVue>
  </div>
</template>
<script>
import NavVue from "./components/Nav";
import MainVue from "./components/Main";
import FooterVue from "./components/Footer";
export default {
  name: "Layout",
  components: {
    NavVue,
    MainVue,
    FooterVue
  }
};
</script>
<style lang="scss">
.indexView {
  position: relative;
}
</style>
