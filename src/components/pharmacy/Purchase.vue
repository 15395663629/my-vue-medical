<template>
	<h1>药品采购</h1>
	<el-row>
		<el-col :span="3">
			<el-input placeholder="请输入经手人" v-model="input" clearable></el-input>
		</el-col>
		<el-col :span="6">
			<el-date-picker v-model="value1" type="date" placeholder="选择采购日期"></el-date-picker>
			<el-button type="primary" icon="el-icon-search">搜索</el-button>
		</el-col>
		<el-col :span="2" :offset="12">
			<el-button type="primary" @click="openCgjh">新增采购计划</el-button>
    </el-col>
      <!-- ----------------------------------------------------新增计划弹窗---------------------------------------------------- -->
			<el-dialog @close="fromdata" title="采购计划" v-model="dialogFormVisible">
        <el-button type="primary" @click="open = true">添加药品</el-button>
				<el-form model="caigou">
          <el-form-item label="采购计划名称">
            <el-input style="width: 215px;" v-model="caigou.ykPurchaseName"></el-input>
          </el-form-item>
					<el-form-item label="采购编号">
					  <el-input style="width: 215px;" disabled v-model="caigou.ykPurchaseId"></el-input>
					</el-form-item>
					<el-form-item label="采购日期">
						<el-date-picker v-model="caigou.ykPurchaseTime" type="date" placeholder="选择采购日期"></el-date-picker>
					</el-form-item>
					<el-form-item label="经手人">
						<el-select v-model="caigou.sId" placeholder="选择经手人">
						  <el-option v-for="stall in stallform"
                        :label="stall.sname"
                         :value="stall.sid"></el-option>
						</el-select>
					</el-form-item>
				</el-form>
			    <el-table :data="gridData" height="200">
              <el-table-column property="drugName" label="药品名" ></el-table-column>
              <el-table-column label="数量" width="150">
                <template #default="scope">
                    <el-input-number v-model="scope.row.ykChaseCount" max="1000" mix="1" size="mini"></el-input-number>
                </template>
              </el-table-column>
              <el-table-column property="ykSupplier.supplierName" label="生产厂商"></el-table-column>
              <el-table-column property="drugPrice" label="单价"></el-table-column>
            <el-table-column property="xj" label="小计">
              <template #default="scope">
              {{scope.row.ykChaseCount *scope.row.drugPrice}}
              </template>

            </el-table-column>
            </el-table>
			  <template #footer>
			    <span class="dialog-footer">
			      <el-button @click="dialogFormVisible = false">取 消</el-button>
			      <el-button type="primary" @click="insertPuchase()">确 定</el-button>
			    </span>
			  </template>
			</el-dialog>
			<!-- 药品选择弹窗 -->
			<el-dialog title="药品选择" v-model="open">
				<el-table :data="drug" @selection-change="selectionLineChangeHandle2">
				  <el-table-column type="selection" width="55"></el-table-column>
				  <el-table-column property="drugName" label="药品名" ></el-table-column>
				  <el-table-column property="ykSupplier.supplierName" label="生产厂商"></el-table-column>
				  <el-table-column property="drugPrice" label="单价"></el-table-column>
				</el-table>
				<template #footer>
				  <span class="dialog-footer">
				    <el-button @click="open = false">取 消</el-button>
				    <el-button type="primary" @click="adddrug()">确 定</el-button>
				  </span>
				</template>
			</el-dialog>
    <!---------------------------------------------------------药品明细弹窗--------------------------------------->
    <el-dialog title="采购药品明细" v-model="mingxi">
      <el-table :data="ydpdform">
        <el-table-column property="ykChaseId" label="详单编号" ></el-table-column>
        <el-table-column property="drugId" label="药品编号"></el-table-column>
        <el-table-column property="ykPurchaseId" label="采购编号"></el-table-column>
        <el-table-column prop="yfDruginformation.drugName" label="药品名称"></el-table-column>
        <el-table-column property="ykSupplier.supplierName" label="生产厂商"></el-table-column>
        <el-table-column label="药品数量">
          <template #default="scope">
            {{scope.row.ykChaseCount}}
          </template>
        </el-table-column>
        <el-table-column property="drugPrice" label="药品单价"></el-table-column>
        <el-table-column label="小计">
          <template #default="scope">
            {{scope.row.ykChaseCount*scope.row.drugPrice}}
          </template>
        </el-table-column>
      </el-table>
      <template #footer>
				  <span class="dialog-footer">
				    <el-button @click="mingxi = false">取 消</el-button>
				    <el-button type="primary" @click="mingxi = false">确 定</el-button>
				  </span>
      </template>
    </el-dialog>
	</el-row>
  <!-- ------------------------------------------------------------表格--------------------------------------------------- -->
  <el-row :gutter="20">
		<el-col>
			<el-table :data="tableData" style="width: 100%;">
				<el-table-column prop="ykPurchaseTime" label="采购日期">
					</el-table-column>
				<el-table-column prop="ykPurchaseId" label="采购编号">
					</el-table-column>
				<el-table-column prop="ykPurchaseName" label="采购计划名称">
					</el-table-column>
				<el-table-column prop="staff.sname" label="经手人姓名">
					</el-table-column>
				<el-table-column prop="ykPurchaseIs" label="是否已执行">
          <template #default="scope">
            <el-tag type="success">
              {{scope.row.ykPurchaseIs == 1? '未执行':'已执行'}}
            </el-tag>
          </template>
        </el-table-column>
				<el-table-column label="操作">
					<template #default="scope">
						<el-button type="primary" plain size="small" @click="opemMingxi(scope.row)">查看明细</el-button>
            <el-button type="danger" plain size="small">删除计划</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-col>
	</el-row>
	<!-- 分页 -->
	<el-pagination
			style="text-align: center;"
	      @size-change="handleSizeChange"
	      @current-change="handleCurrentChange"
	      :current-page="currentPage4"
	      :page-sizes="[100, 200, 300, 400]"
	      :page-size="100"
	      layout="total, sizes, prev, pager, next, jumper"
	      :total="400">
	</el-pagination>
