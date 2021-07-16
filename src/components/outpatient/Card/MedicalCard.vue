<template>
	<el-row style="height: 40px"> <!-- 选择操作人员================== -->
		<el-form  status-icon  ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-col>
				<el-form-item  label-width="0px">
					<el-input size="small" v-model="mzSickTest"  style="width: 300px;" placeholder="请输入你要查询的卡信息,或持有人信息"></el-input>
          <el-button size="small" type="primary" icon="el-icon-search" @click="likeTable(mzSickTest)">查询</el-button>
        </el-form-item>
			</el-col>
		</el-form>
	</el-row>
	<el-radio-group v-model="radio2" class=" my-radio-group"  size="mini">
	  <el-radio-button label="诊疗卡操作" @click="isShowTable(1)"></el-radio-button>
	  <el-radio-button label="修改挂失记录" @click="isShowTable(2)"></el-radio-button>
	</el-radio-group>
  <!-- 表格是得切换的 -->
  <cardTable1 :mzSickList="mzSickList1" v-if="isShow1"></cardTable1>
  <cardTable2 :mzSickList="mzSickList2" v-if="isShow2"></cardTable2>

	
	
</template>

<script>
	import {ElMessage} from "element-plus";

  export default{
		data(){
			return{
        isShow1:true,//复选框切换
        isShow2:false,
        isTable:1,
        mzSickTest:'',//模糊查询
        radio2:"诊疗卡操作",
        wardCurrentPage:1,
        wardPageSize:4,
        mzSickList1:[],
        mzSickList2:[],

      }
		},
		methods:{
      // 初始病房每页数据数wardpagesize和数据data
      wardHandleSizeChange: function(size) {
        this.wardPageSize = size;
        console.log(this.pagesize) //每页下拉显示数据
      },
      //初始页病房wardcurrentPage
      wardHandleCurrentChange: function(currentPage) {
        this.wardCurrentPage = currentPage;
        console.log(this.currentPage) //点击第几页allDescSick
      },
      isShowTable(index){ //================复选框切换=======================================================
			  console.log(index)
        if(index==2){
          this.isShow1=false;
          this.isShow2=true;
          this.isTable=2;
          console.log(this.isTable)
        }else{
          this.isShow1=true;
          this.isShow2=false;
          this.isTable=1;
          console.log(this.isTable)
        }
      },
      allDescSick(){//查询界面================table1插槽查询界面=======================================================
        this.axios({
          url:'allDescCard'
        }).then((v)=>{
          console.log("table1")
          console.log(v.data)
          this.mzSickList1=v.data;
        }).catch();
      },
      likeMcSikc(mzSickTest){//模糊查询
			  console.log("table1")
        this.axios({
          url:'allDescCard',
          params:{mzSickTest:mzSickTest}
        }).then((v)=>{
          console.log(v.data)
          this.mzSickList1=v.data;
          if(v.data.length <= 0){
            ElMessage.warning({
              message: '没有找到相应的操作内容~',
              type: 'warning'
            });
          }
        }).catch(function(){

        })
      },
      likeTable(mzSickTest){
			  console.log("1111")
        if(this.isTable==1){
          this.likeMcSikc(mzSickTest);
          console.log("111table")
        }else if(this.isTable==2){
          this.likeMcLose(mzSickTest);
          console.log("222table")
        }
      },
      //查询界面================table2插槽查询界面=======================================================
      allAlterLose(){
        this.axios({
          url:'likeAlterLose'
        }).then((v)=>{
          console.log("table2")
          console.log(v.data)
          this.mzSickList2=v.data;
        }).catch();
      },
      likeMcLose(mzSickTest){
        this.axios({
          url:'likeAlterLose',
          params:{like:mzSickTest}
        }).then((v)=>{
          console.log("table2")
          console.log(v.data)
          this.mzSickList2=v.data;
          if(v.data.length <= 0){
            ElMessage.warning({
              message: '没有找到相应的挂失记录~',
              type: 'warning'
            });
          }
        }).catch(function(){

        })
      },
		},
    created() {
      this.allDescSick();//刷新界面table1
      this.allAlterLose();//刷新界面table2
      this.token = this.$store.state.token//获取用户当前系统操作人员
    }
  }
</script>

<style>
</style>