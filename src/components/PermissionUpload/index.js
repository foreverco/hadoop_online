/*
* 大屏系统上传文件控件
* 在原有el-upload 基础上增加以下功能：
*   1、按钮授权功能
*     在 permission 参数添加权限标识符，多个用“,”分割；有该权限按钮显示，反之隐藏。不添加任何权限默认显示按钮。
*   2、图片剪切功能
*     添加 cropper 参数启用图片剪切功能。
*     添加 cropperOption 参数，可修改剪切框属性，修改内容具体查看官网：
*     https://github.com/xyxiao001/vue-cropper
*
*
* */
import PerUpload from "./PerUpload";
export default PerUpload
