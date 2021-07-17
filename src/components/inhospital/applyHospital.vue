<template>
	<el-dialog title="新增申请住院信息" v-model="isShowXZBR">

		<el-form :model="InhospitalApplyObj" ref="baseForm" :rules="baseFormRules" >
			
			<el-row>
				<el-col :span="1"></el-col>
				
				<el-col :span="6">
					<el-form-item prop="name" label="诊疗编号" label-width="80px" >
						<el-input v-model="InhospitalApplyObj.name"></el-input>
					</el-form-item>
				</el-col>
				
        <el-col :span="4">
          <el-button @click="isShowXZBR = true" type="primary" icon="el-icon-user-solid"></el-button>
        </el-col>
				
				<el-col :span="8">
					<el-form-item prop="zdxx" label="诊断信息" label-width="80px">
						<el-input disabled v-model="InhospitalApplyObj.zdxx"></el-input>
					</el-form-item>
				</el-col>
				
				<el-col :span="1"></el-col>
			</el-row>
			
			<el-row>
				<el-col :span="1"></el-col>
				
				<el-col :span="8">
					<el-form-item prop="idCardNo" label="病人姓名" label-width="80px" >
						<el-input v-model="InhospitalApplyObj.idCardNo" disabled></el-input>
					</el-form-item>
				</el-col>
				
				<el-col :span="2"></el-col>
				
				<el-col :span="8">
					<el-form-item label="科室" label-width="80px">
						<el-input disabled model-value="当前登录科室"></el-input>
					</el-form-item>
				</el-col>
				
				<el-col :span="1"></el-col>
			</el-row>
			
			
			<el-row>
				<el-col :span="1"></el-col>
				
				<el-col :span="8">
					<el-form-item label="性别" label-width="80px" >
						<el-input v-model="InhospitalApplyObj.sex" disabled></el-input>
					</el-form-item>
				</el-col>
				
				<el-col :span="2"></el-col>
				
				<el-col :span="8">
					<el-form-item label="身份证" label-width="80px">
						<el-input v-model="InhospitalApplyObj.birthday" disabled></el-input>
					</el-form-item>
				</el-col>
				
				<el-col :span="1"></el-col>
			</el-row>
			
			<el-row>
				<el-col :span="1"></el-col>
				
				<el-col :span="8">
					<el-form-item label="年龄" label-width="80px" >
						<el-input v-model="InhospitalApplyObj.age" disabled ></el-input>
					</el-form-item>
				</el-col>
				
				<el-col :span="2"></el-col>
				
				<el-col :span="8">
					<el-form-item label="出生日期" label-width="80px">
						<el-input v-model="InhospitalApplyObj.birthplace" readonly="true" ></el-input>
					</el-form-item>
				</el-col>
				
				<el-col :span="1"></el-col>
			</el-row>
		</el-form>
		<template #footer>
				<el-row>
					<el-col :span="18"></el-col>
					<el-col :span="2">
						<el-button @click="addEmp('empFrom')" type="primary">确定</el-button>
					</el-col>
					<el-col :span="1"></el-col>
					<el-col :span="2">
						<el-button @click="isShowZY = false" type="danger">取消</el-button>
					</el-col>
					<el-col :span="1"></el-col>
				</el-row>
				
				
		</template>
		
	</el-dialog>
	
	<el-row>
		<el-col :span="1">
			<el-button size="mini" @click="isShowXZBR = true" type="primary">新增</el-button>
		</el-col>
	</el-row>



	<el-row>
		<el-col>
			<!--=============================================住院申请病人表格===================================-->
				<el-table
				    ref="multipleTable"
				    :data="InhospitalApplyArr"
				    tooltip-effect="dark"
				    style="width: 100%"
				    @selection-change="handleSelectionChange">
				    <el-table-column
				      prop="sick.sickName"
				      label="病人名称">
				    </el-table-column>
          <el-table-column prop="sick.sickSex" label="性别"></el-table-column>
				    <el-table-column
				      prop="inDiagnosis"
				      label="诊断结果">
				    </el-table-column>
					<el-table-column
					  prop="staff.sname"
					  label="申请人">
					</el-table-column>

          <el-table-column prop="inApplyDate" label="申请时间"></el-table-column>

					<el-table-column
					prop="ksName"
					  label="住院科室">
					</el-table-column>
					
					<el-table-column width="200px"
					      align="right">
					      <template  #header>
					        <el-input
					          v-model="fromSearch"
								prefix-icon="el-icon-search"
					          size="small"
					          placeholder="病人名称搜索"/>
					      </template>
						  
						  <!--这里放操作按钮-->
						  <template  #default='scope'>
						  	<el-button size="mini" type="danger" icon="el-icon-delete" @click="callHospital(scope.row)">取消申请</el-button>
						  </template>
					    </el-table-column>
					
				  </el-table>
				  
				  
				  <!--分页插件-->
				   <el-pagination
				  					style="text-align: center;"
				        @size-change="totalCut"
				        @current-change="pageCut"
				        :current-page="1"
				        :page-sizes="[2,4,6,8,10]"
				        :page-size="size"
				        layout="total, sizes, prev, pager, next, jumper"
				        :total="total">
				      </el-pagination>
		</el-col>
	</el-row>
</template>

<script>
	export default {
	    data(){
	        return {
            //====================================住院申请数据
            InhospitalApplyObj:{//住院申请对象
              name:'',
              zdxx:'',
              idCardNo:'',
              baseInfo:'',
              sex:'',
              age:'',
              birthday:'',
              birthplace:''
            },
            InhospitalApplyArr:[],//住院申请数组
            isShowXZBR:false,//是否显示住院申请弹框

          //==========================当前登录的员工信息
            staff:{}

	        }
	    },
	    methods: {
        //=========================初始化住院申请信息
        hospitalInit(){
          this.axios({url:'selectNoHspApply'}).then((v)=>{
            this.InhospitalApplyArr = v.data;
          }).catch((data)=>{

          });
        },

        //取消病人住院申请
        callHospital(row){
          console.log(row);

          this.$confirm("确定要取消住院申请", '确认信息', {
            distinguishCancelAndClose: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(()=>{
            this.axios({url:'updateHspInIs',params:{inId:row.inId}}).then((v)=>{
              this.hospitalInit();//更新数据
              this.$message({
                type: 'success',
                message: '取消成功'
              });
            }).catch((data)=>{
              this.$message({
                type: 'warning',
                message: '取消失败'
              });
            });

            alert("确认")
          }).catch(()=>{
            alert("取消")
          })
        }

	    },
    created() {
	      this.hospitalInit();//初始化信息
	      this.staff = this.$store.state.token[0];
	      console.log(this.staff)
    }

  }
</script>

<style>
.works{
  padding: 15px;
}
</style>
