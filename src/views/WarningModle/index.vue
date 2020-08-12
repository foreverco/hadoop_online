<template>
  <div class="WarningModleBox lvallcontainer">
    <MapBox></MapBox>
    <div class="lvcontainer botBox">
      <searchBox></searchBox>
      <TableBox></TableBox>
    </div>
  </div>
</template>

<script>
import MapBox from "./components/mapBox";
import searchBox from "./components/searchBox";
import TableBox from "./components/tableBox";
export default {
  name: "WarningModle",
  components: {
    MapBox,
    searchBox,
    TableBox
  }
};
</script>

<style lang="scss" scoped>
.WarningModleBox {
  // margin-top: 40px;
  margin-bottom: 35px;
  .botBox {
    display: flex;
    justify-content: space-between;
    margin-top: 22px;
  }
}
</style>
