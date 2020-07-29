<template>
  <div id="main" class="econtainer" ref="chart"></div>
</template>
<script>
export default {
  name: "LineChart",
  props: {
    result: {
      type: Array,
      default: () => []
    },
    lineconfig: {
      type: Object,
      default: () => {}
    }
  },
  mounted() {
    let series = this.lineconfig.keys.map(item => {
      console.log(item);
      return {
        name: item.label,
        type: item.type,
        data: this.result.map(i => i[item.value])
      };
    });
    // console.log(series);
    let option = {
      title: {
        text: this.lineconfig.title,
        left: "center",
        subText: "lvwm"
      },
      legend: {
        right: "20",
        formatter: "2020{name}"
      },
      tooltip: {
        trigger: "axis"
      },
      // color: ["red", "blue", "yellow"],
      xAxis: {
        data: this.result.map(item => item.date),
        axisLabel: {
          rotate: 30,
          fontSize: 15
        }
      },
      yAxis: {},
      series
    };
    this.initChart(this.$refs.chart, option, function(data) {
      console.log(data);
    });
  }
};
</script>
<style lang="scss">
.econtainer {
  width: 100%;
  height: 100%;
}
</style>
