<template>
	<div>
		员工管理
	</div>
	
	<div class="xxx">
		<el-button type="primary" @click="dialogVisible1 = true">新增员工</el-button>
		<!-- <el-button type="primary">编辑员工</el-button> -->
		<el-button type="primary" @click="cs">重置密码</el-button>
		<span class="name">
			姓名：<el-input style="width: 120px;" v-model="name" value=""></el-input>
			<el-button type="primary" icon="el-icon-orange" style="margin-left: 20px;">查询</el-button>
		</span>
	</div>

	<el-table ref="multipleTable" :data="funs.slice((page-1)*size,page*size)" tooltip-effect="dark" style="width: 100%"
		@selection-change="handleSelectionChange" class="dome">
		<el-table-column type="selection">
		</el-table-column>
    <el-table-column prop="sid" label="员工编号">
    </el-table-column>
		<el-table-column prop="sname" label="姓名" >
		</el-table-column>
<!--    <el-table-column label="姓名" width="180">-->
<!--      <template #default="scope" >-->
<!--        <el-popover width="300" effect="light"   trigger="hover" placement="top">-->
<!--          <template #default >-->
<!--            <p>姓名: {{ scope.row.mzSick.sickName }}</p>-->
<!--            <p>住址: {{ scope.row.mzSick.sickSite }}</p>-->
<!--            <p>建立日期: {{ scope.row.mzSick.sickTime }}</p>-->
<!--          </template>-->
<!--          <template #reference>-->
<!--            <div class="name-wrapper">-->
<!--              <el-tag size="medium">{{ scope.row.mzSick.sickName }}</el-tag>-->
<!--            </div>-->
<!--          </template>-->
<!--        </el-popover>-->
<!--      </template>-->
<!--    </el-table-column>-->
		<el-table-column prop="ssore" label="身份证" >
		</el-table-column>
    <el-table-column prop="sphone" label="联系电话" >
    </el-table-column>
    <el-table-column prop="sdate" label="入职日期" >
    </el-table-column>
    <el-table-column prop="user.uname" label="用户名" >
    </el-table-column>
    <el-table-column prop="ks.ksName" label="所属科室" >
    </el-table-column>
    <el-table-column prop="t.tname" label="职称" >
    </el-table-column>
	<el-table-column prop="szt" label="状态" >
		<template v-slot="scope">
			<p v-if="scope.row.szt==0">在职</p>
			<p v-if="scope.row.szt==1">离职</p>
		</template>
	</el-table-column >
		<el-table-column label="操作" width="250px">
			<template v-slot:default="r">
				<el-button type="primary" size="mini">授权</el-button>
				<el-button type="primary" @click="dialogVisible1 = true" size="mini">编辑</el-button>
				<el-button type="primary" size="mini">离职</el-button>
				
			</template>
		</el-table-column>

	</el-table>
	<!--分页插件-->
  <el-pagination
      style="text-align: center;margin-top: 10px"
      @size-change="HandleSizeChange"
      @current-change=" "
      :current-page="page"
      :page-sizes="[2,4,6,8,10]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="funs.length">
  </el-pagination>
	<el-dialog title="员工信息" v-model="dialogVisible1" width="30%" :before-close="handleClose">
		<el-form>
			员工姓名：<el-input type="text" style="width: 40%;"></el-input><br />
			科&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;室：<el-select v-model="value" placeholder="请选择"
				style="width: 20%;margin-top:20px;">
				<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select><br />
			部&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;门：<el-select v-model="value2" placeholder="请选择"
				style="width: 20%;margin-top:20px;">
				<el-option v-for="item in optionss" :key="item.value2" :label="item.label2" :value="item.value2">

				</el-option>
			</el-select><br />
			身份证&nbsp;&nbsp;：<el-input type="text" style="width: 40%;margin-top:20px;"></el-input><br />
			角&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;色：<el-select v-model="value1" placeholder="请选择"
				style="width: 20%;margin-top:20px;">
				<el-option v-for="item1 in axio" :key="item1.value1" :label="item1.label1" :value="item1.value1">
				</el-option>
			</el-select><br />
			联系电话：<el-input type="text" style="width: 40%; margin-top: 20px;"></el-input>
		</el-form>
		<template #footer>

			<span class="dialog-footer">
				<el-button @click="dialogVisible1 = false">取 消</el-button>
				<el-button type="primary" @click="dialogVisible1 = false">确 定</el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script>
	export default {
		data() {
			return {
			  funs:[],
        size:4,
        page:1,
		multipleSelection:[],
		uid:''

			}
		},

		methods: {
      getData(){
        this.axios.get("selectall-staff").then((res)=>{
          this.funs = res.data
          console.log(this.funs)
        }).catch()
      },
      //初始每页数据数size和数据data
      HandleSizeChange: function(size) {
        this.size = size;
        console.log(this.pagesize) //每页下拉显示数据
      },
      //初始页page
      HandleCurrentChange: function(currentPage) {
        this.page = currentPage;
        console.log(this.currentPage) //点击第几页
      },
			handleSelectionChange(val) {
				this.multipleSelection = val;
				if(this.multipleSelection.length==1){
					console.log(this.uid)
				}else if(this.multipleSelection.length==0){
					alert("请先选择一条数据")
					this.multipleSelection=[]
				}else{
					alert("只能选中一条")
					this.multipleSelection=[]
				}
				console.log(this.multipleSelection)
				this.multipleSelection.forEach(m=>{
					this.uid=m.user.uid
				})
			},
			cs(){
				
			},
			
		},
    created() {
		  this.getData()
    }
  }
</script>


<style>
	.dome {
		margin-top: 20px;
	}

	/* .xxx{
		margin-left: -500px;
	} */
	.name {
		margin-left: 500px;
	}
</style>
