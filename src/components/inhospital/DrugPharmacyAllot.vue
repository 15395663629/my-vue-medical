<template>

  <el-main  style="background-color: #E9EEF3;color: #333;padding:5px;" ><!-- 主体页面========================================================================-->
    <el-tabs @tab-click="patientSwitchFunction" v-model="maxCard" type="border-card" >
      <!--==========================================================================科室药品库存-->
      <el-tab-pane name="拆盒药品库存" :key="'拆盒药品库存'" label="拆盒药品库存">

<!--        <el-form>-->
<!--          <el-row style="height: 36px;">-->

<!--            <el-col :offset="16" :span="8">-->
<!--              <el-form-item>-->
<!--                <el-tag type="info">库存正常</el-tag>&nbsp;-->
<!--                <el-tag type="danger">库存低于警戒线</el-tag>&nbsp;-->
<!--                <el-tag type="primary">未设置警戒线</el-tag>-->
<!--              </el-form-item>-->
<!--            </el-col>-->
<!--          </el-row>-->
<!--        </el-form>-->

        <el-row>
          <el-col>
            <el-table @cell-dblclick="tableDbEdit"
                      :data="drugPharmacyArr" height="430px" size="small" >
              <el-table-column label="药品名称" prop="dpDrugName"></el-table-column>
              <el-table-column label="药品库存" prop="dpInventory"></el-table-column>
              <el-table-column label="小单位" prop="dpMinUnit"></el-table-column>
              <el-table-column label="价格" prop="dpDrugPrice"></el-table-column>
              <el-table-column label="大单位" prop="dpMaxUnit"></el-table-column>
            </el-table>

            <!--分页插件-->
            <el-pagination
                style="text-align: center;"
                @size-change="doctorEnjoinDetailsSizeChange"
                @current-change="doctorEnjoinDetailsCurrentChange"
                :current-page="doctorEnjoinDetailsCurrentPage"
                :page-sizes="[2,4,6,8,10]"
                :page-size="doctorEnjoinDetailsPageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="doctorEnjoinDetailsArr.length">
            </el-pagination>
          </el-col>
        </el-row>

      </el-tab-pane>



      <!--==========================================================================科室药品库存-->
      <el-tab-pane name="长期医嘱发药" :key="'长期医嘱发药'" label="长期医嘱发药">

<!--        <el-form>-->
          <el-row style="height: 36px;">

            <el-col :span="4">
<!--              <el-form-item label="展示：" size="mini" label-width="80px">-->
                <el-radio-group v-model="isKsOrAll"  @change="selectPharmacyDoctorKs">
                  <el-radio :label="1">所有科室</el-radio>
                  <el-radio :label="2">分科室</el-radio>
                </el-radio-group>
<!--              </el-form-item>-->
            </el-col>

            <el-col :span="2" :offset="16">
              <el-button icon="el-icon-check" size="mini" @click="clickDispensing()"  type="success">一键发药</el-button>
            </el-col>
            </el-row>
<!--        </el-form>-->

        <el-row>
          <el-col>
            <el-table
                :data="doctorPharmacyArr"  height="430px" size="small" >
              <el-table-column label="药品名称" prop="desDrugName"></el-table-column>
              <el-table-column label="药品规格" prop="desUnit"></el-table-column>
              <el-table-column label="使用方法" prop="desUsage"></el-table-column>
              <el-table-column label="药品价格" prop="desPrice"></el-table-column>
              <el-table-column label="所需科室" prop="ksName">
                <template #default="obj">
                  {{isKsOrAll == 1 ? '所有科室' : obj.row.ksName}}
                </template>
              </el-table-column>
              <el-table-column label="需要数量" prop="kc">

                <template #default="obj">
                  {{obj.row.kc}} {{obj.row.desUnit}}
                </template>

              </el-table-column>

              <el-table-column label="操作">
                <template #default="obj">
                  <el-button type="primary" @click="clickDispensing(obj.row)" size="mini">发药</el-button>
                </template>
              </el-table-column>
            </el-table>

            <!--分页插件-->
            <el-pagination
                style="text-align: center;"
                @size-change="doctorEnjoinDetailsSizeChange"
                @current-change="doctorEnjoinDetailsCurrentChange"
                :current-page="doctorEnjoinDetailsCurrentPage"
                :page-sizes="[2,4,6,8,10]"
                :page-size="doctorEnjoinDetailsPageSize"
                 :total="doctorEnjoinDetailsArr.length">
            </el-pagination>
          </el-col>
        </el-row>

      </el-tab-pane>

    </el-tabs>
  </el-main>

</template>

<script>


