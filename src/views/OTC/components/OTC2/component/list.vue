<template>
  <div class="lvcontainer applyListBox">
    <div class="checkBox">
      <div class="zmBox">
        <p>品种:</p>
        <ul>
          <li
            @click="getOneZm(item.name)"
            v-for="(item, index) in zmList"
            :class="{ isactive: item.name == OneZm }"
            :key="index"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
      <div class="zmBox" v-if="OneZm">
        <p></p>
        <ul>
          <li
            v-for="(item, index) in zmList"
            :key="index"
            :class="{ isactive: OneZm + item.name == TwoZm }"
            @click="getTwoZm(item.name)"
          >
            {{ `${OneZm}${item.name}` }}
          </li>
        </ul>
      </div>
      <div class="zmBox" v-if="OneZm || TwoZm">
        <p></p>
        <ul>
          <li
            v-for="(item, index) in drugList"
            :key="index"
            :class="{ isactive: item.id == checkForm.medicineId }"
            @click="getmedicineId(item)"
          >
            {{ item.medinceName }}
          </li>
        </ul>
      </div>
      <div class="btnBox">
        <p>搜索:</p>
        <div class="headSearch">
          <el-input
            v-model="inputdrugName"
            placeholder="请输入关键字"
          ></el-input>
          <el-button type="success" @click="serachDrug">搜索</el-button>
        </div>
      </div>
      <div class="areaBox" :class="{ h40: areaActive }">
        <p>产地:</p>
        <ul>
          <li
            v-for="(item, index) in cdareaList"
            :key="index"
            :class="{ isactive: item.provinceId == checkForm.orginProvinceId }"
            @click="changeareaactive(item.provinceId)"
          >
            {{ item.province }}
          </li>
        </ul>
        <i
          :class="areaActive ? 'el-icon-caret-bottom' : 'el-icon-caret-top'"
          @click="areaActive = !areaActive"
        ></i>
      </div>
      <div class="areaBox" :class="{ h40: ckActive }">
        <p>仓库:</p>
        <ul>
          <li
            v-for="(item, index) in cdareaList"
            :key="index"
            :class="{
              isactive: item.provinceId == checkForm.deliveryProvinceId
            }"
            @click="changeckareaactive(item.provinceId)"
          >
            {{ item.province }}
          </li>
        </ul>
        <i
          :class="ckActive ? 'el-icon-caret-bottom' : 'el-icon-caret-top'"
          @click="ckActive = !ckActive"
        ></i>
      </div>
      <div class="radioBox">
        <p>质量:</p>
        <el-radio-group v-model="checkForm.qualityStandard">
          <el-radio
            v-for="(item, index) in radioList"
            :key="index"
            :label="item.value"
            >{{ item.name }}</el-radio
          >
        </el-radio-group>
      </div>
      <div class="isselBox">
        <p>已选:</p>
        <ul>
          <li v-if="checkForm.medicineId || checkForm.medicineName">
            <span>品种</span>
            <span>|</span>
            <span>{{
              (drugTypeCheck.length > 0 && drugTypeCheck[0].medinceName) ||
                checkForm.medicineName
            }}</span>
            <span>|</span>
            <i class="el-icon-close" @click="deldrugType"></i>
          </li>
          <li v-if="areaCheck && areaCheck.length > 0">
            <span>产地</span>
            <span>|</span>
            <span>{{ areaCheck[0].province }}</span>
            <span>|</span>
            <i class="el-icon-close" @click="delareaactive"></i>
          </li>
          <li v-if="ckareaCheck && ckareaCheck.length > 0">
            <span>仓库</span>
            <span>|</span>
            <span>{{ ckareaCheck[0].province }}</span>
            <span>|</span>
            <i class="el-icon-close" @click="delckareaactive"></i>
          </li>
          <li v-if="checkForm.qualityStandard">
            <span>质量</span>
            <span>|</span>
            <span>{{ radiocheck[0].name }}</span>
            <span>|</span>
            <i
              class="el-icon-close"
              @click="checkForm.qualityStandard = ''"
            ></i>
          </li>
          <li class="gotoBtnBox">
            <el-button type="success">发布求购信息</el-button>
            <el-button>发布供应信息</el-button>
          </li>
        </ul>
      </div>
    </div>

    <div class="applylist">
      <ul class="applylistAll">
        <li
          v-for="(item, index) in records"
          :key="index"
          @click="gotobuyMsg(item)"
        >
          <div class="imgBox">
            <img :src="item.medicincePic" alt />
          </div>
          <div class="contentBox">
            <p>
              <span>{{ item.medinceName }}</span>
              <span v-if="item.disclosePriceName === '具体价格'">{{
                `${item.price}元/${item.priceUnitName}`
              }}</span>
              <span v-else>{{ item.disclosePriceName }}</span>
            </p>
            <ul>
              <li>
                <span>规格</span>
                <span>{{ item.specificationName }}</span>
              </li>
              <li>
                <span>求购量</span>
                <span>{{ `${item.buyingAmount}${item.buyUnitName}` }}</span>
              </li>
              <li>
                <span>产地</span>
                <span>{{
                  `${item.orginProvinceName}/${item.orginCityName}/${item.orginCountyName}`
                }}</span>
              </li>
              <li>
                <span>交货地</span>
                <span>{{
                  `${item.deliveryProvinceName}/${item.deliveryCityName}/${item.deliveryCountyName}`
                }}</span>
              </li>
              <li>
                <span>质量</span>
                <span>{{ item.qualityStandardName }}</span>
              </li>
              <li>
                <span>票据</span>
                <span>{{ item.invoiceName }}</span>
              </li>
              <li>
                <span>电话</span>
                <span v-if="tokenMsg && userMsg">{{ item.contactNumber }}</span>
                <span v-else> ***********</span>
                <p v-if="!tokenMsg || !userMsg" @click.stop="toLogin">
                  登录可见 > >
                </p>
              </li>
            </ul>
            <div class="findMsg">查看详情</div>
          </div>
        </li>
      </ul>
    </div>
    <!--   分页插件   -->
    <div style="text-align:center;margin-top:20px">
      <pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :total="total"
        :size="size"
        :pageLayout="pageLayout"
        :current="current"
      ></pagination>
    </div>
  </div>
