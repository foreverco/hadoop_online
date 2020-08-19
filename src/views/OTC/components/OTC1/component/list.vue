<template>
  <div class="lvcontainer applyListBox">
    <div class="checkBox">
      <div class="zmBox">
        <p>品种:</p>
        <ul>
          <li v-for="(item, index) in zmList" :key="index">{{item.name}}</li>
        </ul>
      </div>
      <div class="btnBox">
        <p>搜索:</p>
        <div class="headSearch">
          <el-input v-model="drugName" placeholder="请输入关键字"></el-input>
          <el-button type="success">搜索</el-button>
        </div>
      </div>
      <div class="areaBox" :class="{h40:areaActive}">
        <p>产地:</p>
        <ul>
          <li
            v-for="(item, index) in cdareaList"
            :key="index"
            :class="{isactive:areaactive==index}"
            @click="changeareaactive(index)"
          >{{item.area}}</li>
        </ul>
        <i
          :class="areaActive?'el-icon-caret-bottom':'el-icon-caret-top'"
          @click="areaActive=!areaActive"
        ></i>
      </div>
      <div class="areaBox" :class="{h40:areaActive}">
        <p>仓库:</p>
        <ul>
          <li
            v-for="(item, index) in ckareaList"
            :key="index"
            :class="{isactive:ckareaactive==index}"
            @click="changeckareaactive(index)"
          >{{item.area}}</li>
        </ul>
        <i
          :class="areaActive?'el-icon-caret-bottom':'el-icon-caret-top'"
          @click="areaActive=!areaActive"
        ></i>
      </div>
      <div class="radioBox">
        <p>质量:</p>
        <el-radio-group v-model="radioActive">
          <el-radio
            v-for="(item, index) in radioList"
            :key="index"
            :label="item.value"
          >{{item.label}}</el-radio>
        </el-radio-group>
      </div>
      <div class="isselBox">
        <p>已选:</p>
        <ul>
          <li v-if="areaactive!=-1">
            <span>产地</span>
            <span>|</span>
            <span>{{areaCheck}}</span>
            <span>|</span>
            <i class="el-icon-close" @click="areaactive = -1"></i>
          </li>
          <li v-if="ckareaactive!=-1">
            <span>仓库</span>
            <span>|</span>
            <span>{{ckareaCheck}}</span>
            <span>|</span>
            <i class="el-icon-close" @click="ckareaactive = -1"></i>
          </li>
          <li v-if="radiocheck&&radiocheck.length!==0">
            <span>质量</span>
            <span>|</span>
            <span>{{radiocheck[0].label}}</span>
            <span>|</span>
            <i class="el-icon-close" @click="ckareaactive = -1"></i>
          </li>
          <li class="gotoBtnBox">
            <el-button type="success">发布求购信息</el-button>
            <el-button>发布供应信息</el-button>
          </li>
        </ul>
      </div>
    </div>

    <div class="applylist">
      <ul>
        <li v-for="(item, index) in applyList" :key="index">
          <div class="imgBox">
            <img :src="item.imgUrl" alt>
          </div>
          <div class="contentBox">456</div>
        </li>
        <li>123123</li>
        <li>123123</li>
        <li>123123</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "applyList",
  computed: {
    areaCheck() {
      return this.cdareaList[this.areaactive].area;
    },
    ckareaCheck() {
      return this.ckareaList[this.ckareaactive].area;
    },
    radiocheck() {
      return this.radioList.filter(item => {
        return item.value == this.radioActive;
      });
    }
  },
  data() {
    return {
      areaActive: true,
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
      areaactive: -1,
      cdareaList: [
        { area: "内蒙古省" },
        { area: "辽宁省" },
        { area: "江苏省" },
        { area: "浙江省" },
        { area: "安徽省" },
        { area: "河北省" },
        { area: "河南省" },
        { area: "湖北省" },
        { area: "湖南省" },
        { area: "广东省" },
        { area: "广西省" },
        { area: "山东省" },
        { area: "内蒙古省" },
        { area: "辽宁省" },
        { area: "江苏省" },
        { area: "浙江省" },
        { area: "安徽省" },
        { area: "河北省" },
        { area: "河南省" },
        { area: "湖北省" },
        { area: "湖南省" },
        { area: "广东省" },
        { area: "广西省" },
        { area: "山东省" }
      ],
      ckareaactive: -1,
      ckareaList: [
        { area: "内蒙古省" },
        { area: "辽宁省" },
        { area: "江苏省" },
        { area: "浙江省" },
        { area: "安徽省" },
        { area: "河北省" },
        { area: "河南省" },
        { area: "湖北省" },
        { area: "湖南省" },
        { area: "广东省" },
        { area: "广西省" },
        { area: "山东省" },
        { area: "内蒙古省" },
        { area: "辽宁省" },
        { area: "江苏省" },
        { area: "浙江省" },
        { area: "安徽省" },
        { area: "河北省" },
        { area: "河南省" },
        { area: "湖北省" },
        { area: "湖南省" },
        { area: "广东省" },
        { area: "广西省" },
        { area: "山东省" }
      ],
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
          gg: "统货",
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
  methods: {
    changeareaactive(e) {
      this.areaactive = e;
    },
    changeckareaactive(e) {
      this.ckareaactive = e;
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
<style lang='scss' scoped>
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
      min-height: 55px;
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
            line-height: 0;
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
    border: 1px solid red;
    margin-top: 30px;
    ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-items: flex-start;
      li {
        width: 438px;
        border: 1px solid rgba(58, 181, 76, 1);
        margin-right: 40px;
        margin-bottom: 34px;
        &:nth-child(3n) {
          margin-right: 0px;
        }
        .imgBox {
          img {
            display: inline-block;
            width: 100%;
            height: 247px;
          }
        }
        .contentBox {
          background: $boxbg;
          padding: $boxpadding;
          height: 298px;
        }
      }
    }
  }
}
</style>

