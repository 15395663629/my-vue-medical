<template>
	<h1>药品信息管理</h1>
	<el-row >
		<el-col :span="4">
			<el-input placeholder="请输入药品名" v-model="input" clearable></el-input>
		</el-col>
		<el-col :span="8">
			<el-button type="primary" icon="el-icon-search">搜索</el-button>
		</el-col>
		
		<el-col :span="1" :offset="10">
			  <el-button type="primary"  @click="dialogFormVisible = true" >新增药品</el-button>
    </el-col>
      <!-- 药品新增弹窗 -->
			<el-dialog @close="fromdata" title="药品信息" v-model="dialogFormVisible">
			  <el-form :model="form" ref="form">
          <el-row>
            <el-col :span="10">
              <el-form-item label-width="100px" label="是否为处方药">
                <el-radio-group v-model="form.drugPrescription">
                  <el-radio :label="1">处方药</el-radio>
                  <el-radio :label="2">非处方药</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="10" :offset="1">
              <el-form-item label-width="80px" label="保质期(月)">
                <el-input v-model="form.drugPastdate" style="width: 215px"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label-width="80px" label="药品名称">
                <el-input v-model="form.drugName" style="width: 215px;"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10" :offset="1">
              <el-form-item label-width="80px"
                            prop="drugBarcode"
                            label="条形码"
                            :rules="[{ type: 'number',  message: '输入数字'}]">
                <el-input v-model.number="form.drugBarcode"  autocomplete="off" style="width: 215px;" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label-width="80px" label="药品进价">
                <el-input v-model="form.drugPrice" @change="handleChange" :min="1" :max="1000" style="width: 215px" label="药品价格"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10" :offset="1">
              <el-form-item label-width="80px" label="药品规格">
                <el-select  v-model="form.ykSpecId" placeholder="请选规格">
                  <el-option v-for="spec in specfrom"
                             :label="spec.specSpecification"
                             :value="spec.specId">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label-width="80px" label="生产厂家">
                <el-select v-model="form.ykSupplierId" placeholder="请选厂家">
                  <el-option v-for="supp in suppfrom"
                             :label="supp.supplierName"
                             :value="supp.supplierId">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10" :offset="1">
              <el-form-item label-width="80px" label="药品类别">
                <el-select  v-model="form.yfDrcaId" placeholder="请选类别">
                  <el-option v-for="drca in drcafrom"
                             :label="drca.yfDrcaName"
                             :value="drca.yfDrcaId">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label-width="80px" label="药品用法">
                <el-input v-model="form.drugUsage" style="width: 215px;"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" :offset="1">
              <el-form-item label-width="80px" label="说明书">
                <el-input v-model="form.drugSpecification" type="textarea" style="width: 215px;"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10" >
              <el-form-item label-width="80px" label="药品功效">
                <el-input v-model="form.drugRemark" style="width: 215px;"></el-input>
              </el-form-item>
            </el-col>

            <el-col v-if="form.drugPrescription == 1" :offset="1" :span="10">
              <el-form-item label-width="90px" label="小单位名称">
                <el-input v-model="form.drugUnit" style="width: 215px;"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="form.drugPrescription == 1">
            <el-col :span="10">
              <el-form-item label-width="90px" label="小单位单价">
                <el-input v-model="form.drugParticle" style="width: 215px;"/>
              </el-form-item>
            </el-col>

            <el-col :span="10" :offset="1">
              <el-form-item label-width="90px" label="小单位数量">
                <el-input v-model="form.drugQuantity" style="width: 215px;"/>
              </el-form-item>
            </el-col>
          </el-row>
			  </el-form>
			  <template #footer>
			    <span class="dialog-footer">
			      <el-button @click="fromdata()">取 消</el-button>
			      <el-button type="primary" @click="addPharmacy()">确 定</el-button>
			    </span>
			  </template>
			</el-dialog>
	</el-row>
	<el-row>
		<el-col>
			<el-table
			    :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
			    style="width: 100%" height="500">
			    <el-table-column type="expand">
              <template #default="props">
                <el-form inline>
                  <el-form-item style="color: cornflowerblue" label="药品编号">
                    {{ props.row.drugId }}
                  </el-form-item>
                  <el-form-item style="color: cornflowerblue" label="生产厂家">
                    {{ props.row.ykSupplier.supplierName }}
                  </el-form-item>
                  <el-form-item style="color:cornflowerblue" label="规格">
                    {{ props.row.ykDrugspecifcations.specSpecification }}
                  </el-form-item>
                  <el-form-item style="color:cornflowerblue" label="单粒价格">
                    {{props.row.drugParticle}}
                  </el-form-item>
                  <el-form-item style="color:cornflowerblue" label="每瓶数量">
                    {{props.row.drugQuantity}}
                  </el-form-item>
                  <el-form-item style="color:cornflowerblue" label="药品说明书">
                    {{props.row.drugSpecification}}
                  </el-form-item>
                  <el-form-item style="color:cornflowerblue" label="药品用法">
                    {{props.row.drugUsage}}
                  </el-form-item>
                  <el-form-item style="color:cornflowerblue" label="药品单位">
                    {{props.row.drugUnit}}
                  </el-form-item>
                  <el-form-item style="color:cornflowerblue" label="保质期(月)">
                    {{props.row.drugPastdate}}
                  </el-form-item>
                </el-form>
			      </template>
			    </el-table-column>
			    <el-table-column
			      label="药品名称"
			      prop="drugName">
			    </el-table-column>
			    <el-table-column
			      label="药品进价"
			      prop="drugPrice">
			    </el-table-column>
				<el-table-column
				  label="药品类别"
				  prop="yfDrugcategory.yfDrcaName">
				</el-table-column>
				<el-table-column
				  label="条形码"
				  prop="drugBarcode">
				</el-table-column> 
        <el-table-column
            label="药品功效"
            prop="drugRemark">
        </el-table-column>
        <el-table-column
            label="处方药"
            prop="drugPrescription">
          <template #default="scope">
            {{scope.row.drugPrescription == 1?'处方药':'非处方药'}}
          </template>
        </el-table-column>
				<el-table-column
				  label="操作">
					<template #default="scope">
						<el-button type="primary" plain size="mini" @click="updatePharmacy(scope.row)">编辑</el-button>
            <el-button type="success" plain size="mini" @click="cg">药品订购</el-button>
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
        tableData: [],
        input:'',
        dialogFormVisible: false,
        xiugai:false,
        form: {
          drugId:'',
          drugName:'',
          drugBarcode:'',
          drugPrice:'',
          drugUsage:'',
          ykSpecId:'',
          ykSupplierId:'',
          yfDrcaId:'',
          drugUpper:'',
          drugRemark:'',
          drugUnit:'',
          yfDrcaId:'',
          ykSpecId:'',
          drugSpecification:'',
          supplierId:'',
          drugPastdate:'',
          drugParticle:'',//单粒价格
          drugQuantity:'',//每瓶数量
          drugPrescription:2,//是否为处方药
        },
        currentPage:1, //初始页
        pagesize:8,    //    每页的数据
        specfrom:[],
        suppfrom:[],
        drcafrom:[],
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
      //跳转链接
      cg() {
        this.$router.push('/CG')
      },
      /*查询所有药品数据*/
      getData(){
			  this.axios.post("yp-all").then((res)=>{
			    console.log(res)
			    this.tableData = res.data;
        }).catch()
        /*查询下拉框的数据*/
        this.axios.get("all-spec").then((res)=>{
          this.specfrom = res.data;
          console.log(res.data)
        }).catch()
        this.axios.get("all-supp").then((res)=>{
          this.suppfrom = res.data;
          console.log((res.data))
        }).catch()
        this.axios.get("all-drca").then((res)=>{
          this.drcafrom = res.data
          console.log(res.data)
        })
      },
      /*新增药品*/
      addPharmacy(){
        console.log(this.form)
        this.axios.post("yp-add",this.form).then((v)=>{
            this.getData();
            this.fromdata();
        }).catch(function (){

        })
      },
      updatePharmacy(row){
            this.form.drugId = row.drugId;
            this.form.drugName = row.drugName
            this.form.drugBarcode = row.drugBarcode
            this.form.drugPrice = row.drugPrice
            this.form.drugUsage = row.drugUsage
            this.form.ykSpecId = row.ykSpecId
            this.form.ykSupplierId = row.ykSupplierId
            this.form.yfDrcaId = row.yfDrcaId
            this.form.drugUpper = row.drugUpper
            this.form.drugRemark = row.drugRemark
            this.form.drugUnit = row.drugUnit
            this.form.drugSpecification = row.drugSpecification
            this.form.drugPastdate = row.drugPastdate
            this.form.drugParticle = row.drugParticle
            this.form.drugQuantity = row.drugQuantity

            this.form.drugPrescription = row.drugPrescription
        this.dialogFormVisible = true;
        this.getData();
      },
      /*清空表单*/
      fromdata(){
        this.form = {
          drugId:'',
          drugName:'',
          drugBarcode:'',
          drugPrice:'',
          drugUsage:'',
          ykSpecId:'',
          ykSupplierId:'',
          yfDrcaId:'',
          drugUpper:'',
          drugRemark:'',
          drugUnit:'',
          yfDrcaId:'',
          ykSpecId:'',
          drugSpecification:'',
          supplierId:'',
          drugPastdate:'',
          drugParticle:'',//单粒价格
          drugQuantity:'',//每瓶数量
          drugPrescription:2,//是否为处方药
        };
        this.dialogFormVisible = false
      },
		},
    created(){
      this.getData()
    },
	}
</script>

<style scoped>
	.works{
		padding: 15px;
	}
</style>