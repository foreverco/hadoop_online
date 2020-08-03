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
<style lang="scss">
.Personal {
  display: flex;
  margin-top: 40px;
}
</style>
