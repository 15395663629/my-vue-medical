<template>
	<h1>药品采购</h1>
	<el-row>
		<el-col :span="3">
			<el-input placeholder="请输入经手人" v-model="input" clearable></el-input>
		</el-col>
		<el-col :span="6">
			<el-date-picker v-model="value1" type="date" placeholder="选择采购日期"></el-date-picker>
			<el-button type="primary" size="small" icon="el-icon-search">搜索</el-button>
		</el-col>
		<el-col :span="2" :offset="12">
			<el-button type="primary" size="small" @click="openCgjh">新增采购计划</el-button>
    </el-col>
      <!-- ----------------------------------------------------新增计划弹窗---------------------------------------------------- -->
			<el-dialog @close="fromdata" title="采购计划" v-model="dialogFormVisible">
				<el-form :model="caigou" ref="caigou" :rules="rules">
          <el-button type="primary" size="mini" @click="open = true">添加药品</el-button>
          <el-row>
            <el-col :span="12">
              <el-form-item label="采购编号">
                <el-input style="width: 215px;" disabled v-model="caigou.ykPurchaseId"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10" offset="2">
              <el-form-item label="采购计划名称" prop="ykPurchaseName">
                <el-input style="width: 215px;" v-model="caigou.ykPurchaseName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="采购日期"  prop="ykPurchaseTime">
                <el-date-picker v-model="caigou.ykPurchaseTime" type="date" placeholder="选择采购日期"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="10" offset="4">
              <el-form-item label="经手人" prop="sId">
                <el-select v-model="caigou.sId" placeholder="选择经手人">
                  <el-option v-for="stall in stallform"
                            :label="stall.sname"
                             :value="stall.sid"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
				</el-form>
			    <el-table :data="gridData" height="240" >
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
				<el-table :data="drug.filter(data => !search || data.drugName.toLowerCase().includes(search.toLowerCase()))" height="400px" @selection-change="selectionLineChangeHandle2">
				  <el-table-column type="selection" width="55"/>
				  <el-table-column property="drugName" label="药品名"/>
				  <el-table-column property="ykSupplier.supplierName" label="生产厂商"/>
				  <el-table-column property="drugPrice" label="单价"/>
          <el-table-column align="center">
            <template #header>
              <el-input v-model="search" size="mini" placeholder="输入药品名称搜索"/>
            </template>
          </el-table-column>
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
        <el-table-column property="drugId" label="药品编号"></el-table-column>
        <el-table-column property="ykPurchaseId" label="采购编号"></el-table-column>
        <el-table-column prop="yfDruginformation.drugName" label="药品名称"></el-table-column>
        <el-table-column property="ykSupplier.supplierName" label="供应商"/>
        <el-table-column label="采购数量">
          <template #default="scope">
            {{scope.row.ykChaseCount}}
          </template>
        </el-table-column>
        <el-table-column property="drugPrice" label="药品进价"></el-table-column>
        <el-table-column label="小计">
          <template #default="scope">
            {{scope.row.ykChaseCount*scope.row.drugPrice}}
          </template>
        </el-table-column>
      </el-table>
      <template #footer>
				  <span class="dialog-footer">
				    <el-button type="primary" @click="mingxi = false">确 定</el-button>
				  </span>
      </template>
    </el-dialog>
	</el-row>
  <!-- ------------------------------------------------------------表格数据--------------------------------------------------- -->
  <el-row :gutter="20">
		<el-col>
			<el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" stripe style="width: 100%;">
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
            <el-button type="danger" plain size="small" @click="execute(scope.row.ykPurchaseId)">执行计划</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-col>
	</el-row>
  <!-- 分页 -->
  <el-pagination
      style="text-align: center"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 40]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.length">
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
        currentPage:1, //初始页
        pagesize:8,    //    每页的数据
        pagesizesize:4,  //药品详情每页显示四条数据
        search: '',//添加药品搜索框（药品选择）
        //校验
        rules: {
          ykPurchaseName: [
            { required: true, message: '请输入计划名称', trigger: 'blur' },
          ],
          ykPurchaseTime: [
            {
              type: 'date',
              required: true,
              message: '请选择时间',
              trigger: 'change',
            },
          ],
          sId: [
            { required: true, message: '请选择经手人', trigger: 'change' },
          ],
        },
      }
    },
		methods: {
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
        var caigou = "CG";
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
        var id = caigou + year + month + date + hours + minutes + seconds + num;
        return id;
      },
      //绑定随机生成编号
      openCgjh(){
        this.dialogFormVisible =true;
        this.caigou.ykPurchaseId = this.getProjectNum() //+ Math.floor(Math.random() * 10000);//根据获取到的id来生成编号前面是年月日后面是随机生成随机四位数
        /*  // 调用获取当前日期的方法加四位随机数  赋值表单中的项目编号
     this.form.number = this.getProjectNum() + Math.floor(Math.random() * 10000)  // 如果是6位或者8位随机数，相应的 *1000000或者 *100000000就行了*/
      },
      //大表格
      selectionLineChangeHandle2 (val) {
        this.drugInfosC = val;
        for(var i = 0; i< this.drugInfosC.length; i++){
          console.log('id:'+this.drugInfosC[i].drugId)
          console.log('number:'+this.drugInfosC[i])
          console.log('编号:'+this.drugInfosC[i].drugId)
          console.log('数量:'+this.drugInfosC[i])
        }
      },
      /*添加计划*/
      insertPuchase(){
        this.$refs['caigou'].validate((s) =>{
          if(s){
            this.caigou.ykDrugpurchasePlanDetails=this.gridData
            this.axios.post("add-plan",this.caigou).then((v)=>{
              this.getData()
              this.fromdata()
            }).catch(function (){

            })
          }else(
              this.$message('请填写字段')
          )
        })
      },
      handleClick(row) {
				console.log(row);
			},
      /*                 -------------------执行计划按钮----------------------                                 */
      zhixing(){
			  console(row)
      },

      getData(ykPurchaseId){
        /*查询采购计划*/
        this.axios.post("all-plan").then((v)=>{
          this.tableData = v.data;
        })
        /*查询采购计划详单*/
        this.axios({url:"all-ydpd",params:{ykPurchaseId:ykPurchaseId}}).then((v)=>{
          this.ydpdform = v.data;
        })

        /*查询经手人  员工表*/
        this.axios.get("all-stall").then((v)=>{
          this.stallform = v.data;
        })

        /*查询药品信息*/
        this.axios.post("drug").then((v)=>{
          this.drug = v.data;
        })
      },
      //打开采购明细弹框
      opemMingxi(row){
        this.mingxi = true;
        //this.ydpdform = obj.ykDrugpurchasePlanDetails;
        this.getData(row.ykPurchaseId);
      },
      /*执行采购计划*/
      execute(ykPurchaseId){
        this.axios.get("zhixing",{params:{ykPurchaseId:ykPurchaseId}}).then((v)=>{
          this.getData()
          console.log(ykPurchaseId)
            this.$message({
              message: '执行成功',
              type: 'success'
            });
        })
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
        },
        this.dialogFormVisible =false
      },
		},
		created() {
      this.getData()
    }
  }
</script>

<style>
	
</style>