export default{

  data(){
    return{
      //========================================================================员工数据
      staff:{},//员工对象


      //=========================医嘱卡片数据
      maxCard:'拆盒药品库存',//卡片当前位置


      //====================================================================科室药品库存调拨记录数据
      deptDrugAllotObj:{//科室药品库存调拨记录对象

      },
      deptDrugAllotAll:[],//科室药品库存调拨记录数组

      //=====================================================================   处方药数据
      doctorPharmacyObj:{},//处方药所需库存对象
      doctorPharmacyArr:[],//处方药所有库存数组
      isKsOrAll:1,//1是所有科室 2是分科室
      DispensingVo:{//发药数据
        dvSid:'',//员工编号
        dvDrugId:'',//药品编号
        dvKsId:'',//科室编号
        dvName:''//员工名称
      },

      //=====================================================================执行医嘱数据
      doctorEnjoinDetailsArr:[],//医嘱详情数组
      doctorEnjoinSelectDetailsArr:[],//选中的医嘱数组

      //=====================================================================科室药品库存数据
      drugPharmacyObj:{
        dpId: '',//编号
        ksId:'', //连接科室编号
        dpInventory:'',//库存数量
        drugId:'',//药品编号
        dpDrugPrice:'',//药品价格
        dpDrugUnit:'',//药品单位名称
        dpDrugName:''//药品的名称
      },//药品库存对象
      drugPharmacyArr:[],//药品库存数组
      //=============双击科室药品数据
      dbclickPharmacyObj:{}

    }
  },
  mounted() {
    window.tableDbTexts = this.tableDbText;
  },
  methods: {
    //========================================================================页面初始化数据方法
    operationInit() {
      //初始化科室药品库存数据
      this.axios({
        url:'select-drug-pharmacyByKsId',
        params:{ksId:this.staff.ksId}
      }).then((v)=>{
        this.drugPharmacyArr = v.data;
      });

      //初始化医嘱药品查询
      this.axios({
        url:'select-doctor-pharmacyByKsId',
        params:{ksId:this.isKsOrAll == 1 ? null : 1}
      }).then((v)=>{
        this.doctorPharmacyArr = v.data;
      }).catch();

    },

    // tableDbEdit(row, column, cell, event) {
    //   if (column.label == "库存警戒线") {
    //     let cellInput = document.createElement("input");
    //     cellInput.value = row.dpGuard;
    //     cellInput.setAttribute("type", "text");
    //     cellInput.style.width = "40%";
    //     cellInput.style.position = 'absolute';
    //     cellInput.style.top = '12px';
    //     cell.appendChild(cellInput);
    //     cellInput.focus();
    //     cellInput.onblur = function() {
    //       // alert(row.dpId)
    //
    //       tableDbTexts(row,cellInput,event,cell);
    //     };
    //   }
    // },
    // tableDbText(row,cellInput,event,cell){
    //   // alert('s')
    //   this.axios.post('update-byDpId-dpGuard',{bpId:row.dpId,dpGuard:cellInput.value}).then((v)=>{
    //     // event.target.innerHTML = cellInput.value;
    //     // alert(cellInput.value)
    //     cell.removeChild(cellInput);
    //     //初始化科室药品库存数据
    //     this.axios({
    //       url:'select-drug-pharmacyByKsId',
    //       params:{ksId:this.staff.ksId}
    //     }).then((v)=>{
    //       this.drugPharmacyArr = v.data;
    //       console.log(this.drugPharmacyArr)
    //     });
    //   }).catch();
    // },

    //=======================================================================医嘱处方药方法
    //切换查看方法（科室）
    selectPharmacyDoctorKs(){
      //初始化医嘱药品查询
      this.axios({
        url:'select-doctor-pharmacyByKsId',
        params:{ksId:this.isKsOrAll == 1 ? null : 1}
      }).then((v)=>{
        this.doctorPharmacyArr = v.data;
      }).catch();
    },
    //发药
    clickDispensing(obj){
      this.DispensingVo.dvSid = this.staff.sid;
      this.DispensingVo.dvName = this.staff.sname;


      if(obj == undefined){//全部发药
        this.DispensingVo.dvDrugId = null;
        this.DispensingVo.dvKsId = null;
        this.axios.post('dispensing-drug',{DispensingVo:this.DispensingVo}).then((v)=>{
          console.log(v.data);
          this.operationInit();
        }).catch();

        return;
      }

      if(this.isKsOrAll == 1){//按药品编号发药
        this.DispensingVo.dvDrugId = obj.desDrugId;
        this.DispensingVo.dvKsId = null;
        this.axios.post('dispensing-drug',{DispensingVo:this.DispensingVo}).then((v)=>{
          this.operationInit();
          console.log(v.data);
        }).catch();
        
      }else{//按科室发药
        this.DispensingVo.dvDrugId = obj.desDrugId;
        this.DispensingVo.dvKsId = obj.ksId;
        this.axios.post('dispensing-drug',{DispensingVo:this.DispensingVo}).then((v)=>{
          this.operationInit();
          console.log(v.data);
        }).catch();
      }
    },


    //=======================================================================表格双击事件
    dbclickDrugPharmacy(obj){
      this.dbclickPharmacyObj = obj;
    },

    //========================================================================切换操作时调用方法
    patientSwitchFunction(){
      if(this.maxCard == '科室药品库存'){

        //初始化科室药品库存数据
        this.axios({
          url:'select-drug-pharmacyByKsId',
          params:{ksId:this.staff.ksId}
        }).then((v)=>{
          this.drugPharmacyArr = v.data;
        });

      }else if(this.maxCard == '药品调拨'){

        //初始化科室药品库存数据
        this.axios({
          url:'select-by-ksId',
          params:{ksId:this.staff.ksId}
        }).then((v)=>{
          console.log(v.data);
          this.deptDrugAllotAll = v.data;
        });

      }else{

      }
    },









    //========================================================================格式化日期方法
    //格式化日期  thistime时间  fmt格式
    formatDate (thistime, fmt) {
      let $this = new Date(thistime)
      let o = {
        'M+': $this.getMonth() + 1,
        'd+': $this.getDate(),
        'h+': $this.getHours(),
        'm+': $this.getMinutes(),
        's+': $this.getSeconds(),
        'q+': Math.floor(($this.getMonth() + 3) / 3),
        'S': $this.getMilliseconds()
      }
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ($this.getFullYear() + '').substr(4 - RegExp.$1.length))
      }
      for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
        }
      }
      return fmt;
    },



    //===========================================================分页方法


  },
  created() {
    this.staff = this.$store.state.token.list;//将登录存入的值在取出来
    this.operationInit();//初始化页面数据
  }
}

</script>

<style scoped>
/deep/ .el-main{
  padding: 0px;
}
</style>