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
			<el-dialog title="新增药品" v-model="dialogFormVisible" width="500px">
			  <el-form :model="form">
			    <el-form-item label="药品名称" :label-width="formLabelWidth">
			      <el-input v-model="form.name" autocomplete="off" style="width: 215px;"></el-input>
			    </el-form-item>
				<el-form-item label="药品价格" :label-width="formLabelWidth">
					<el-input-number v-model="form.qian" @change="handleChange" :min="0.1" :max="1000" label="药品数量"></el-input-number>
				</el-form-item>
			    <el-form-item label="药品用量" :label-width="formLabelWidth">
			      <el-select v-model="form.region" placeholder="请选用量">
			        <el-option label="一日一次" value="shanghai"></el-option>
			        <el-option label="一日两次" value="beijing"></el-option>
					<el-option label="一日三次" value="beijing"></el-option>
			      </el-select>
			    </el-form-item>
				<el-form-item label="药品规格" :label-width="formLabelWidth">
				  <el-select v-model="form.guige" placeholder="请选规格">
				    <el-option label="1/mg" value="shanghai"></el-option>
				    <el-option label="1/袋" value="shanghai"></el-option>
					<el-option label="1/盒" value="shanghai"></el-option>
					<el-option label="1/包" value="shanghai"></el-option>
					<el-option label="1/瓶" value="shanghai"></el-option>
					<el-option label="1/片" value="shanghai"></el-option>
				  </el-select>
				</el-form-item>
				<el-form-item label="药品数量" :label-width="formLabelWidth">
					<el-input-number v-model="form.num" @change="handleChange" :min="1" :max="1000" label="药品数量"></el-input-number>
				</el-form-item>
				<el-form-item label="药品类别" :label-width="formLabelWidth">
				  <el-select v-model="form.leibie" placeholder="请选规格">
				    <el-option label="口服类" value="shanghai"></el-option>
				    <el-option label="注射类" value="shanghai"></el-option>
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
			<!-- 药品修改弹窗 -->
			<el-dialog title="修改药品信息" v-model="xiugai" width="500px">
			  <el-form :model="xiu">
			    <el-form-item label="药品名称" :label-width="formLabelWidth">
			      <el-input v-model="xiu.name" autocomplete="off" style="width: 215px;"></el-input>
			    </el-form-item>
				<el-form-item label="药品价格" :label-width="formLabelWidth">
					<el-input-number v-model="xiu.qian" @change="handleChange" :min="0.1" :max="1000" label="药品数量"></el-input-number>
				</el-form-item>
			    <el-form-item label="药品用量" :label-width="formLabelWidth">
			      <el-select v-model="xiu.region" placeholder="请选用量">
			        <el-option label="一日一次" value="shanghai"></el-option>
			        <el-option label="一日两次" value="beijing"></el-option>
					<el-option label="一日三次" value="beijing"></el-option>
			      </el-select>
			    </el-form-item>
				<el-form-item label="药品规格" :label-width="formLabelWidth">
				  <el-select v-model="xiu.guige" placeholder="请选规格">
				    <el-option label="1/mg" value="shanghai"></el-option>
				    <el-option label="1/袋" value="shanghai"></el-option>
					<el-option label="1/盒" value="shanghai"></el-option>
					<el-option label="1/包" value="shanghai"></el-option>
					<el-option label="1/瓶" value="shanghai"></el-option>
					<el-option label="1/片" value="shanghai"></el-option>
				  </el-select>
				</el-form-item>
				<el-form-item label="药品数量" :label-width="formLabelWidth">
					<el-input-number v-model="xiu.num" @change="handleChange" :min="1" :max="1000" label="药品数量"></el-input-number>
				</el-form-item>
				<el-form-item label="药品类别" :label-width="formLabelWidth">
				  <el-select v-model="xiu.leibie" placeholder="请选规格">
				    <el-option label="口服类" value="shanghai"></el-option>
				    <el-option label="注射类" value="shanghai"></el-option>
				  </el-select>
				</el-form-item>
			  </el-form>
			  <template #footer>
			    <span class="dialog-footer">
			      <el-button @click="xiugai = false">取 消</el-button>
			      <el-button type="primary" @click="xiugai = false">确 定</el-button>
			    </span>
			  </template>
			</el-dialog>
	</el-row>
	<el-row>
		<el-col>
			<el-table
			    :data="tableData"
			    style="width: 100%">
			    <el-table-column type="expand">
			      <template #default="props">
			        <el-form label-position="left" inline class="demo-table-expand">
						<el-form-item style="color:rgb(0,0,255)" label="药品名称">
						  <span>{{ props.row.id }}</span>
						</el-form-item>
			          <el-form-item style="color:rgb(0,0,255)" label="药品价格">
			            <span>{{ props.row.name }}</span>
			          </el-form-item>
					  <el-form-item style="color:rgb(0,0,255)" label="规格">
					    <span>{{ props.row.address }}</span>
					  </el-form-item>
			          <el-form-item style="color:rgb(0,0,255)" label="用量">
			            <span>{{ props.row.shop }}</span>
			          </el-form-item>
					  <el-form-item style="color:rgb(0,0,255)" label="药品类别">
					    <span>{{ props.row.shopId }}</span>
					  </el-form-item>
			        </el-form>
			      </template>
			    </el-table-column>
			    <el-table-column
			      label="药品名称"
			      prop="id">
			    </el-table-column>
			    <el-table-column
			      label="药品价格"
			      prop="name">
			    </el-table-column>
				<el-table-column
				  label="库存数量"
				  prop="sl">
				</el-table-column>
				<el-table-column
				  label="库存预警"
				  prop="yj">
				</el-table-column>
				<el-table-column
				  label="操作">
					<template #default="scope">
						<el-button type="primary" plain size="mini" @click="xiugai = true">编辑药品信息</el-button>

            <el-button type="success" plain size="mini" @click="cg">药品订购</el-button>
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
		methods: {
			handleClick(row) {
				console.log(row);
			},
			handleChange(value) {
				console.log(value);
			},
			handleSizeChange(val) {
			    console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			},
      cg() {
        this.$router.push('/CG')
      },
      getData(){
			  this.axios({
          url:'http://localhost:8089/yp-all',
          params:{}
        }).then((v)=>{
          console.log(v)
          this.tableData = v.data
        }).catch(function (){

        })
      },

		},

		data() {
			return {
				tableData: [{
				          id: '小柴胡颗粒',
				          name: '15',
				          address: '1/包',
				          shop: '一天三次',
				          shopId: '感冒冲剂',
                  sl:50,
                  yj:10
				        }, {
				          id: '复方颗粒',
				          name: '15',
				          address: '1/包',
				          shop: '一天三次',
				          shopId: '感冒冲剂',
				          sl:50,
				          yj:10
				        }, {
				          id: '999感冒灵',
				          name: '15',
				          address: '1/包',
				          shop: '一天三次',
				          shopId: '感冒冲剂',
				          sl:50,
				          yj:10
				        }, {
				          id: '健胃消食片',
				          name: '15',
				          address: '1/包',
				          shop: '一天三次',
				          shopId: '感冒冲剂',
				          sl:50,
				          yj:10
				        }],
				input:'',
				dialogFormVisible: false,
				xiugai:false,
				form: {
					  name: '',
					  region: '',
					  num: 1,
					  qian:1,
					  guige:'',
					},
				xiu: {
					  name: '',
					  region: '',
					  num: 1,
					  qian:1,
					  guige:'',
					},
				formLabelWidth: '',
				value1: '',
      }
		}
	}
</script>

<style scoped>
	.works{
		padding: 15px;
	}
</style>