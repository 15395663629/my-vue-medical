<template >
	<div>
		<el-row>
			<el-col :span="8">
				<el-tabs v-model="indexObs" stretch  ><!-- @tab-click="selectRecord" -->


					<el-tab-pane  label="人员列表" :key="0" name ="0"> <!--@row-click="addTopHeader"-->
            <el-input @input="getData"  v-model="sermen" placeholder="请输入你要查询的体检人员"></el-input>
                <el-table :data="tjman" height="510"  size="mini" tooltip-effect="dark" style="width: 100%;">
                  <el-table-column
                      label="编号"
                      prop="manId"
                  >
                  </el-table-column>
                  <el-table-column
                      prop="manName"
                      label="姓名">
                    <template #default="scope">
                      <el-popover effect="light" trigger="hover"  width="200px" placement="top">
                        <template #default>
                          <p>姓名: {{ scope.row.manName }}</p>
                          <p>性别: {{ scope.row.manGender }}</p>
                          <p>年龄: {{ scope.row.manAge }}</p>
                          <p>手机号: {{ scope.row.manPhone }}</p>
                          <p>出生日期: {{ scope.row.manBirthtime }}</p>
                          <p>身份证: {{ scope.row.manSid }}</p>
                        </template>
                        <template #reference>
                          <div class="name-wrapper">
                            <el-tag size="medium">{{ scope.row.manName }}</el-tag>
                          </div>
                        </template>
                      </el-popover>
                    </template>
                  </el-table-column>
                  <el-table-column
                      prop="manPhy"
                      label="价格">
                  </el-table-column>
                  <el-table-column label="部门">
                    <template #default="scope">
                      <div class="name-wrapper">
                        <el-tag :type="scope.row.manMzZyIs==1?'success':(scope.row.manMzZyIs==2?'warning':'info')" size="medium">{{ scope.row.manMzZyIs==1?'门诊':(scope.row.manMzZyIs==2?'住院':'体检') }}</el-tag>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                      width="100px"
                      label="操作">
                    <template #default="scope">
                      <el-button size="mini" @click="resdata(scope.row)" type="primary" plain>选择</el-button>
                    </template>
                  </el-table-column>

                </el-table>
					</el-tab-pane>
				<!--              table2                                             ===============-->
					<el-tab-pane label="检查列表" :key="1" name="1">
            <el-table
                highlight-current-row
                @cell-click="jcdata"
                :data="tjres" height="550"  size="mini"  tooltip-effect="dark" style="width: 100%;">
              <el-table-column
                  label="编号"
                  prop="checkId"
              >
              </el-table-column>
              <el-table-column
                  prop="pro.checkName"
                  label="项目名称">
                <template #default="scope">
                  <el-popover effect="light" trigger="hover"  width="200px" placement="top">
                    <template #default>
                      <p>项目名称: {{ scope.row.pro.checkName }}</p>
                    </template>
                    <template #reference>
                      <div class="name-wrapper">
                        <el-tag size="medium">{{ scope.row.pro.checkName }}</el-tag>
                      </div>
                    </template>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column
                  prop="pro.checkPay"
                  label="价格">
              </el-table-column>
              <el-table-column
                  prop="manTime"

                  label="申请时间">
              </el-table-column>
              <el-table-column
                  width="100px"
                  label="状态">
                <template #default="scope">
                  <div class="name-wrapper">
                    <el-tag :type="scope.row.manResult==null?'warning':'success'" size="medium">{{ scope.row.manResult==null?'未填写':'已填写' }}</el-tag>
                  </div>
                </template>
              </el-table-column>
            </el-table>
					</el-tab-pane>
				
				</el-tabs>
				
				
				
				
				
			</el-col>
			<el-col :span="16" >
				<el-row >
					<el-form   status-icon label-width="95px" style="margin-top: 20px;">
						<el-col  style="height: 40px">
							<el-form-item label="就诊号" >
								<el-input size="mini" v-model="man1.manMzZyId"  disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col style="height: 40px">
							<el-form-item label="姓名" >
								<el-input size="mini"  v-model="man1.manName" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col  style="height: 40px">
							<el-form-item label="性别" >
								<el-input size="mini" v-model="man1.manGender" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col style="height: 40px">
							<el-form-item label="年龄" >
								<el-input size="mini"  v-model="man1.manAge"  disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col style="height: 45px">
							<el-form-item label="诊断医生" >
								<el-input size="mini" v-model="hb.zdys" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col style="height: 45px">
							<el-form-item label="诊断科室" >
								<el-input size="mini" v-model="hb.zdks"  disabled></el-input>
							</el-form-item>
						</el-col>
						
						<el-col style="height: 45px;width: 420px; margin-top: 10px;">
							<el-form-item label="身份证" label-width="120px" >
								<el-input size="mini" v-model="man1.manSid"  disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col style="height: 45px; width: 420px; margin-top: 10px;">
							<el-form-item label="申请时间" label-width="120px" >
								<el-input size="mini" v-model="manres.manTime"  disabled></el-input>
							</el-form-item>
						</el-col> 
						<el-col style="height: 45px; width: 420px;">
							<el-form-item label="检查指标"  label-width="120px" >
								<el-input size="mini" v-model="hb.jczb"  disabled></el-input>
							</el-form-item>
						</el-col>
						
						
						<el-col style="height: 45px ;width: 420px;">
							<el-form-item label="指标意义" label-width="120px" >
								<el-input size="mini" v-model="hb.zbyy"   disabled></el-input>
							</el-form-item>
						</el-col>
						




						<el-col style="height: 200px ;width: 420px; margin-top: 10px;" >
							<el-form-item label="检查结果" style="width: 400px;">
								<el-input style="width: 320px;" v-model="manres.manResult"  placeholder="请输入病理原因"
								rows="12" type="textarea" size="mini" maxlength="1000"
								           show-word-limit>
								</el-input>
							</el-form-item>
						</el-col>
						
						<el-col style="height: 200px ;width: 420px; margin-top: 10px;" >
							<el-form-item label="医生建议" style="width: 400px;">
								<el-input style="width: 325px;" v-model="man1.manProposal"  placeholder="请输入病理原因"
								rows="12" type="textarea" size="mini" maxlength="1000"
								           show-word-limit>
								</el-input>
							</el-form-item>
						</el-col>
            <el-col style="height: 45px;float: right;margin-right: 25px; margin-top: 40px;" >
              <el-form-item label-width="20px">
                <el-button size="small" @click="jcedit"  type="primary" style="width: 130px;" icon="el-icon-s-claim">
                  保存
                </el-button>
              </el-form-item>
            </el-col>
					</el-form>
				</el-row>
			</el-col>
			
		</el-row>
		
		<!-- table=============================== -->

	</div>
