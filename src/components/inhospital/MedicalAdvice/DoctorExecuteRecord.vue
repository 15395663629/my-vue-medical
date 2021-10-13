<template>
  <el-row>
    <el-col  :span="1">
        <el-button @click="emptyExecuteScreen" type="primary" size="mini">清空条件</el-button>
    </el-col>

    <el-col :offset="2" :span="3">
        <el-input @blur="initExecuteRecord" size="mini" v-model="doctorEnjoinWhere.searchLike" placeholder="药品名称"></el-input>
    </el-col>
    <el-col :span="1" >
      <el-button  size="mini" @click="initExecuteRecord" icon="el-icon-search" type="primary" ></el-button>
    </el-col>

    <el-col :offset="1" :span="4">
      <span style="font-size: 12px;">医嘱类型:</span>&nbsp;
      <el-select @change="initExecuteRecord" v-model="doctorEnjoinWhere.doctorType" style="width: 90px" size="mini">
        <el-option label="全部医嘱" :value="0"></el-option>
        <el-option label="长期医嘱" :value="1"></el-option>
        <el-option label="临时医嘱" :value="2"></el-option>
      </el-select>
    </el-col>

    <el-col  :span="12">
      &nbsp;<span style="font-size: 12px;">执行日期：</span>&nbsp;

      <el-date-picker @change="initExecuteRecord" v-model="doctorEnjoinWhere.startDate"
                      type="date"
                      size="mini"
                      placeholder="日期">
      </el-date-picker>
      &nbsp;<span style="font-size: 12px;">至</span>&nbsp;
      <el-date-picker @change="initExecuteRecord" v-model="doctorEnjoinWhere.endDate"
          type="date"
          size="mini"
          placeholder="日期">
      </el-date-picker>
    </el-col>
  </el-row>


  <el-row>
    <el-col>

      <el-table :data="patientDoctorExecute.slice((patientDoctorExecuteCurrentPage-1)*patientDoctorExecutePageSize,patientDoctorExecuteCurrentPage*patientDoctorExecutePageSize)"
                 height="420px" size="small" >
        <!--                    <el-table-column v-if="patientBaseObj.ptNo == null" type="selection" width="50px"></el-table-column>-->
        <el-table-column width="140px" label="下嘱日期" prop="zyDoctorEnjoinDetails.desEnteringDate"></el-table-column>
        <el-table-column label="下嘱医生" width="100px" prop="doctorSname"></el-table-column>
        <el-table-column label="执行医生" width="100px" prop="executeSname"></el-table-column>
        <el-table-column width="100px" label="医嘱类型">
          <template #default="obj">
            {{obj.row.zyDoctorEnjoinDetails.deLongorshort == 1 ? '长期医嘱' : '临时医嘱'}}
          </template>
        </el-table-column>
        <el-table-column width="120px" label="执行时间" prop="derExecuteDate"></el-table-column>
        <el-table-column width="120px" label="药品名称" prop="zyDoctorEnjoinDetails.desDrugName"></el-table-column>
        <el-table-column width="90px" label="执行数量" prop="zyDoctorEnjoinDetails.desCount"></el-table-column>
        <el-table-column width="80px" label="规格" prop="zyDoctorEnjoinDetails.desUnit"></el-table-column>
        <el-table-column label="嘱托" prop="zyDoctorEnjoinDetails.desText"></el-table-column>
      </el-table>

      <!--分页插件-->
      <el-pagination
          style="text-align: center;"
          @size-change="doctorEnjoinExecuteSizeChange"
          @current-change="doctorEnjoinExecuteCurrentChange"
          :current-page="patientDoctorExecuteCurrentPage"
          :page-sizes="[2,4,6,8,10]"
          :page-size="patientDoctorExecutePageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="patientDoctorExecute.length">
      </el-pagination>

    </el-col>
  </el-row>

</template>

<script>
export default{
  props:{
    patientObj:{
      type:Object,
      request:true
    }
  },
  data(){
    return{
      //员工数据
      staff:{},

      //================== 医嘱数据
      patientDoctorExecute:[],//已执行医嘱记录数组
      //================== 医嘱分页数据
      patientDoctorExecutePageSize:8,//页大小
      patientDoctorExecuteCurrentPage:1,//当前页


      //======================查询条件数据
      doctorEnjoinWhere:{
        startDate:'',//开始日期
        endDate:'',//结束日期
        searchLike:'',//模糊搜索
        doctorType:0,//医嘱类型
        sIdArr:[],
        ptNo:''
      }

    }
  },
  methods:{
    initExecuteRecord(){
      this.doctorEnjoinWhere.ptNo = this.patientObj.ptNo;
      if(this.patientObj.ptNo == undefined){
        return;
      }
      this.axios.post('doctor-where-execute',this.doctorEnjoinWhere).then((v)=>{
        this.patientDoctorExecute = v.data;
        console.log(v.data)
      }).catch();
    },



    //============清空医嘱筛选条件
    emptyExecuteScreen(){
      this.doctorEnjoinWhere = {
        startDate:'',//开始日期
        endDate:'',//结束日期
        searchLike:'',//模糊搜索
        doctorType:0,//医嘱类型
        ptNo:''
      };
      this.initExecuteRecord();
    },


    //====医嘱详情分页方法
    doctorEnjoinExecuteSizeChange: function(size) {
      this.patientDoctorExecutePageSize = size;
    },
    //住院申请Current变了调用
    doctorEnjoinExecuteCurrentChange: function(currentPage) {
      this.patientDoctorExecuteCurrentPage = currentPage;
    },
  },
  created() {
    this.initExecuteRecord();
    this.staff = this.$store.state.token.list;//将登录存入的值在取出来
  }
}
</script>

<style scoped>

</style>