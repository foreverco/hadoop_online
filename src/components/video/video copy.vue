<template>
  <div class="demo">
    <video-player
      class="video-player vjs-custom-skin radio"
      ref="videoPlayer"
      :playsinline="true"
      :options="playerOptions"
      @play="onPlayerPlay($event)"
      @ended="onPlayerEnded($event)"
    ></video-player>
    <!-- <div class="discover">化德县大棚A2玻璃温室</div> -->
  </div>
</template>

<script type="text/ecmascript-6">
import { playVideo } from "../../api/home";
export default {
  props: {
    isloop: {
      type: Boolean,
      defalt: () => {
        return true;
      }
    },
    isauto: {
      type: Boolean,
      defalt: () => {
        return true;
      }
    },
    videoCode: {
      type: Object,
      defalt: {}
    },
    videoclose: {
      type :Boolean,
      default:false
    }
  },
  data() {
    return {
      playerOptions: {
        //播放速度
        playbackRates: [0.5, 1.0, 1.5, 2.0],
        //如果true,浏览器准备好时开始回放。
        autoplay: true,
        // 默认情况下将会消除任何音频。
        muted: false,
        // 导致视频一结束就重新开始。
        loop: false,
        // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        preload: "auto",
        language: "zh-CN",
        // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        aspectRatio: "16:9",
        // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        fluid: true,
        sources: [
          {
            //类型
            type: "video/ogg",
            // type:"video/mp4",
            // src: "http://vjs.zencdn.net/v/oceans.mp4"
            src: ""
            // src: 'http://192.168.1.163:15580/34020000001320000005'
          }
        ],
        // techOrder: ['flash'],
        //你的封面地址
        poster: "./img/image-2.png",
        //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        // notSupportedMessage: '此视频暂无法播放，请稍后再试',
        notSupportedMessage: "请先选择一个区域",
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          //全屏按钮
          fullscreenToggle: true
        }
      },
      isvideoend: true
    };
  },
  watch: {
    isvideoend: function() {
      this.$emit("getend", this.isvideoend);
      // console.log(this.isvideoend);
    },
    isloop: function(val) {
      // console.log(val);
    },
    largeAreasId: function(val) {
      alert(val);
    },
    videoCode: function(oldValue, newVal) {
      console.log(this.videoCode);
      console.log(this.videoCode.videoCode);
      if (this.videoCode) {
        playVideo("live", this.videoCode.videoCode).then(res => {
          // console.log(this.videoCode.videoCode + "开始播放");
          let videoUrl = res.data.data;
          // console.log(this.playerOptions.sources[0].src)
          this.playerOptions.sources[0].src = videoUrl;
          // this.player()
        });
      }
    },
    videoclose:function(newVal,oldVal){
        if(newVal == false){
          // console.log(55555555555555);
          // console.log(newVal);
          // console.log(this.videoCode);
        // playVideo("bye", this.videoCode.videoCode);
      }
    }
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player;
    },
    videoUrl() {
      return this.$refs.videoPlayer.player;
    }
  },
  mounted() {
    // console.log(this.videoCode.videoCode);
          if (this.videoCode.videoCode) {
        playVideo("live", this.videoCode.videoCode).then(res => {
          // console.log(this.videoCode.videoCode + "开始播放");
          let videoUrl = res.data.data;
          // console.log(this.playerOptions.sources[0].src)
          this.playerOptions.sources[0].src = videoUrl;
        });
    // this.player();
      }
    this.playerOptions.loop = this.isloop;
  },
  methods: {
    onPlayerPlay(player) {
      // console.log("player player", player);
      // console.log(this.playerOptions.sources[0].src);
      // console.log(this.videoCode.videoCode);
    },
    onPlayerEnded(player) {
      this.isvideoend = false;
      playVideo("bye", this.videoCode.videoCode);
      // console.log("stop");
    },
    resetVideo() {
      this.playerOptions.sources[0].src = "";
    }
  }
};
</script>

<style lang="scss" scoped>
.demo {
  position: relative;
}
.radio {
  border-radius: 6px;
}
.discover {
  color: #fff;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 6px;
  position: absolute;
  // width: 100%;
  bottom: 5%;
  z-index: 1001;
}
::v-deep .vjs-control-bar {
  // border: 1px solid red;
  // height: 10%;
  display: flex;
  justify-content: space-between;
}
::v-deep .vjs-control-bar > div,
::v-deep .vjs-control-bar > button {
  flex: 1;
  // border: 1px solid green;
  font-size: 12px;
}
</style>
