<template>
  <div class="Personal lvcontainer">
    <PerNav></PerNav>
    <PerMain></PerMain>
  </div>
</template>
<script>
import PerNav from "./components/Nav";
import PerMain from "./components/Main";
export default {
  name: "Personal",
  components: {
    PerNav,
    PerMain
  }
};
</script>
<style lang="scss" scoped>
.Personal {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