</template>
<script>
import pagination from "@/components/Pagination";
import { reqbuyList } from "@/api/apply";
import { reqAdress } from "@/api/map";
import { reqsupplyTypeList } from "@/api/userInfo";
import { reqDruglist } from "@/api/index";
export default {
  name: "applyList",
  components: {
    pagination
  },
  computed: {
    drugTypeCheck() {
      return this.drugList.filter(item => {
        return item.id == this.checkForm.medicineId;
      });
    },
    areaCheck() {
      return this.cdareaList.filter(item => {
        return item.provinceId == this.checkForm.orginProvinceId;
      });
    },
    ckareaCheck() {
      return this.cdareaList.filter(item => {
        return item.provinceId == this.checkForm.deliveryProvinceId;
      });
    },
    radiocheck() {
      return this.radioList.filter(item => {
        return item.value == this.checkForm.qualityStandard;
      });
    },
    tokenMsg() {
      return this.$store.state.app.token;
    },
    userMsg() {
      // console.log(this.$store.state.app.userInfo);
      if (
        typeof this.$store.state.app.userInfo == "string" &&
        this.$store.state.app.userInfo != "undefined"
      ) {
        return JSON.parse(this.$store.state.app.userInfo);
      } else {
        return this.$store.state.app.userInfo;
      }
    }
  },
  watch: {
    checkForm: {
      handler(newVal) {
        this.getapplyList(this.page, this.size, newVal);
      },
      deep: true
    }
  },
  data() {
    return {
      records: [],
      current: 1,
      size: 10,
      total: 0,
      pages: 0,
      inputdrugName: "",
      checkForm: {
        // 搜索框药材中文名
        medicineName: "",
        // 拼音缩写
        letter: "",
        // 登录用户id
        loginUserId: "",
        // 供应药材ID
        medicineId: "",
        //产地
        orginProvinceId: "",

        // 质量标准
        qualityStandard: "",
        // 状态
        status: "",
        //当前用户其他供应信息
        userId: "",
        // 求购交货地
        deliveryProvinceId: ""
      },
      pageLayout: "prev, pager, next",
      OneZm: "",
      TwoZm: "",
      drugList: [
        { medinceName: "黄芪", id: "001" },
        { medinceName: "板蓝根", id: "002" }
      ],
      zmList: [
        { name: "A" },
        { name: "B" },
        { name: "C" },
        { name: "D" },
        { name: "E" },
        { name: "F" },
        { name: "G" },
        { name: "H" },
        { name: "I" },
        { name: "J" },
        { name: "K" },
        { name: "L" },
        { name: "M" },
        { name: "N" },
        { name: "O" },
        { name: "P" },
        { name: "Q" },
        { name: "R" },
        { name: "S" },
        { name: "T" },
        { name: "U" },
        { name: "V" },
        { name: "W" },
        { name: "X" },
        { name: "Y" },
        { name: "Z" }
      ],
      areaActive: true,
      ckActive: true,
      cdareaList: [],
      drugName: "",
      radioActive: "0",
      radioList: [
        {
          label: "达到2020版药典标准",
          value: "0"
        },
        {
          label: "达到出口标准",
          value: "1"
        },
        {
          label: "达到省标",
          value: "2"
        }
      ],
      applyList: [
        {
          imgUrl: require("@/assets/images/test/apply/图层 1.png"),
          title: "防风",
          id: "001",
          gg: "统货",
          num: "100",
          cd: "北京",
          ck: "内蒙古",
          zl: "2020标准",
          pj: "发票",
          phone: "1515151515151",
          price: "20"
        },
        {
          imgUrl: require("@/assets/images/test/apply/图层 1.png"),
          title: "防风",
          id: "002",
          gg: "统货",
          num: "100",
          cd: "北京",
          ck: "内蒙古",
          zl: "2020标准",
          pj: "发票",
          phone: "1515151515151",
          price: "20"
        },
        {
          imgUrl: require("@/assets/images/test/apply/图层 1.png"),
          title: "防风",
          gg: "统货",
          id: "003",
          num: "100",
          cd: "北京",
          ck: "内蒙古",
          zl: "2020标准",
          pj: "发票",
          phone: "1515151515151",
          price: "20"
        },
        {
          imgUrl: require("@/assets/images/test/apply/图层 1.png"),
          title: "防风",
          gg: "统货",
          id: "004",
          num: "100",
          cd: "北京",
          ck: "内蒙古",
          zl: "2020标准",
          pj: "发票",
          phone: "1515151515151",
          price: "20"
        }
      ]
    };
  },
  created() {
    /* 获取省列表 */
    this.getProvince();
    /* 获取质量标准 */
    this.getzlType();
    if (this.$route.query.medicineId && this.$route.query.letter) {
      let letter = this.$route.query.letter;
      // console.log(letter);
      // console.log(letter.slice(0, 1));
      // console.log(letter.slice(1, 2));
      this.getOneZm(letter.slice(0, 1));
      this.getTwoZm(letter.slice(1, 2));
      this.getmedicineId(this.$route.query.medicineId);
    } else {
      /* 初始化列表 */
      this.getapplyList();
    }
  },
  methods: {
    //获取地址(省)
    getProvince() {
      let proParams = {
        type: "province",
        id: "001"
      };
      reqAdress(proParams).then(res => {
        this.cdareaList = res.data.data;
      });
    },
    /* 获取质量标准 */
    getzlType() {
      reqsupplyTypeList({ categoryName: "质量标准" }).then(res => {
        this.radioList = res.data.data;
      });
    },
    // 获取供应列表
    getapplyList(page, size, params) {
      let applyParams = {};
      if (page) {
        this.current = page;
      }
      if (size) {
        this.size = size;
      }
      if (params) {
        applyParams = params;
      }
      applyParams.page = this.current;
      applyParams.pageSize = this.size;
      reqbuyList(applyParams).then(res => {
        console.log(res);
        this.records = res.data.data.records;
        // this.records.forEach(item => {
        //   item.imgUrl = require("@/assets/images/test/sczx/图层 2.png");
        // });
        console.log(this.records);
        this.total = res.data.data.total;
        this.size = res.data.data.size;
      });
    },
    // 分页
    handleSizeChange(size) {
      this.reqbuyList(1, size);
    },
    handleCurrentChange(page) {
      this.reqbuyList(page);
    },
    // 根据字母查询药材
    getDrugList(e) {
      let durgListType = {};
      durgListType.letter = e;
      reqDruglist(durgListType).then(res => {
        this.drugList = res.data.data;
      });
    },
    /* 获取字母 */
    getOneZm(e) {
      this.OneZm = e;
      this.getDrugList(this.OneZm);
    },
    getTwoZm(e) {
      this.TwoZm = this.OneZm + e;
      console.log(this.TwoZm);
      this.getDrugList(this.TwoZm);
    },
    getmedicineId(e) {
      console.log(e);
      this.inputdrugName = "";
      this.checkForm.medicineName = "";
      this.checkForm.medicineId = e.id;
    },
    /* 删除药材品种 */
    deldrugType() {
      this.OneZm = "";
      this.TwoZm = "";
      this.inputdrugName = "";
      this.checkForm.medicineName = "";
      this.checkForm.medicineId = "";
    },
    /* 搜索框搜索药材 */
    serachDrug() {
      this.OneZm = "";
      this.TwoZm = "";
      this.checkForm.medicineId = "";
      this.checkForm.medicineName = this.inputdrugName;
    },
    /* 修改产地筛选 */
    changeareaactive(value) {
      this.checkForm.orginProvinceId = value;
      // this.getapplyList(this.page, this.size, this.checkForm);
    },
    /* 取消产地筛选 */
    delareaactive() {
      this.checkForm.orginProvinceId = "";
      // this.getapplyList(this.page, this.size, this.checkForm);
    },
    /* 修改仓储地筛选 */
    changeckareaactive(value) {
      this.checkForm.deliveryProvinceId = value;
      // this.getapplyList(this.page, this.size, this.checkForm);
    },
    /* 取消仓储地筛选 */
    delckareaactive() {
      this.checkForm.deliveryProvinceId = "";
      // this.getapplyList(this.page, this.size, this.checkForm);
    },
    // 跳转详情
    gotobuyMsg(e) {
      console.log(e.id);
      this.$router.push({
        path: "/OTC2/buymsg",
        query: { id: e.id, str: e.title }
      });
    },
    // 登录可见
    toLogin() {
      console.log("login");
    }
  }
};
</script>
<style lang="scss">
.applyListBox {
  .headSearch {
    .el-input {
      .el-input__inner {
        height: 30px;
        background: rgba(241, 241, 241, 1);
        border: 1px solid rgba(241, 241, 241, 1);
        border-radius: 5px 0 0 5px;
        outline: 0;
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.applyListBox {
  .checkBox {
    //  border: 1px solid rgba(200, 200, 200, 1);
    border-top: 5px solid rgba(57, 181, 75, 1);
    padding: 20px;
    background: #ffffff;
    .isactive {
      color: $maincolor;
    }
    .zmBox {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      border-bottom: 1px solid rgba(58, 181, 76, 0.1);
      min-height: 55px;
      p {
        width: 80px;
        min-height: 55px;
        color: #666666;
        margin-right: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #3ab54c10;
      }
      ul {
        display: flex;
        justify-content: flex-start;
        li {
          margin: 0 10px;
          &:hover {
            cursor: pointer;
          }
        }
      }
    }
    .h40 {
      height: 40px;
      transition: ease-in-out 1.5s;
    }
    .areaBox {
      display: flex;
      justify-content: flex-start;
      // align-items: center;
      border-bottom: 1px solid rgba(58, 181, 76, 0.1);
      min-height: 50px;
      overflow: hidden;
      position: relative;
      p {
        width: 80px;
        color: #666666;
        min-height: 55px;
        margin-right: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #3ab54c10;
      }
      i {
        height: 25px;
        line-height: 25px;
        width: 25px;
        position: absolute;
        top: 8px;
        // transform: translateY(-50%);
        right: 0;
        border: 1px solid rgba(186, 186, 186, 1);
        color: rgba(186, 186, 186, 1);
        text-align: center;
        &:hover {
          cursor: pointer;
        }
      }
      ul {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        width: 90%;
        li {
          margin: 0 10px;
          height: 40px;
          line-height: 40px;
          &:hover {
            cursor: pointer;
            color: $maincolor;
          }
        }
      }
    }
    .btnBox {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      align-items: center;
      border-bottom: 1px solid rgba(58, 181, 76, 0.1);
      min-height: 55px;
      p {
        width: 80px;
        min-height: 55px;
        margin-right: 10px;
        color: #666666;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #3ab54c10;
      }
      .headSearch {
        display: flex;
        justify-content: center;
        align-items: center;
        .el-input {
          border-radius: 5px 0 0 5px;
          width: 200px;
          outline: 0;
          .el-input__inner {
            height: 100px;
            background: #ffffff;
            outline: 0;
          }
        }
        .el-button {
          border-radius: 0 5px 5px 0;
          height: 30px;
          font-size: 16px;
          line-height: 0px;
        }
      }
    }
    .radioBox {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      align-items: center;
      border-bottom: 1px solid rgba(58, 181, 76, 0.1);
      min-height: 55px;
      p {
        width: 80px;
        min-height: 55px;
        color: #666666;
        margin-right: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #3ab54c10;
      }
      .el-radio-group {
        .el-radio {
          margin-right: 15px;
        }
      }
    }
    .isselBox {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      align-items: center;
      border-bottom: 1px solid rgba(58, 181, 76, 0.1);
      min-height: 55px;
      p {
        width: 80px;
        min-height: 55px;
        color: #666666;
        margin-right: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #3ab54c10;
      }
      ul {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        position: relative;
        width: 90%;
        .gotoBtnBox {
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          border: 0;
          .el-button {
            width: 123px;
            height: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            &:last-child {
              background: $sencondcolor;
              border: 1px solid $sencondcolor;
              color: #fff;
            }
          }
        }
        li {
          border: 1px solid $maincolor;
          margin-right: 10px;
          // padding: 2px 5px;
          height: 25px;
          border-radius: 3px;
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          align-items: center;
          span {
            margin: 0 5px;
            color: $maincolor;
            font-size: 14px;
          }
          i {
            font-size: 14px;
            margin-right: 3px;
            margin-top: 3px;
            &:hover {
              cursor: pointer;
            }
          }
        }
      }
    }
  }
  .applylist {
    margin-top: 30px;
    .applylistAll {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-items: flex-start;
      > li {
        width: 438px;
        margin-right: 40px;
        margin-bottom: 34px;
        &:nth-child(3n) {
          margin-right: 0px;
        }
        &:hover {
          border: 1px solid rgba(58, 181, 76, 1);
          cursor: pointer;
        }
        .imgBox {
          // border: 1px solid red;
          img {
            display: inline-block;
            width: 440px;
            height: 247px;
          }
        }
        .contentBox {
          background: $boxbg;
          padding: $boxpadding;
          height: 298px;
          p {
            display: flex;
            justify-content: space-between;
            align-items: center;
            span {
              font-size: 24px;
              color: $maincolor;
              &:last-child {
                font-size: 18px;
                color: $sencondcolor;
              }
            }
          }
          ul {
            margin-top: 15px;
            margin-bottom: 15px;
            li {
              height: 25px;
              line-height: 25px;
              &:last-child {
                position: relative;
                p {
                  position: absolute;
                  color: $maincolor;
                  right: 0;
                  top: 50%;
                  transform: translateY(-50%);
                }
              }
              span {
                color: #333333;
                &:first-child {
                  // border: 1px solid red;
                  display: inline-block;
                  width: 60px;
                }
              }
            }
          }
          .findMsg {
            border-top: 1px solid rgba(0, 0, 0, 0.2);
            text-align: center;
            color: $maincolor;
            font-size: 18px;
            padding-top: 15px;
          }
        }
      }
    }
  }
}
</style>