</template>

<script>
	export default {
    data() {
      return {
        caigou:{
          ykPurchaseId:'',
          ykPurchaseName:'',
          ykPurchaseTime:'',
          sId:'',
          ykPurchaseSName:'',
          ykPurchaseIs:'',
          ykDrugpurchasePlanDetails:[]
        },
        numbers:0,
        tableData: [],
        stallform:[],//------员工数据
        ydpdform:[],//------------计划详单
        drug:[],//---------------------------药品信息查询
        mingxi:false,
        //============================药品采购详情数据
        DrugPurchasePlanDetailsObj:{},
        DrugPurchasePlanDetailsArr:[],
        gridData:[],
        input:'',
        dialogFormVisible: false,
        open:false,
        value1: '',
        drugInfosC:[],
      }
    },
		methods: {
      // 生成随机编号     获取当前日期的方法
      getProjectNum () {
        const projectTime = new Date() // 当前中国标准时间
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
        return CurrentDate
      },
      //绑定随机生成编号
      openCgjh(){
        this.dialogFormVisible =true;
        this.caigou.ykPurchaseId = this.getProjectNum() + Math.floor(Math.random() * 1000);//根据获取到的id来生成编号前面是年月日后面是随机生成随机四位数
        /*  // 调用获取当前日期的方法加四位随机数  赋值表单中的项目编号
     this.form.number = this.getProjectNum() + Math.floor(Math.random() * 10000)  // 如果是6位或者8位随机数，相应的 *1000000或者 *100000000就行了*/
      },
      //大表格
      selectionLineChangeHandle2 (val) {
        this.drugInfosC = val;
        console.log(this.drugInfosC);
        for(var i = 0; i< this.drugInfosC.length; i++){
          console.log('id:'+this.drugInfosC[i].drugId)
          console.log('number:'+this.drugInfosC[i])
          console.log('编号:'+this.drugInfosC[i].drugId)
          console.log('数量:'+this.drugInfosC[i])
        }
      },
      /*添加计划*/
      insertPuchase(){
        this.caigou.ykDrugpurchasePlanDetails=this.gridData
        this.axios.post("add-plan",this.caigou).then((v)=>{
          this.getData()
          this.fromdata()
        })
      },
      handleClick(row) {
				console.log(row);
			},
			handleSizeChange(val) {
			    console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			},
      /*                 -------------------执行计划按钮----------------------                                 */
      zhixing(){
			  console(row)
      },
      /*查询采购计划*/
      getData(){
			  this.axios.post("all-plan").then((v)=>{
			    console.log(v)
			    this.tableData = v.data;
        })
        /*查询经手人  员工表*/
        this.axios.get("all-stall").then((v)=>{
          this.stallform = v.data;
        })
        /*查询采购计划详单*/
        this.axios.post("all-ydpd").then((v)=>{
          this.ydpdform = v.data;
        })
        /*查询药品信息*/
        this.axios.post("drug").then((v)=>{
          this.drug = v.data;
        })
      },
      //打开采购明细弹框
      opemMingxi(obj){
        this.mingxi = true;
        this.ydpdform = obj.ykDrugpurchasePlanDetails;
      },
      /*选择药品添加到表格*/
      adddrug(){
        this.gridData=this.drugInfosC;
          this.open=false;
      },
      /*清空表单*/
      fromdata(){
        this.caigou = {
          ykPurchaseId:'',
          ykPurchaseName:'',
          ykPurchaseTime:'',
          sId:'',
          ykPurchaseSName:'',
          ykPurchaseIs:'',
        }
        this.dialogFormVisible =false
      },
		},
		created() {
      this.getData();
    }
  }
</script>

<style>
	
</style>