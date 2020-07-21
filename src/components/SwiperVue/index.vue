<template>
  <div class="swiper-wrap">
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide v-for="(item, index) in imgList" :key="index">
        <div class="imgBox">
          <img :src="item.imgUrl" alt>
        </div>
      </swiper-slide>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
  </div>
</template>
<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/swiper-bundle.css";
export default {
  name: "swiper-example-navigation",
  title: "Navigation",
  components: {
    Swiper,
    SwiperSlide
  },
  props: {
    imgList: {
      type: Array,
      default: () => []
    },
    swiperConfig: {
      type: Object,
      default: () => {}
    }
  },
  watch: {},
  data() {
    return {
      activeIndex: 0,
      nowTem: {},
      // echartsTem: {},
      swiperOption: {
        slidesPerView: this.swiperConfig.slidesPerView,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      }
    };
  },
  methods: {}
};
</script>

<style lang="scss">
.swiper-wrap {
  // border: 1px solid red;
  @include webkit(box-sizing, border-box);
  width: 100%;
  // padding: 0 10px;
  .imgBox {
    // border: 1px solid red;
    // height: 500px;
    img {
      height: 100%;
      width: 100%;
    }
  }
  &:hover {
    .swiper-button-prev,
    .swiper-button-next {
      // background: red;
      opacity: 0.5 !important;
    }
  }

  .swiper-button-prev,
  .swiper-button-next {
    // background: red;
    opacity: 0;
    z-index: 101;
  }
}
</style>
