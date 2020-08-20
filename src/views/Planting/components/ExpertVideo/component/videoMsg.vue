<template>
  <div class="videoBox lvcontainer">
    <!-- <div class="title">罚款哇哦防控尾崎丰</div> -->
    <div class="playerBox">
      <VideoVue></VideoVue>
    </div>
  </div>
</template>
<script>
import VideoVue from "@/components/video/video.vue";
export default {
  name: "Video",
  components: {
    VideoVue
  }
};
</script>
<style lang='scss'>
.videoBox {
  // border: 1px solid red;
  padding: $boxpadding;
  // height: 800px;
}
</style>
