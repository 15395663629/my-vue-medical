<template>
	<el-row style="height: 40px"> <!-- 选择操作人员================== -->
		<el-form  status-icon  ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-col>
				<el-form-item  label-width="0px">
					<el-input size="small" v-model="mzSickTest"  style="width: 300px;" placeholder="请输入你要查询的卡信息,或持有人信息"></el-input>
          <el-button size="small" type="primary" icon="el-icon-search" @click="likeMcSikc(mzSickTest)">查询</el-button>
        </el-form-item>
			</el-col>
		</el-form>
	</el-row>
	<el-radio-group v-model="radio2" class=" my-radio-group"  size="mini">
	  <el-radio-button label="诊疗卡操作" @click="isShowTable(1)"></el-radio-button>
	  <el-radio-button label="修改挂失记录" @click="isShowTable(2)"></el-radio-button>
	</el-radio-group>
  <!-- 表格是得切换的 -->
  <cardTable1 :mzSickList="mzSickList" v-if="isShow1"></cardTable1>
  <cardTable2 :mzSickList="mzSickList" v-if="isShow2"></cardTable2>


	
	
</template>

<script>
	import {ElMessage} from "element-plus";

  export default{
		data(){
			return{
        isShow1:true,//复选框切换
        isShow2:false,
        mzSickTest:'',//模糊查询
        radio2:"诊疗卡操作",
        wardCurrentPage:1,
        wardPageSize:4,
        mzSickList:[],
        maSickArr:{

        },

			}
		},
		methods:{
			filterTag(value, row) {/* 复诊初诊标签方法 */
				return row.tag === value;
			},
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
      isShowTable(index){ //复选框切换=======================================================
			  console.log(index)
        if(index==2){
          this.isShow1=false;
          this.isShow2=true;
        }else{
          this.isShow1=true;
          this.isShow2=false;
        }
      },
      allDescSick(){//查询界面
        this.axios({
          url:'allDescCard',
          params:{mzSickTest:this.mzSickTest}
        }).then((v)=>{
           this.mzSickList=v.data;
        }).catch();
      },
      likeMcSikc(test){//模糊查询
			  console.log("sssssss")
			  console.log(test)
        this.axios({
          url:'allDescCard',
          params:{mzSickTest:this.mzSickTest}
        }).then((v)=>{
          console.log(v.data)
          this.mzSickList=v.data;
          if(v.data.length <= 0){
            console.log("11111111111")
            ElMessage.warning({
              message: '没有找到相应的内容~',
              type: 'warning'
            });
          }
        }).catch(function(){

        })
      },
		},
    created() {
      this.allDescSick();//刷新界面
    }
  }
</script>

<style>
</style>