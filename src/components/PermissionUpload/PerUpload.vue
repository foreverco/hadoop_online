<template>
  <div>
    <el-upload
      ref="upload"
      :on-exceed="onExceed"
      :limit="limit"
      :disabled="disabled"
      :http-request="httpRequest"
      :list-type="listType"
      :auto-upload="uploadAuto"
      :file-list="fileList"
      :on-error="onErrorHandler"
      :on-progress="onProgress"
      :on-success="onSuccessHandler"
      :on-preview="onPreview"
      :on-change="onChangeBefore"
      :on-remove="onRemove"
      :before-remove="beforeRemove"
      :before-upload="beforeUpload"
      :type="type"
      :accept="accept"
      :show-file-list="showFileList"
      :with-credentials="withCredentials"
      :dragger="dragger"
      :drag="drag"
      :name="name"
      :multiple="multiple"
      :data="data"
      :headers="headers"
      :action="proxyAction"
    >
      <slot></slot>
    </el-upload>

    <el-dialog
      title="图片剪裁"
      v-if="cropper"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      :visible.sync="dialogVisible"
      append-to-body
    >
      <div>
        <cropper-component ref="cropper" :cropper-option="cropperOption" />
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cropperCancel" :loading="dialogLoading"
          >取 消</el-button
        >
        <el-button
          type="primary"
          @click="cropperCommit"
          :loading="dialogLoading"
          >确认</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import CropperComponent from "./CropperComponent";
import Config from "@/util/baseApi";

function noop() {}

export default {
  name: "index",
  props: {
    cropper: {
      type: Boolean,
      default: false
    },
    cropperOption: {
      type: Object,
      default: function() {
        return {};
      }
    },
    permission: {
      type: String,
      default: ""
    },
    action: {
      type: String,
      required: true
    },
    headers: {
      type: Object,
      default() {
        return {};
      }
    },
    data: Object,
    multiple: Boolean,
    name: {
      type: String,
      default: "file"
    },
    drag: Boolean,
    dragger: Boolean,
    withCredentials: Boolean,
    showFileList: {
      type: Boolean,
      default: true
    },
    accept: String,
    type: {
      type: String,
      default: "select"
    },
    beforeUpload: Function,
    beforeRemove: Function,
    onRemove: {
      type: Function,
      default: noop
    },
    onChange: {
      type: Function,
      default: noop
    },
    onPreview: {
      type: Function
    },
    onSuccess: {
      type: Function,
      default: noop
    },
    onProgress: {
      type: Function,
      default: noop
    },
    onError: {
      type: Function,
      default: noop
    },
    fileList: {
      type: Array,
      default() {
        return [];
      }
    },
    listType: {
      type: String,
      default: "text" // text,picture,picture-card
    },
    httpRequest: Function,
    disabled: Boolean,
    limit: Number,
    onExceed: {
      type: Function,
      default: noop
    }
  },
  data() {
    return {
      nowFile: {},
      proxyAction: "",
      dialogLoading: false,
      dialogVisible: false
    };
  },
  computed: {
    token() {
      return this.$store.state.app.token;
    },
    //判断是否自动上传
    uploadAuto() {
      return this.cropper ? false : true;
    }
  },
  watch: {
    headers(val) {
      this.addAuthorizationHeader(val);
    },
    action(val) {
      this.proxyAction = Config.proxy.default + val;
    }
  },
  methods: {
    //上传图片
    cropperCommit() {
      this.$refs.cropper.getCropBlob(data => {
        this.Blog2File(data);

        this.$refs.upload.submit();

        /* let formData = new FormData()
                     formData.append('file', this.nowFile.raw)

                     this.$axios(this.action,formData,this.METHOD.POST,{headers:this.headers})
                         .then(res => {

                             if(this.onSuccess){
                                 this.onSuccess(res,this.nowFile,this.$refs.upload.uploadFiles)
                             }
                             this.dialogLoading = false
                             this.dialogVisible = false
                         } , err => {
                             this.nowFile.status = 'fail'
                             if(this.onError){
                                 this.onError(err,this.nowFile,this.$refs.upload.uploadFiles)
                             }
                             this.dialogLoading = false
                         })*/
      });
    },
    Blog2File(blob) {
      let file = new File([blob], this.nowFile.name);
      file.uid = this.nowFile.uid;
      this.nowFile.raw = file;
      this.nowFile.size = file.size;
    },
    //剪切取消
    cropperCancel() {
      this.$refs.upload.uploadFiles.splice(
        this.$refs.upload.uploadFiles.length - 1,
        1
      );
      this.$refs.cropper.clearCrop();
      this.dialogVisible = false;
    },
    //判断是否显示剪切面板
    onChangeBefore(file, fileList) {
      //执行图片截图
      if (this.cropper && file.status === "ready") {
        this.nowFile = file;
        if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(file.name)) {
          this.$message.error("上传内容未识别");
          return false;
        }
        // 将图片地址赋值给裁剪框显示图片
        this.$nextTick(() => {
          this.$set(
            this.cropperOption,
            "img",
            window.URL.createObjectURL(file.raw)
          );

          this.dialogVisible = true;
        });
      }
      this.onChange(file, fileList);
    },
    //上传成功处理
    onSuccessHandler(response, file, fileList) {
      this.onSuccess(response, file, fileList);
      if (this.cropper) {
        this.$refs.cropper.clearCrop();
        this.dialogLoading = false;
        this.dialogVisible = false;
      }
    },
    //上传错误处理
    onErrorHandler(err, file, fileList) {
      if (this.cropper) this.dialogLoading = false;
      this.onError(err, file, fileList);
    },
    //请求头部添加token信息
    addAuthorizationHeader(val) {
      console.log(val);
      if (this.token) {
        val.Authorization = this.token;
      }
    }
    // assertHasPermission() {
    //   if (this.permission) {
    //     this.hasPermission = false;

    //     let pers = this.permission.split(",");

    //     for (let per of pers) {
    //       let hasP = perUtil.decisionHasPermission(
    //         `${this.$route.name}:${per}`
    //       );
    //       if (hasP) {
    //         this.hasPermission = true;
    //         return;
    //       }
    //     }
    //   }
    // }
  },
  created() {
    this.proxyAction = Config.proxy.default + this.action;
    // this.assertHasPermission();
    this.addAuthorizationHeader(this.headers);
  },
  components: {
    CropperComponent
  }
};
</script>

<style lang="scss">
.el-upload {
}
</style>
