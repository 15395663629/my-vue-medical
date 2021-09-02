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
		<el-table-column prop="fc.fcName" label="班次名" >
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
					 <el-dialog title="班次管理" v-model="dialogVisible1" width="40%" >
					 	<!-- 表格 -->
<!--             请输入班次名称：<el-input type="text" v-model="bcName" style="width: 45%;margin-top: 20px"></el-input><br />-->
            <el-row style="margin-top: 20px !important;">
              请选择班次类别： <el-select v-model="value" clearable  placeholder="请选择类别"  @change="cs($event)">
              <el-option
                  v-for="item in options"
                  :key="item.fcId"
                  :label="item.fcName"
                  :value="item.fcId">
              </el-option>
            </el-select>
            </el-row>
<!--             第一个-->
					<el-row style="margin-top: 20px !important;">
						请选择：<el-time-select placeholder="起始时间" v-model="startTime" start='08:00' step='00:30:00' end='23:59' >
						</el-time-select>
					<el-time-select placeholder="结束时间" v-model="endTime" start='08:00' step='00:30:00' end='23:59:59'   :minTime="startTime">
						</el-time-select>
					</el-row>
<!--             第二个-->
             <el-row style="margin-top: 20px !important;" v-show="dialogVisible2">
               请选择：<el-time-select placeholder="起始时间" v-model="startTime1" start='08:00' step='00:30:00' end='23:59' :minTime="endTime">
             </el-time-select>
               <el-time-select placeholder="结束时间" v-model="endTime1" start='08:00' step='00:30:00' end='23:59:59' :minTime="startTime1">
               </el-time-select>
             </el-row>

<!--             第三个-->
               <el-row style="margin-top: 20px !important;" v-show="dialogVisible3">
                 请选择：<el-time-select placeholder="起始时间" v-model="startTime2" start='08:00' step='00:30:00' end='23:59' :minTime="endTime1" >
               </el-time-select>
                 <el-time-select placeholder="结束时间" v-model="endTime2" start='08:00' step='00:30:00' end='23:59:59' :minTime="startTime2">
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
				fid:0,
				startTime: '',
				endTime: '',
        startTime1: '',
        endTime1: '',
        startTime2: '',
        endTime2: '',

				dialogTableVisible: false,
        dialogVisible2:false,
        dialogVisible3:false,

				value1: '',
        //获取新增数据
        addfre:{
          fid:0,
          fstartTime:'',
          fendTime:'',
          fcId:0
        },
        options: [],
        value: '',
      bcId:0
			}
		},

		methods: {
      getData(){
        this.axios.get('select-fre').then((v)=>{
          this.fre=v.data
          console.log(this.fre)
        }).catch()
        this.axios.get('select-cate').then((v)=>{
          this.options=v.data
          console.log(this.options)
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
        let start=[]
        let end=[]
        this.addfre.fid=this.fid
        this.addfre.fstartTime=this.startTime
        this.addfre.fendTime=this.endTime
        this.addfre.fcId=this.bcId
        console.log(this.addfre)
        if(this.addfre.fid===0){
          //开始时间打包
          if(Object.keys(this.startTime).length !== 0 && Object.keys(this.startTime1).length !== 0 && Object.keys(this.startTime2).length !== 0){
            start=start.concat(this.startTime,this.startTime1,this.startTime2)
          }else if(Object.keys(this.startTime).length !== 0 && Object.keys(this.startTime1).length !== 0){
            start=start.concat(this.startTime,this.startTime1)
          }else if(Object.keys(this.startTime).length !== 0){
            start=start.concat(this.startTime)
          }
          //结束时间打包
          if(Object.keys(this.endTime).length !== 0 && Object.keys(this.endTime1).length !== 0 && Object.keys(this.endTime2).length !== 0){
            end=end.concat(this.endTime,this.endTime1,this.endTime2)
          }else if(Object.keys(this.endTime).length !== 0 && Object.keys(this.endTime1).length !== 0){
            end=end.concat(this.endTime,this.endTime1)
          }else if(Object.keys(this.endTime).length !== 0){
            end=end.concat(this.endTime)
          }
          // console.log(start)
          // console.log(end)
          var grant = JSON.stringify({start:start,end:end,bcId:this.bcId})
          this.axios.post("add-fre",qs.stringify({grant:grant})).then((res)=>{
            this.dialogVisible1 = false;
              this.qingchu()
            this.getData();
          }).catch()
        }else{
          this.axios.post('edit-fre',this.addfre).then((v)=>{
            if(v.data===1){
              this.dialogVisible1=false
              this.fid=0
              this.bcId=0
              this.getData()
              this.qingchu()
            }
          }).catch()
        }

      },
      edit(row){
       console.log(row)

        this.value=row.fc.fcName
        this.startTime=row.fstartTime
        this.endTime=row.fendTime
        this.fid=row.fid
        this.bcId=row.fc.fcId
        this.dialogVisible1=true
        //打包成对象
        this.addfre.fid=this.fid
        this.addfre.fstartTime=this.startTime
        this.addfre.fendTime=this.endTime
        this.addfre.fcId=this.bcId

        // console.log(this.addfre)
      },
      cs(event){
        this.bcId=event
        console.log(event)
        this.dialogVisible2=false
        this.dialogVisible3=false
      if(event===1){
        // this.dialogVisible2=true
      }else if(event===2){
        this.dialogVisible2=true
      }else if(event===3){
        this.dialogVisible2=true
        this.dialogVisible3=true
      }
      },
      qingchu(){
        this.addfre.fid=0
        this.addfre.fstartTime=""
        this.addfre.fendTime=""
        this.addfre.fcId=""
        this.fid=0
        this.fstartTime=""
        this.fendTime=""
        this.fcId=""
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
  .cs{
    display: none;
  }
</style>
