<template>
	<h1 style="margin-bottom: 15px;font-size: 26px;">住院申请</h1>
	
	
	<el-dialog title="新增申请住院信息" v-model="isShowXZBR">
		
		<el-form :model="baseInfo" ref="baseForm" :rules="baseFormRules" >
			
			<el-row>
				<el-col :span="1"></el-col>
				
				<el-col :span="9">
					<el-form-item prop="name" label="诊疗编号" label-width="70px" >
						<el-input v-model="baseInfo.name"></el-input>
					</el-form-item>
				</el-col>
				
				<el-col :span="2"></el-col>
				
				<el-col :span="9">
					<el-form-item prop="zdxx" label="诊断信息" label-width="70px">
						<el-input disabled v-model="baseInfo.zdxx"></el-input>
					</el-form-item>
				</el-col>
				
				<el-col :span="1"></el-col>
			</el-row>
			
			<el-row>
				<el-col :span="1"></el-col>
				
				<el-col :span="9">
					<el-form-item prop="idCardNo" label="病人姓名" label-width="80px" >
						<el-input v-model="baseInfo.idCardNo" disabled></el-input>
					</el-form-item>
				</el-col>
				
				<el-col :span="2"></el-col>
				
				<el-col :span="9">
					<el-form-item label="科室" label-width="70px">
						<el-input disabled model-value="当前登录科室"></el-input>
					</el-form-item>
				</el-col>
				
				<el-col :span="1"></el-col>
			</el-row>
			
			
			<el-row>
				<el-col :span="1"></el-col>
				
				<el-col :span="9">
					<el-form-item label="性别" label-width="70px" >
						<el-input v-model="baseInfo.sex" disabled></el-input>
					</el-form-item>
				</el-col>
				
				<el-col :span="2"></el-col>
				
				<el-col :span="9">
					<el-form-item label="身份证" label-width="70px">
						<el-input v-model="baseInfo.birthday" disabled></el-input>
					</el-form-item>
				</el-col>
				
				<el-col :span="1"></el-col>
			</el-row>
			
			<el-row>
				<el-col :span="1"></el-col>
				
				<el-col :span="9">
					<el-form-item label="年龄" label-width="70px" >
						<el-input v-model="baseInfo.age" disabled ></el-input>
					</el-form-item>
				</el-col>
				
				<el-col :span="2"></el-col>
				
				<el-col :span="9">
					<el-form-item label="出生日期" label-width="70px">
						<el-input v-model="baseInfo.birthplace" disabled ></el-input>
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
			<el-button @click="isShowXZBR = true" type="primary">新增</el-button>
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
				      label="病人编号"
					  prop="inId"
				      >
				    </el-table-column>
				    <el-table-column
				      prop="inName"
				      label="病人名称">
				    </el-table-column>
				    <el-table-column
				      prop="inDiagnosis"
				      label="诊断结果">
				    </el-table-column>
					<el-table-column
					  prop="inProposer"
					  label="申请人">
					</el-table-column>
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
						  	<el-button size="mini" type="danger" icon="el-icon-delete" @click="delEmp(scope.row)">取消申请</el-button>
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
	            staff:'',
	            baseFormRules: {  
					idCardNo: [
						{ required: true, message: '身份证号不能为空', trigger: 'blur' },
						{ validator: this.checkCard, trigger: 'blur' }
					],
				},
				InhospitalApply:{inId:'1',inDiagnosis:'骨质增生',inProposer:'s',inApplyDate:'2021-06-23',inName:"张三",ksName:'骨科'},
				InhospitalApplyArr:[
					{inId:'1',inDiagnosis:'骨质增生',inProposer:'小丽',inApplyDate:'2021-06-23',inName:"张三",ksName:'骨科'}
				],
	            baseInfo: {
					name:'',
					zdxx:'',
					idCardNo:'',
					baseInfo:'',
					sex:'',
					age:'',
					birthday:'',
					birthplace:''
				},
	            area: {11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",
	            31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",
	            43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",
	            61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"
	            },
	            Wi: [7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2 ],
	            ValideCode: [1,0,'X',9,8,7,6,5,4,3,2],
				isShowXZBR:false
	            
	        }
	    
	    },
	
	
	    methods: {
	 
	      // 检测身份证
	      checkCard() {
	        if(!this.baseInfo.idCardNo) return;
	        let CardId = this.baseInfo.idCardNo;
	        if(CardId.length == 15) {
	          if(this.is15Card(CardId)) {
	            this.go(CardId.length);
	          }
	          else {
	            return this.$message({type: 'error', message: '您的身份证号有误！请输入你真实的身份证号'});
	          }
	        } else if (CardId.length == 18) {
	          let a_iden = CardId.split("");
	          if (this.is18Card(CardId) && this.is18CardEnd(a_iden) ) {  // && this.is18CardEnd(a_iden)
	            this.go(CardId.length);
	            return this.is18Card(CardId);
	          }
	          else {
	            return this.$message({type: 'error', message: '您的身份证号有误！请输入你真实的身份证号'});
	          }
	        } else {
	          return this.$message({type: 'error', message: '您的身份证号有误！请输入你真实的身份证号'});
	        }
	      },
	 
	      // 检测18位身份证号最后一位是否符合要求
	      is18CardEnd(a_idCard) {
	        let sum = 0;
	        if (a_idCard[17].toLowerCase() == 'x') {
	          a_idCard[17] = 10;
	        }
	        for ( var i = 0; i < 17; i++) {
	          sum += this.Wi[i] * a_idCard[i];
	        }
	        let valCodePosition = sum % 11;
	        if (a_idCard[17] == this.ValideCode[valCodePosition]) {
	          return true;
	        } else {
	          return false;
	        }
	      },
	 
	      // 验证最后一位校正码
	      is18Card(idCard18){
	        let year =  idCard18.substring(6,10);
	        let month = idCard18.substring(10,12);
	        let day = idCard18.substring(12,14);
	        let temp_date = new Date(year,parseFloat(month)-1,parseFloat(day));
	        if(temp_date.getFullYear()!=parseFloat(year)
	          ||temp_date.getMonth()!=parseFloat(month)-1
	          ||temp_date.getDate()!=parseFloat(day)){
	          return false;
	        }else{
	          return true;
	        }
	      },
	 
	      is15Card(idCard15){
	        let year =  idCard15.substring(6,8);
	        let month = idCard15.substring(8,10);
	        let day = idCard15.substring(10,12);
	        let temp_date = new Date(year,parseFloat(month)-1,parseFloat(day));
	        if(temp_date.getYear()!=parseFloat(year)||temp_date.getMonth()!=parseFloat(month)-1 ||temp_date.getDate()!=parseFloat(day)) {
	          return false;
	        }else{
	          return true;
	        }
	      },
	 
	      // 实现自动生成生日，性别，年龄
	      go(val) {
	        let iden = this.baseInfo.idCardNo;
	        let sex = null;
	        let birth = null;
	        let myDate = new Date();
	        let month = myDate.getMonth() + 1;
	        let day = myDate.getDate();
	        let age = 0;
	 
	        if(val===18){
	          age = myDate.getFullYear() - iden.substring(6, 10) - 1;
	          sex = iden.substring(16,17);
	          birth = iden.substring(6,10)+"-"+iden.substring(10,12)+"-"+iden.substring(12,14);
	          if (iden.substring(10, 12) < month || iden.substring(10, 12) == month && iden.substring(12, 14) <= day) age++;
	 
	        }
	        if(val===15){
	          age = myDate.getFullYear() - iden.substring(6, 8) - 1901;
	          sex = iden.substring(13,14);
	          birth = "19"+iden.substring(6,8)+"-"+iden.substring(8,10)+"-"+iden.substring(10,12);
	          if (iden.substring(8, 10) < month || iden.substring(8, 10) == month && iden.substring(10, 12) <= day) age++;
	        }
	 
	        if(sex%2 === 0)
	          sex = '女';
	        else
	          sex = '男';
	        this.baseInfo.sex = sex;
	        this.baseInfo.age = age;
	        this.baseInfo.birthday = birth;
	        this.baseInfo.birthplace = this.area[iden.substring(0,2)];
	        console.log(this.baseInfo)
	      }
	    },
    created() {
	      this.staff = this.$store.state.token;
	      console.log(this.staff)
    }

  }
</script>

<style>
</style>
