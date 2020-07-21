<template>
  <div class="Insect">
    <LineEchartsVue
      :result="lineData"
      :lineconfig="lineconfig"
    ></LineEchartsVue>
  </div>
</template>
<script>
export default {
  name: "Insect",
  data() {
    return {
      lineconfig: {
        title: "收支情况",
        // type: "bar",
        keys: [
          {
            label: "收入",
            value: "sr",
            type: "bar"
          },
          {
            label: "支出",
            value: "zc",
            type: "line"
          }
        ]
      },
      lineData: [
        {
          date: "2020-01",
          sr: 100,
          zc: 120
        },
        {
          date: "2020-02",
          sr: 150,
          zc: 140
        },
        {
          date: "2020-03",
          sr: 180,
          zc: 110
        },
        {
          date: "2020-04",
          sr: 190,
          zc: 160
        },
        {
          date: "2020-05",
          sr: 120,
          zc: 160
        }
      ]
    };
  }
};
</script>
<style lang="scss">
.Insect {
  height: 500px;
  width: 100%;
}
</style>
