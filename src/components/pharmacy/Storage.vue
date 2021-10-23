<template>
	<h1>入库</h1>
<el-row>
		<el-col :span="3">
			<el-input placeholder="请输入批次" v-model="input" clearable></el-input>
		</el-col>
		<el-col :span="8">
			<el-date-picker v-model="value1" type="date" placeholder="选择入库日期"></el-date-picker>
			<el-button type="primary" icon="el-icon-search">搜索</el-button>
		</el-col>
		<el-col>
			<el-table :data="daitukuForm" stripe style="width: 100%;">
				<el-table-column prop="ykPurchaseId" label="采购编号"/>
				<el-table-column prop="ykPurchaseName" label="计划名称" />
        <el-table-column property="ykPurchaseTime" label="采购日期" />
				<el-table-column fixed="right" label="操作">
					<template #default="scope">
						<el-button @click="handleClick(scope.row.ykPurchaseId)" type="primary" plain size="small">入库药品</el-button>
						<el-button v-if="scope.row.ykBaocun == 2" type="success" plain size="small" @click="tongguoshenhe(scope.row)">通过审核</el-button>
          </template>
				</el-table-column>
			</el-table>
		</el-col>
    <el-col>
      <el-dialog title="入库明细" v-model="rukumingxi" width="80%" >
        <el-table :data="ydpdform" >
          <el-table-column property="drugId" label="药品编号" width="100px"/>
          <el-table-column property="yfDruginformation.drugName" label="药品名称" width="150px"/>
          <el-table-column property="ykSupplier.supplierName" label="供应商" width="150px"/>
          <el-table-column property="ykChaseCount" label="入库数量" width="100px"/>
          <el-table-column property="ykRuku" label="实际入库数量" width="150px">
            <template #default="scope">
              <el-input-number v-model="scope.row.ykRuku" style="width:120px;" size="mini" >
              </el-input-number>
            </template>
          </el-table-column>
          <el-table-column property="ykDate" label="生产日期" width="300px">
            <template #default="scope">
              <el-date-picker v-model="scope.row.ykDate" type="date"  placeholder="选择生产日期" />
<!--              @change="ykDataChange(scope.row)"-->
            </template>
          </el-table-column>
<!--          <el-table-column  property="ykBatch" label="过期时间" width="200px">
            <template #default="scope">
&lt;!&ndash;              {{addMonth(scope.row.ykDate, scope.YfDruginformation.drugPastdate)}}&ndash;&gt;
            </template>
          </el-table-column>-->
          <el-table-column  property="ykBatch" label="药品批次" width="200px">
            <template #default="scope">
              <el-input v-model="scope.row.ykBatch"/>
            </template>
          </el-table-column>
        </el-table>
        <template #footer>
				    <el-button type="primary" @click="baocun()">保存信息</el-button>
            <el-button type="primary" @click="rukumingxi = false">取 消</el-button>
        </template>
      </el-dialog>
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
      :total="daitukuForm.length">
  </el-pagination>
</template>

<script>
import qs from "qs"
	export default {
		data() {
			return {
        daitukuForm:[],//主表
        ydpdform:[],//详表
				input:'',
        currentPage:1, //初始页
        pagesize:8,    //    每页的数据
        rukumingxi:false,//药品入库明细弹窗
			}
		},
    methods:{ handleSizeChange: function (size) {
        this.pagesize = size;
        console.log(this.pagesize)  //每页下拉显示数据
      },
      handleCurrentChange: function(currentPage){
        this.currentPage = currentPage;
        console.log(this.currentPage)  //点击第几页
      },
      getDate(){
        //查询待入库的药品
        this.axios.post("dairuku").then((v)=>{
          this.daitukuForm = v.data
        })
        /*查询采购计划详单*/

      },
      //保存药品生产日期和批次
      baocun(){
        this.axios.post("preserve",this.ydpdform).then((v)=>{
          this.rukumingxi = false;
          this.getDate();
          if(v.data == "ok"){
            this.$message({
              message: '入库信息保存成功',
              type: 'success'
            });
          }

        })
      },
//查看待入库的药品详情
      handleClick(row){
      this.rukumingxi = true;
        this.axios({url:"all-ydpd",params:{ykPurchaseId:row}}).then((v)=>{
          this.ydpdform = v.data;
          console.log(this.ydpdform,"1111")
        })
     // this.ydpdform = row.ykDrugpurchasePlanDetails;
      },
      //通过审核
      tongguoshenhe(row){
      alert(row.ykPurchaseId);
        this.axios.post("putstorage",{list:row.ykDrugpurchasePlanDetails,ykPurchaseId:row.ykPurchaseId}).then((v)=>{
          this.ydpdform = v.data;
        })
      },

    },
    created() {
      this.getDate();

    }
  }
</script>

<style>
	
</style>