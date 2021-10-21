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
  <!--
		<el-col :span="1" :offset="10">
			<el-button type="primary" @click="dialogFormVisible = true">新增入库信息</el-button>
			<el-dialog title="药品入库" v-model="dialogFormVisible">
			  <el-form>
			    <el-form-item label="药品批次" :label-width="formLabelWidth">
			      <el-input autocomplete="off" style="width: 215px;"></el-input>
			    </el-form-item>
				<el-form-item label="药品名" :label-width="formLabelWidth">
				  <el-input autocomplete="off" style="width: 215px;"></el-input>
				</el-form-item>
				<el-form-item label="药品数量" :label-width="formLabelWidth">
					<el-input-number @change="handleChange" :min="1" :max="1000" label="药品数量"></el-input-number>
				</el-form-item>
				<el-form-item label="药品规格" :label-width="formLabelWidth">
					<el-select v-model="form.region" placeholder="药品规格">
					  <el-option label="盒" value="shanghai"></el-option>
					  <el-option label="箱" value="beijing"></el-option>
					  <el-option label="包" value="beijing"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="采购价" :label-width="formLabelWidth">
				  <el-input autocomplete="off" style="width: 215px;"></el-input>
				</el-form-item>
			    <el-form-item label="生产厂家" :label-width="formLabelWidth">
			      <el-input autocomplete="off" style="width: 215px;"></el-input>
			    </el-form-item>
			    <el-form-item label="入库日期" :label-width="formLabelWidth">
			    	<el-date-picker v-model="value1" type="date" placeholder="选择采购日期"></el-date-picker>
			    </el-form-item>
			    <el-form-item label="经手人" :label-width="formLabelWidth">
			    	<el-select v-model="form.region" placeholder="选择经手人">
			    	  <el-option label="张三" value="shanghai"></el-option>
			    	  <el-option label="李四" value="beijing"></el-option>
			    	  <el-option label="王五" value="beijing"></el-option>
			    	</el-select>
			    </el-form-item>
				<el-form-item label="仓库" :label-width="formLabelWidth">
					<el-select v-model="form.region" placeholder="选择仓库">
					  <el-option label="中药仓" value="shanghai"></el-option>
					  <el-option label="西药仓" value="beijing"></el-option>
					  <el-option label="冷藏仓" value="beijing"></el-option>
					</el-select>
				</el-form-item>
			  </el-form>
			  <template #footer>
			    <span class="dialog-footer">
			      <el-button @click="dialogFormVisible = false">取 消</el-button>
			      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
			    </span>
			  </template>
			</el-dialog>
		</el-col>
	</el-row>
	<el-row>-->
		<el-col>
			<el-table :data="daitukuForm" style="width: 100%;">
				<el-table-column prop="ykPurchaseId" label="采购编号"/>
				<el-table-column prop="ykPurchaseName" label="计划名称" />
        <el-table-column property="ykPurchaseTime" label="执行时间" />
				<el-table-column fixed="right" label="操作">
					<template #default="scope">
						<el-button @click="handleClick(scope.row.ykPurchaseId)" type="primary" plain size="small">查看详情</el-button>
						<el-button type="success" plain size="small" @click="tongguoshenhe(scope.row)">通过审核</el-button>
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
          <el-table-column property="ykChaseCount" label="入库数量" width="150px">
            <template #default="scope">
              <el-input-number v-model="scope.row.ykChaseCount" style="width:120px;" size="mini" >
              </el-input-number>
            </template>
          </el-table-column>
          <el-table-column property="ykDate" label="保质期" width="300px">
            <template #default="scope">
              <el-date-picker v-model="scope.row.ykDate" type="date"  placeholder="选择保质期" />
            </template>
          </el-table-column>
          <el-table-column property="ykBatch" label="药品批次" width="200px">
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
      console.log(this.ydpdform)
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
        var ydpdform = row
        var grant = JSON.stringify({str:row})
        console.log(grant,"444")
        console.log(row,"33333")
        this.axios.post("putstorage",qs.stringify({grant:grant})).then((v)=>{
          // this.ydpdform = v.data;
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