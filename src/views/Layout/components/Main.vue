<template>
  <div class="mainLayout">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: "Main",
  mounted() {
    window.addEventListener("resize", () => {
      console.log(this.$store.state.app.myChart);
      if (
        this.$store.state.app.myChart &&
        this.$store.state.app.myChart.length > 0
      )
        this.$store.state.app.myChart.forEach(item => {
          // console.log(item);
          item.resize();
        });
    });
  },
  watch: {
    $route: {
      handler() {
        this.$store.state.app.myChart = [];
      }
    }
  }
};
</script>
<style lang="scss">
.mainLayout {
  width: 100%;
}
</style>