</template>

<script >
	export default {
		data() {
			return {
        tjman:[],//人员列表
        sermen:'',//人员列表搜索
        manrrs:[],//项目对应人员对象
				indexObs:0,
        tjres:[],//单个人员所含结果
        resdata1:[],//暂时对象存row
        // 体检人员对象
        man1: {
          manId:0,
          manName: '',
          manSid: '',
          manGender: '',
          manTime: '',
          manBirthtime: '',
          manAge: '',
          manPhone: '',
          manPhy: '',
          manState: '',
          manProposal:'',
          manMzZyId:'',
          manMzZyIs:'',
        },
        hb: {//候补对象
          zdys: '',
          zdks: '',
          jczb: '',
          zbyy: ''
        },
        manres: {//结果对象
          manResultId: '',
          checkId: '',
          manResult: '',
          manId: '',
          manDate: '',
          manTime: '',
          sId: ''
        },
        }
		},
		 methods: {
       // 体检人员未填写
       getData() {
         this.axios.get("http://localhost:8089/allMan1", {
           params: {
             sermen: this.sermen
           }
         }).then((res) => {
           this.tjman = res.data;
         }).catch()
       },

       //选择检查人员检查结果查询
       resdata(row){
          this.resdata1=row
         this.axios.get("http://localhost:8089/aloneRes", {
           params: {
             manId:row.manId
           }
         }).then((res) => {
           this.tjres = res.data;
         }).catch()
         this.indexObs="1",
             this.man1.manId=row.manId,
             this.man1.manName=row.manName,
             this.man1.manSid=row.manSid,
             this.man1.manGender=row.manGender,
             this.man1.manTime=row.manTime,
             this.man1.manBirthtime=row.manBirthtime,
             this.man1.manAge=row.manAge,
             this.man1.manPhone=row.manPhone,
             this.man1.manPhy=row.manPhy,
             this.man1.manState=row.manState,
             this.man1.manProposal=row.manProposal,
             this.man1.manMzZyIs=row.manMzZyIs,
             this.man1.manMzZyId=row.manMzZyId
       },
       //选择检查项目
       jcdata(row){
          this.hb.zbyy=row.pro.indexSignificance
          this.hb.zdks=row.staff.ks.ksName
          this.hb.zdys=row.staff.sname
          this.hb.jczb=row.pro.indexName
         // this.axios.get("http://localhost:8089/allMan3", {
         //   params: {
         //     manId:row.manId
         //   }
         // }).then((res) => {
         //   this.manrrs = res.data;
         // }).catch()
         this.man1.manProposal=row.man.manProposal

         this.manres.manResultId=row.manResultId
         this.manres.checkId=row.checkId
         this.manres.manResult=row.manResult
         this.manres.manId=row.manId
         this.manres.manDate=row.manDate
         this.manres.manTime=row.manTime
         this.manres.sId=row.sId
       },
       //保存按钮
       jcedit(){
         // 修改人员
         this.axios.post("http://localhost:8089/addOrUpdataMan1", {manj:this.man1}).then((res) => {
           this.getData()
         }).catch()
         // 修改结果
         this.axios.post("http://localhost:8089/addOrUpdares", {troj: this.manres}).then((res) => {
           this.resdata(this.resdata1)
         }).catch()
         this.$message({
           message: '保存成功',
           type: 'success'
         });

         this.$forceUpdate();
       },
       //清空表格
       inserClear() {
         this.manres= {
           manResultId: '',
           checkId: '',
           manResult: '',
           manId: '',
           manDate: '',
           manTime: '',
           sId: ''
         }
       },
			 filterTag(value, row) {/* 复诊初诊标签方法 */
			 	return row.tag === value;
			 },
			handleEdit(index, row) {
				console.log(index, row);
			},
			  handleDelete(index, row) {
				console.log(index, row);
			}
		},created() {
      this.getData()
    },
	};
</script>

<style>
::v-deep .el-table tbody tr:hover > td {
  background-color: transparent;
}
</style>

