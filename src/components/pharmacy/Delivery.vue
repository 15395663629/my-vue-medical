<template>
	<h1>出库</h1>
	<el-row>
		<el-col :span="3">
			<el-input placeholder="请输入批次" v-model="input" clearable></el-input>
		</el-col>
		<el-col :span="19">
			<el-date-picker v-model="value1" type="date" placeholder="选择出库日期"/>
			<el-button type="primary" size="small" icon="el-icon-search">搜索</el-button>
		</el-col>
      <el-col :span="1" >
        <el-button type="submit" @click="jiluFromm()" size="mini">查看调拨记录</el-button>
      </el-col>
<!--    =========================================药品调拨的详表========================================  -->
		<el-col>
			<el-dialog title="药品调拨详表" v-model="dialogFormVisible">
        <el-table :data="detail">
          <el-table-column property="ykAllotdetailCount" label="药品数量"/>
          <el-table-column property="ykDrugId" label="药品编号"/>
          <el-table-column property="ykAllotId" label="调拨编号"/>
          <el-table-column property="yfDruginformation.drugName" label="药品名"/>
        </el-table>
			  <template #footer>
			    <span class="dialog-footer">
			      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
			    </span>
			  </template>
			</el-dialog>
		</el-col>

<!-- ==========================================调拨记录表========================================= -->
    <el-col>
      <el-dialog title="调拨记录表" v-model="jiluFrom">
        <el-table :data="ykStorge.slice((currentPage-1)*pagesize,currentPage*pagesize)">
          <el-table-column property="ykStorageId" label="调拨编号"/>
          <el-table-column property="ykStorageCause" label="调拨原因"/>
          <el-table-column property="ykStorageOutorenter" label="出/入库">
            <template #default="scope">
                {{scope.row.ykStorageOutorenter == 1? '入库':'出库'}}
            </template>
          </el-table-column>
          <el-table-column property="staff.sname" label="操作员"/>
          <el-table-column fixed="right" label="操作">
            <template #default="scope">
              <el-button @click="jiluxiangFromm(scope.row)" type="primary" plain size="small">调拨药品记录</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
            style="text-align: center"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5, 10, 20, 40]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="ykStorge.length">
        </el-pagination>
        <template #footer>
			    <span class="dialog-footer">
			      <el-button type="primary" @click="jiluFrom = false">确 定</el-button>
			    </span>
        </template>
      </el-dialog>
    </el-col>
<!--    ======================================调拨记录详表================================== -->
    <el-col>
      <el-dialog title="调拨记录详表" v-model="jiluxiangFrom">
        <el-table :data="ykStorgeDetaile">
          <el-table-column property="ykStorageId" label="调拨编号"/>
          <el-table-column property="yfDruginformation.drugName" label="药品名称"/>
          <el-table-column property="ykStorageDetailCount" label="调拨数量"/>
        </el-table>
      </el-dialog>
    </el-col>
	</el-row>
	<el-row>
		<el-col>
			<el-table :data="ykallot.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%;" height="500px">
        <el-table-column prop="ykAllotId" label="调拨编号" >
					</el-table-column>
				<el-table-column prop="ykAllotCause" label="申请原因">
					</el-table-column>
				<el-table-column prop="ykAllotTime" label="调拨日期">
					</el-table-column>
				<el-table-column prop="staff.sname" label="申请人">
					</el-table-column>
				<el-table-column fixed="right" label="操作">
					<template #default="scope">
						<el-button @click="handleClick(scope.row)" type="primary" plain size="small">查看</el-button>
						<el-button @click="addYkAllot(scope.row)" type="success" plain size="small">通过审核</el-button>
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
      :total="ykallot.length">
  </el-pagination>
</template>

<script>
	export default {
		data() {
			return {
			  staff:{},
				input:'',
				dialogFormVisible: false,//调拨详表的弹
        jiluFrom:false,//出入库记录的弹窗
        jiluxiangFrom:false,//出入库详细记录的弹窗
				value1: '',
        ykallot:[],//调拨主表
        detail:[],//调拨详表
        repertory:[],//药库数据
        ykStorge:[],//调拨记录表
        ykStorgeDetaile:[],//调拨记录详表
        currentPage:1, //初始页
        pagesize:8,//每页的数据
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
      getData(){
        //查询调拨申请
        this.axios.post("all-ykallot").then((v)=>{
          this.ykallot = v.data;
        })
        //查询调拨详表
        this.axios.post("all-detail").then((v)=>{
          this.detail = v.data;
        })
        //查询药库库存
        this.axios.post("YK-repertory").then((v)=>{
          this.repertory = v.data;
        })
        //查询出入库
        this.axios.post("allStorage").then((v)=>{
          this.ykStorge = v.data
        })
        //查询出入库详表
        this.axios.post("allstoragedetail").then((v)=>{
          this.ykStorgeDetaile = v.data
        })
      },
      //执行调拨
      addYkAllot(obj){
        let allotDetail = [];
        allotDetail.push(obj);
        this.axios.post("yk-batch-ykyf",{allotDetail:allotDetail,sId:this.staff.sid}).then().catch();
        this.getData();
        this.$notify({
          title: '调拨成功',
          //message: '调拨成功',
          type: 'success',
        })
      },
      //调拨详细的弹窗
      handleClick(row){
          this.dialogFormVisible = true;
          this.detail = row.ykAllotdetail;
      },
      //调拨记录的弹窗
      jiluFromm(){
        this.jiluFrom = true;
      },
      //调拨记录详细的弹窗
      jiluxiangFromm(row){
        this.jiluxiangFrom = true;
        this.ykStorgeDetaile = row.ykStorageDetails
      }
    },
    created() {
      this.staff = this.$store.state.token.list;//将登录存入的值在取出来  获取当前的员工
		  this.getData();

    }
  }
</script>

<style>

</style>