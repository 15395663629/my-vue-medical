<template>
	<div>
		<el-button type="primary" @click="dialogVisible1 = true">新增班次</el-button>
	</div>
		
	<!-- <el-button type="primary">重置密码</el-button> -->
	<el-table ref="multipleTable" :data="fre.slice((page-1)*size,page*size)" tooltip-effect="dark" style="width: 100%"
	 class="dome" id="printMe">
		<el-table-column type="selection">
		</el-table-column>
		<el-table-column label="班次编号" prop="fid">
		</el-table-column>
		<el-table-column prop="ffrequency" label="班次名" >
		</el-table-column>
		<el-table-column prop="fstartTime" label="开始时间">
		</el-table-column>
    <el-table-column prop="fendTime" label="结束时间" >
    </el-table-column>
		<el-table-column label="操作">
			<template v-slot:default="r">
				<el-button type="primary" @click="edit(r.row)" size="mini">编辑班次</el-button>
				<el-button type="danger" @click="open(r.row)" size="mini">删除班次</el-button>

			</template>
		</el-table-column>

	</el-table>
 <!--分页插件-->
  <el-pagination
      style="text-align: center;margin-top: 10px"
      @size-change="HandleSizeChange"
      @current-change="HandleCurrentChange"
      :current-page="page"
      :page-sizes="[2,4,6,8,10]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="fre.length">
  </el-pagination>
					 <el-dialog title="班次管理" v-model="dialogVisible1" width="30%" >
					 	<!-- 表格 -->
             请输入班次名称：<el-input type="text" v-model="bcName" style="width: 45%;margin-top: 20px"></el-input><br />
					<el-row style="margin-top: 20px !important;">
						开始日期：<el-time-select placeholder="起始时间" v-model="startTime" start='08:00' step='01:00' end='23:59'>
						</el-time-select>
					</el-row>
					<el-row  style="margin-top: 20px !important;">
						结束日期：<el-time-select placeholder="结束时间" v-model="endTime" start='08:00' step='01:00' end='23:59'
							>
						</el-time-select>
					</el-row>
					 	<template #footer>
					 		<span class="dialog-footer">
					 			<el-button @click="dialogVisible1 = false">取 消</el-button>
					 			<el-button type="primary" @click="addFre">确 定</el-button>
					 		</span>
					 	</template>
					 </el-dialog>
</template>

<script>
import qs from 'qs'
	export default {
		data() {
			return {
        bcName:'',
        //查询表格数据
        fre:[],
        size:4,
        page:1,
				dialogVisible1:false,
				
				startTime: '',
				endTime: '',

				dialogTableVisible: false,

				value1: '',
        //获取新增数据
        addfre:{
          fId:0,
          fFrequency:'',
          fStartTime:'',
          fEndTime:''
        }
			}
		},

		methods: {
      getData(){
        // this.axios.get('select-fre').then((v)=>{
        //   this.fre=v.data
        //   console.log(this.fre)
        // }).catch()
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
			open(row) {
        this.addfre.fId=row.fid
        this.axios({
          url:"delet-fre",
          params:{fid:this.addfre.fId}
        }).then((v)=>{
          if(v.data===0){
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getData()
          }else {
            this.$message({
              type: 'info',
              message: '该班次在使用中无法删除'
            });
          }
        }).catch();




			},
      addFre(){
        if(this.addfre.fId===0){
          this.addfre.fFrequency=this.bcName
          this.addfre.fStartTime=this.startTime
          this.addfre.fEndTime=this.endTime
          this.axios.post("add-fre",qs.stringify(this.addfre)).then((v)=>{
            if(v.data==1){
              this.getData()
              this.$message({
                type: 'success',
                message: '新增成功!'
              });
              this.dialogVisible1=false
            }else{
              this.$message({
                type: 'info',
                message: '新增失败'
              });
              this.dialogVisible1=false
            }
          }).catch()
        }else{
          this.axios.post('edit-fre',qs.stringify(this.addfre)).then((v)=>{
            if(v.data==1){
              this.getData()
              this.$message({
                type: 'success',
                message: '新增成功!'
              });
              this.dialogVisible1=false
            }else{
              this.$message({
                type: 'info',
                message: '新增失败'
              });
              this.dialogVisible1=false
            }
          }).catch()
        }

      },
      edit(row){
        console.log(row)
        this.dialogVisible1=true
        this.bcName=row.ffrequency
        this.startTime=row.fstartTime
        this.endTime=row.fendTime
        //打包成对象
        this.addfre.fId=row.fid
        this.addfre.fFrequency= this.bcName
        this.addfre.fStartTime=this.startTime
        this.addfre.fEndTime=this.endTime
        console.log(row)
      }
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
</style>
