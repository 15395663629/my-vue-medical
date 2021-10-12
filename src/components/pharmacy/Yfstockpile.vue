<template>
<h1>药房</h1>
  <el-button type="primary" size="mini" @click="opendiaobo">调拨申请</el-button>
  <el-table
      :data="yfstockplie.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      stripe
      @selection-change="ykAllotdetail1"
      style="width: 100%" height="500">
    <el-table-column type="selection" width="55"/>
    <el-table-column
        prop="yfDrvenName"
        label="药品名称">
    </el-table-column>
    <el-table-column
        prop="yfSellingprice"
        label="药品售价">
    </el-table-column>
    <el-table-column
        prop="yfDrvenBatch"
        label="药品批次">
    </el-table-column>
    <el-table-column
        prop="yfDrvenCount"
        label="药品库存">
    </el-table-column>
    <el-table-column
        prop="yfDrvenCount"
        label="药品类别">
      <template #default="scope">
          {{scope.row.drugPrescription == 1? '西药':'中药'}}
      </template>
    </el-table-column>
    <el-table-column
        prop="ykSupplier.supplierName"
        label="供应商">
    </el-table-column>
    <el-table-column
        prop="drugPrescription"
        label="处方药">
      <template #default="scope">
        <el-tag>
          {{scope.row.drugPrescription == 1? '处方药':'非处方'}}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column
        prop="address"
        label="操作">
      <template #default="scope">
        <el-button type="primary" plain size="mini" @click="">调拨申请</el-button>
      </template>
    </el-table-column>
  </el-table>
<!--  调拨弹窗-->
  <el-dialog title="调拨申请" v-model="diaoboform">
    <el-form model="ykAllot">
      <el-row>
        <el-col :span="12">
          <el-form-item label="调拨编号">
            <el-input style="width: 215px" disabled v-model="ykAllot.ykAllotId"/>
          </el-form-item>
        </el-col>
        <el-col :span="10" offset="2">
          <el-form-item label="调拨原因">
            <el-input style="width: 215px" v-model="ykAllot.ykAllotCause" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="调拨日期">
            <el-date-picker v-model="ykAllot.ykAllotTime" :picker-options="pickerOptions"
                              clearable type="date" placeholder="选择调拨时间"/>
          </el-form-item>
        </el-col>
        <el-col :span="10" offset="4">
          <el-form-item label="经手人">
            <el-select v-model="ykAllot.sId" placeholder="选择经手人">
              <el-option v-for="stall in stallform"
                         :label="stall.sname"
                         :value="stall.sid"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>


<!--    {{ykAllData}}12-->
    <el-table :data="ykAllData" height="200">
      <el-table-column prop="drugId" label="药品名称" >
        <template #default="scope">
          {{scope.row.yfDrvenName}}
        </template>
      </el-table-column>
      <el-table-column label="数量" width="150">
        <template #default="scope">
          <el-input-number v-model="scope.row.yfNumbers" mix="1" size="mini"/>
        </template>
      </el-table-column>
    </el-table>

    <template #footer>
			    <span class="dialog-footer">
			      <el-button @click="diaoboform = false">取 消</el-button>
			      <el-button type="primary" @click="addykall()">确 定</el-button>
			    </span>
    </template>
  </el-dialog>
  <!-- 分页 -->
  <el-pagination
      style="text-align: center"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[3, 8, 16, 32]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="yfstockplie.length">
  </el-pagination>
</template>

<script>
export default {
  data(){
    return{
      drugName:'',
      yfstockplie:[],//药房数据
      ykAllot:{
        ykAllotId:'',
        ykAllotCause:'',
        ykAllotTime:'',
        sId:'',
        ykAllotName:'',

        yfDruginventories:[],

        ykAllotdetail:[]//调拨详表
      },
      stallform:[],//------员工数据
      ykAllotdetaiff:[],
      ykAllData:[],
      currentPage:1, //初始页
      pagesize:8,    //    每页的数据
      diaoboform:false,//调拨弹窗
      pickerOptions: {//禁用今天之前的时间
        disabledDate:time=> {
          let delay = this.delayItem.EndTime;
          if (delay) {
            return time.getTime() < new Date(delay).getTime();
          }
        }
      },
    }
  },
  methods:{
    handleSizeChange: function (size) {
      this.pagesize = size;
      console.log(this.pagesize)  //每页下拉显示数据
    },
    handleCurrentChange: function(currentPage){
      this.currentPage = currentPage;
      console.log(this.currentPage)  //点击第几页
    },
    // 生成随机编号     获取当前日期的方法
    getProjectNum () {
      /*const projectTime = new Date() // 当前中国标准时间
      const Year = projectTime.getFullYear() // 获取当前年份 支持IE和火狐浏览器.
      const Month = projectTime.getMonth() + 1 // 获取中国区月份
      const Day = projectTime.getDate() // 获取几号
      var CurrentDate = Year
      if (Month >= 10) { // 判断月份和几号是否大于10或者小于10
        CurrentDate += Month
      } else {
        CurrentDate += '0' + Month
      }
      if (Day >= 10) {
        CurrentDate += Day
      } else {
        CurrentDate += '0' + Day
      }
      return CurrentDate*/

      var d = new Date();
      var year = d.getFullYear();
      var month = d.getMonth() + 1;
      var date = d.getDate();
      var day = d.getDay();
      var hours = d.getHours();
      var minutes = d.getMinutes();
      var seconds = d.getSeconds();
      var ms = d.getMilliseconds();
      year = (year + "").substring(2);
      if (month <= 9)
        month = "0" + month;
      if (date <= 9)
        date = "0" + date;
      if (hours <= 9)
        hours = "0" + hours;
      if (minutes <= 9)
        minutes = "0" + minutes;
      if (seconds <= 9)
        seconds = "0" + seconds;
      let num = Math.ceil(Math.random()*100);
      var id = year + month + date + hours + minutes + seconds + num;
      return id;
    },
    //选择药品，进行调拨申请
    ykAllotdetail1(val){
      this.ykAllotdetaiff = val;
      for(var i = 0; i< this.ykAllotdetaiff.length; i++) {
      }
      // this.ykAllDatathis.ykAllotdetaiff;
      this.ykAllotdetaiff.forEach(v => {

        this.ykAllData.push(v)
      })
      console.log(this.ykAllData);
    },
    //新增调拨申请
    addykall(){
      this.ykAllot.yfDruginventories=this.ykAllData;
      this.axios.post("add-YkAllot",this.ykAllot).then((V)=>{
        this.fromdata();
      this.getData();
      })
    },
    getData(){
      //查询药房库存
      this.axios.post("YF-repertory").then((v)=>{
        this.yfstockplie = v.data
      })
      /*查询经手人  员工表*/
      this.axios.get("all-stall").then((v)=>{
        this.stallform = v.data;
      })
    },
    //打开调拨弹窗
    opendiaobo(){
      this.diaoboform = true;
      this.ykAllot.ykAllotId = this.getProjectNum()/* + Math.floor(Math.random() * 1000)*/ //随机数
      this.ykAllData=this.ykAllotdetaiff;
    },
    /*清空表单*/
    fromdata(){
      this.diaob={
        ykAllotId:'',
            ykAllotCause:'',
            ykAllotTime:'',
            sId:'',
            ykAllotName:'',
      },
      this.diaoboform=false
    },
  },
  created() {
    this.getData();
  }
}
</script>

<style scoped>

</style>