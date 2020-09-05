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
      default: () => {
        return {
          title: ""
        };
      }
    }
  },
  watch: {
    lineconfig: {
      handler(newVal) {
        let series = newVal.keys.map(item => {
          console.log(item);
          return {
            name: item.label,
            type: item.type,
            data: this.result.map(i => i[item.value])
          };
        });
        console.log(newVal);
        let option = {
          title: {
            text: newVal.title,
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
            data: this.result.map(item => item.tjdate),
            axisLabel: {
              rotate: 30,
              fontSize: 15
            }
          },
          yAxis: {},
          series
        };
        console.log(option);
        this.initChart(this.$refs.chart, option, data => {
          this.$emit("echartsClick", data);
        });
      },
      deep: true
    }
  },
  mounted() {}
};
</script>
<style lang="scss">
.econtainer {
  width: 100%;
  height: 100%;
}
</style>
