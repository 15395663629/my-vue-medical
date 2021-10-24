<template>
<h1>药房</h1>
  <el-button size="mini" type="primary" @click="opendiaobo">调拨申请</el-button>
  <el-table
      :data="yfstockplie.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      stripe
      style="width: 100%" @selection-change="ykAllotdetail1">
    <el-table-column type="selection" width="55"/>
    <el-table-column
        label="药品名称"
        prop="yfDrvenName">
    </el-table-column>
    <el-table-column
        label="药品售价"
        prop="yfSellingprice">
    </el-table-column>
    <el-table-column
        label="药品批次"
        prop="yfDrvenBatch">
    </el-table-column>
    <el-table-column
        label="药品库存"
        prop="yfDrvenCount">
    </el-table-column>
    <el-table-column
        label="药品类别"
        prop="yfDrvenCount">
      <template #default="scope">
          {{scope.row.drugPrescription == 1? '西药':'中药'}}
      </template>
    </el-table-column>
    <el-table-column
        label="供应商"
        prop="ykSupplier.supplierName">
    </el-table-column>
    <el-table-column
        label="处方药"
        prop="drugPrescription">
      <template #default="scope">
        <el-tag>
          {{scope.row.drugPrescription == 1? '处方药':'非处方'}}
        </el-tag>
      </template>
    </el-table-column>
  </el-table>
<!--  调拨弹窗-->
  <el-dialog v-model="diaoboform" title="调拨申请">
    <el-form :model="ykAllot" ref="ykAllot" :rules="rules">
      <el-row>
        <el-col :span="12">
          <el-form-item label="调拨编号">
            <el-input v-model="ykAllot.ykAllotId" disabled style="width: 215px"/>
          </el-form-item>
        </el-col>
        <el-col :span="10" offset="2">
          <el-form-item label="调拨原因"  prop="ykAllotCause">
            <el-input v-model="ykAllot.ykAllotCause" style="width: 215px" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="调拨日期" prop="ykAllotTime">
            <el-date-picker v-model="ykAllot.ykAllotTime" :picker-options="pickerOptions"
                              clearable placeholder="选择调拨时间" type="date"/>
          </el-form-item>
        </el-col>
        <el-col :span="10" offset="4">
          <el-form-item label="经手人" prop="sId">
            <el-select v-model="ykAllot.sId" placeholder="选择经手人">
              <el-option v-for="stall in stallform"
                         :label="stall.sname"
                         :value="stall.sid"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col >
          <el-button size="mini" type="warning" @click="yaokuxz = true">从药库选择</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="ykAllData" height="200">
      <el-table-column label="药品名称">
        <template #default="scope">
          {{scope.row.yfDrvenName}}
        </template>
      </el-table-column>
      <el-table-column label="药品批次" prop="yfDrvenBatch">
        <template #default="scope">
          {{scope.row.yfDrvenBatch}}
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
       <!--  ------------------------从药库选择需要调拨的药------------------------------  -->
  <el-dialog v-model="yaokuxz" width="80%">
    <el-table :data="yaokuForm.slice((currentPage-1)*pagesize,currentPage*pagesize)"
              @selection-change="ykxz">
      <el-table-column type="selection" width="55"/>
      <el-table-column prop="ykDrvenName" label="药品名称"/>
      <el-table-column prop="ykSelingprice" label="药品售价"/>
      <el-table-column prop="ykDrvenCount" label="药品库存"/>
      <el-table-column prop="ykDrvenBatch" label="药品批次"/>
      <el-table-column prop="ykDrvenMftdate" label="生产日期"/>
      <el-table-column prop="ykSupplier.supplierName" label="供应商"/>
    </el-table>
    <template #footer>
			    <span class="dialog-footer">
			      <el-button @click="yaokuxz = false">取 消</el-button>
			      <el-button type="primary" @click="tianjia()">确认选择</el-button>
			    </span>
    </template>
    <!-- 分页 -->
    <el-pagination
        :current-page="currentPage"
        :page-size="pagesize"
        :page-sizes="[5, 10, 20, 40]"
        :total="yaokuForm.length"
        layout="total, sizes, prev, pager, next, jumper"
        style="text-align: center"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange">
    </el-pagination>
  </el-dialog>
  <!-- 分页 -->
  <el-pagination
      :current-page="currentPage"
      :page-size="pagesize"
      :page-sizes="[5, 10, 20, 40]"
      :total="yfstockplie.length"
      layout="total, sizes, prev, pager, next, jumper"
      style="text-align: center"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange">
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
        ykAllotdetail:[],//调拨详表
      },
      stallform:[],//------员工数据
      yaokuForm:[],//查询药库库存
      ykAllotdetaiff:[],
      ykAllData:[],
      currentPage:1, //初始页
      pagesize:8,    //    每页的数据
      diaoboform:false,//调拨弹窗
      yaokuxz:false,//从药库选择需要调拨的药 弹窗
      pickerOptions: {//禁用今天之前的时间
        disabledDate:time=> {
          let delay = this.delayItem.EndTime;
          if (delay) {
            return time.getTime() < new Date(delay).getTime();
          }
        }
      },
      //校验
      rules: {
        ykAllotCause: [
          {required: true, message: '请输入调拨原因', trigger: 'blur'},
        ],
        ykAllotTime: [
          {
            type: 'date',
            required: true,
            message: '请选择调拨时间',
            trigger: 'change',
          },
        ],
        sId: [
          { required: true, message: '请选择经手人', trigger: 'change' },
        ],
      }
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

    //新增调拨申请
    addykall(){
      this.ykAllot.yfDruginventories=this.ykAllData;
      this.axios.post("add-YkAllot",this.ykAllot).then((V)=>{
        this.$message({
          message: '成功新增调拨申请',
          type: 'success'
        });
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
      //查询药库库存
      this.axios.post("YK-repertory").then((v)=>{
        this.yaokuForm = v.data;
      })
    },
    //选择药品，进行调拨申请
    ykAllotdetail1(val){
      this.ykAllotdetaiff = val;
      for(var i = 0; i< this.ykAllotdetaiff.length; i++) {
      }
      // this.ykAllDatathis.ykAllotdetaiff;
      this.ykAllotdetaiff.forEach(v => {
        this.
        this.ykAllData.push(v)
      })
      console.log(this.ykAllData);
    },
    //从药库选择药品
    ykxz(val){
      this.ykAllotdetaiff = val;
      for (var i =0; i< this.ykAllotdetaiff.length;i++){
        console.log('name'+this.ykAllotdetaiff[i])
      }
    },
    //打开调拨弹窗
    opendiaobo(){
      this.diaoboform = true;
      this.ykAllot.ykAllotId = this.getProjectNum()/* + Math.floor(Math.random() * 1000)*/ //随机数
      this.ykAllData=this.ykAllotdetaiff;
    },
    //点击确定把药库的药品添加进去
    tianjia(){
      this.ykAllotdetaiff.forEach(v => {
        let obj = {
          DrugId:'',
          yfDrvenName:'',
          yfNumbers:1
        };
        console.log(v)
        obj.drugId = v.drugId;
        obj.yfDrvenName = v.ykDrvenName;
        obj.yfDrvenBatch = v.ykDrvenBatch
        this.ykAllData.push(obj);
      })
          this.yaokuxz=false;
    },
    /*清空表单*/
    fromdata(){
      this.diaob={
        ykAllotId:'',
            ykAllotCause:'',
            ykAllotTime:'',
            sId:'',
            ykAllotName:'',
        yfNumbers:1
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