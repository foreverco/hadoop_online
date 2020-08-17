<template>

  <div class="cropper-component">
    <div class="info-item">
      <div class="operation-box">
        <div class="cropper">
          <vue-cropper
            ref="cropper"
            :img="option.img"
            :outputSize="option.size"
            :outputType="option.outputType"
            :info="option.info"
            :full="option.full"
            :canMove="option.canMove"
            :canMoveBox="option.canMoveBox"
            :original="option.original"
            :autoCrop="option.autoCrop"
            :autoCropWidth="option.autoCropWidth"
            :autoCropHeight="option.autoCropHeight"
            :fixedBox="option.fixedBox"
            @realTime="realTime"
          ></vue-cropper>
        </div>
      </div>
      <div class="preview-box">
        <div :style="previews.div" class="preview">
          <img :src="previews.url" :style="previews.img">
        </div>
      </div>
      <div style="clear: both"></div>
      <div class="btn-box">
        <input type="button" class="operation-btn" value="+" title="放大" @click="changeScale(1)">
        <input type="button" class="operation-btn" value="-" title="缩小" @click="changeScale(-1)">
        <input type="button" class="operation-btn" value="↺" title="左旋转" @click="rotateLeft">
        <input type="button" class="operation-btn" value="↻" title="右旋转" @click="rotateRight">
        <input type="button" class="operation-btn" value="↓" title="下载" @click="down('blob')">
      </div>
    </div>
  </div>
</template>

<script>
    import {VueCropper} from 'vue-cropper'
    export default {
        name: 'CropperComponent',
        props: {
            cropperOption: {
                type: Object,
                default: () => {}
            }
        },
        data() {
            return {
                previews: {},
            }
        },
        computed : {
            option(){
                let opt =
                    {
                        img: '', // 裁剪图片的地址
                        info: true, // 裁剪框的大小信息
                        outputSize: 1, // 剪切后的图片质量（0.1-1）
                        full: true, // 输出原图比例截图 props名full
                        outputType: 'png', // 裁剪生成额图片的格式
                        canMove: true,  // 能否拖动图片
                        original: false,  // 上传图片是否显示原始宽高
                        canMoveBox: true,  // 能否拖动截图框
                        autoCrop: true, // 是否默认生成截图框
                        autoCropWidth: 200,
                        autoCropHeight: 200,
                        fixedBox: false // 截图框固定大小
                    }

                for(let key in this.cropperOption){
                    this.cropperOption[key] ? opt[key] = this.cropperOption[key] : null
                }

                   return opt
            }
        },
        methods: {
            getCropBlob(cb){
                this.$refs.cropper.getCropBlob(cb)
            },
            clearCrop(){
                this.$refs.cropper.clearCrop()
            },
            // 放大/缩小
            changeScale(num) {
                num = num || 1;
                this.$refs.cropper.changeScale(num);
            },
            // 坐旋转
            rotateLeft() {
                this.$refs.cropper.rotateLeft();
            },
            // 右旋转
            rotateRight() {
                this.$refs.cropper.rotateRight();
            },
            // 实时预览函数
            realTime(data) {
                this.previews = data
            },
            // 下载图片
            down(type) {
                let aLink = document.createElement('a')
                aLink.download = 'author-img'
                if (type === 'blob') {
                    this.$refs.cropper.getCropBlob((data) => {
                        this.downImg = window.URL.createObjectURL(data)
                        aLink.href = window.URL.createObjectURL(data)
                        aLink.click()
                    })
                } else {
                    this.$refs.cropper.getCropData((data) => {
                        this.downImg = data;
                        aLink.href = data;
                        aLink.click()
                    })
                }
            }
        },
        components :{
            VueCropper
        }

    }
</script>

<style lang="scss" scoped>
  .cropper-component {
    width: 100%;
    margin: 0 auto;
    position: relative;

    .btn-box {
      margin-top: 30px;
      margin-left: 10%;

      .btn {
        padding: 4px 12px;
        text-align: center;
        border-radius: 4px;
        background-color: #387EF6;
        color: #fff;
        cursor: pointer;
        display: inline-block;
      }

      .operation-btn {
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        background-color: #fff;
        border: 1px solid #eaeaea;
        cursor: pointer;
        display: inline-block;
        font-size: 20px;
        color: #333;
        padding: 0;
        margin: 0 10px;
      }

    }

    .info-item {

      .operation-box {
        float: left;
        margin-left: 10%;

        .cropper {
          width: 260px;
          height: 260px;
        }

      }

      .preview-box {
        float: left;
        margin-left: 10%;

        .preview {
          width: 150px;
          height: 150px;
          border: 1px solid #ccc;
          background-color: #ccc;
          margin: 5px;
          overflow: hidden;
        }

      }
    }
  }
</style>
