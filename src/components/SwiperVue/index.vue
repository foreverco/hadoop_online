<template>
  <div class="swiper-wrap" id="parent">
    <swiper ref="mySwiper" class="swiper" :options="swiperOption">
      <swiper-slide v-for="(item, index) in imgList" :key="index">
        <div class="imgBox">
          <img :src="item.imgUrl" alt />
        </div>
      </swiper-slide>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>
<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
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
      // activeIndex: 0,
      // nowTem: {},
      swiperOption: {
        slidesPerView: this.swiperConfig.slidesPerView,
        loop: true,
        autoplay: {
          delay: 3500,
          disableOnInteraction: false
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        // pagination: ".swiper-pagination",
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
  @include webkit(box-sizing, border-box);
  width: 100%;
  // height: 600px;
  // background: red;
  position: relative;
  .imgBox {
    img {
      height: 100%;
      width: 100%;
    }
  }
  &:hover {
    .swiper-button-prev,
    .swiper-button-next {
      opacity: 0.5 !important;
    }
  }

  .swiper-button-prev,
  .swiper-button-next {
    opacity: 0;
    z-index: 101;
  }
  // .swiper-pagination {
  //   // background: red;
  //   border: 1px solid red;
  //   width: 500px;
  //   height: 500px;
  //   position: absolute;
  //   z-index: 102;
  //   top: 0;
  //   left: 0;
  // }
}
</style>
