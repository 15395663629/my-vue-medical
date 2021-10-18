<template>

	<div class="wz">
      <el-button type="primary" @click="dialogVisible1 = true">新增部门</el-button>
      <span style="margin-left: 20px;">
			<el-input style="width: 120px;" v-model="name"></el-input>
			<el-button type="primary"  icon="el-icon-orange" style="margin-left: 20px;" @click="select(this.name)">查询部门</el-button>
		</span>
  <div style="margin-top: -40px;margin-left: 400px">
    <el-upload
        action=""
        :auto-upload="false"
        accept=".xlsx, .xls"
        :show-file-list="false"
        :on-change="handle"
    >
      <el-button type="success" style="margin-left: 20px">导入</el-button>
    </el-upload>
  </div>


		<!-- <el-button type="primary">重置密码</el-button> -->
	</div>
  <!-- 表格 -->
  <el-table ref="multipleTable" :data="dept.slice((page-1)*size,page*size)"
            tooltip-effect="dark" style="width: 100%"
            class="dome">
    <el-table-column type="selection">
    </el-table-column>
    <el-table-column label="部门编号"  prop="deId">
    </el-table-column>
    <el-table-column prop="deName" label="部门名称" >
    </el-table-column>
    <el-table-column prop="deDate" label="创建时间">
    </el-table-column>
    <el-table-column label="操作">
      <template v-slot:default="r">
<!--        <el-button type="danger" @click="open(r.row)">删除</el-button>-->
        <el-button type="primary" @click="addDept(r.row)">编辑部门</el-button>
      </template>
    </el-table-column>

  </el-table>
	  <!-- 分页插件 -->
	  <el-pagination
	  	style="text-align: center;margin-top: 10px"
	       @size-change="HandleSizeChange"
	       @current-change="HandleCurrentChange"
	       :current-page="page"
	       :page-sizes="[2,4,6,8,10]"
	       :page-size="size"
	       layout="total, sizes, prev, pager, next, jumper"
	       :total="dept.length">
	     </el-pagination>
	<el-dialog
	    title="部门信息"
	    v-model="dialogVisible1"
	    width="30%"
	    >
	   <!-- 表格 -->
	   部门名称：<el-input type="text" style="width: 40%;" v-model="value"></el-input><br />
	    <template #footer>
	      <span class="dialog-footer">
	        <el-button @click="dialogVisible1 = false">取 消</el-button>
	        <el-button type="primary" @click="dome()">确 定</el-button>
	      </span>
	    </template>
	  </el-dialog>

</template>

<script>
 import qs from  'qs'
 import xlsx from 'xlsx'
 export function upload(file){
   return new Promise(resolve=>{
     let reader = new FileReader()
     reader.readAsBinaryString(file);
     reader.onload = ev=>{
       resolve(ev.target.result)
     }
   })
 }
 export let character = {
   deId: {
     text: "部门编号",
     type: String
   },
   deName: {
     text: "部门名称",
     type: String
   },
   deDate: {
     text: "创建时间",
     type: String
   },

 }
 export default {
	    data() {
	      return {
	        dept:[],
          value:'',
          name:'',
          valus:{
            deId:0,
            deName:'',
            deDate:''
          },
			  dialogVisible1:false,
          //分页
          size:4,
          page:1,
          selectData:[]


	      }
	    },

	    methods: {
        // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
        async handle(ev) {
          // 数据采集
          let file = ev.raw
          if (!file) return
          let reader = await upload(file)
          const worker = xlsx.read(reader, { type: 'binary' })

          // 这个是将数据进行一步拼接
          //  worker.Sheets[worker.SheetNames[0]]
          // 将返回的数据转换为json对象的数据
          reader = xlsx.utils.sheet_to_json(worker.Sheets[worker.SheetNames[0]])
          console.log(reader)

          // 将读取出来的数据转换为可以发送给服务器的数据
          let arr = []
          reader.forEach(item => {
            let obj = {}
            for (let key in character) {
              if (!character.hasOwnProperty(key)) break
              let v = character[key]
              let text = v.text
              let type = v.type
              v = item[text] || ''
              type === 'string' ? (v = String(v)) : null
              type === 'number' ? (v = Number(v)) : null
              obj[key] = v
            }
            arr.push(obj)
          })
          for (let i =0 ; i<arr.length; i++){
            this.dept.push(arr[i])
          }

          // console.log(this.selectData);
        },
	      //加载页面数据
        getData(){
          this.axios.get("http://localhost:8089/bm-list").then((v)=>{
            this.dept=v.data
            console.log(this.dept)
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

        dome(){

          if(this.value==='' || this.value===undefined){
            return this.$message.error("不能为空");
          }

                if (this.valus.deId === 0) {
                  //新增部门
                  this.valus.deName = this.value
                  this.valus.deDate = new Date()
                  console.log(this.valus.deId)
                  for (let i=0;i<this.dept.length;i++){
                    if(this.valus.deName==this.dept[i].deName){
                      return this.$message.error("不能为空")
                    }
                  }
                  this.axios({
                    url: "add-dept",
                    params: {depts: this.valus}
                  }).then((v) => {
                    if (v.data === 'ok') {
                      this.clearForm()
                      this.getData()
                      this.$message.success("新增成功")
                      this.dialogVisible1=false
                    } else {
                      console.log(v.data)
                    }
                  }).catch();

                } else {
                  //修改部门
                  this.valus.deName = this.value
                  this.axios.post("http://localhost:8089/upa-list", this.valus).then((v) => {
                    if (v.data === 'ok') {
                      this.clearForm()
                      this.getData()
                    } else {
                      console.log(v.data)
                    }
                  }).catch()
                  console.log(this.valus)
                }


        },
  //删除 （待确定，部门一般不要删除）
	// 	  open(row) {
  //       this.valus.deId=row.deId
  //       this.valus.deName=row.deName
  //       this.valus.deDate=row.deDate
	// 	        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
	// 	          confirmButtonText: '确定',
	// 	          cancelButtonText: '取消',
	// 	          type: 'warning'
	// 	        }).then(() => {
	// 	          this.axios.post("http://localhost:8089/delet-list",this.valus).then((v)=>{
	// 	            if(v.data==='ok'){
	// 	              this.getData()
  //                 this.$message({
  //                   type: 'success',
  //                   message: '删除成功!'
  //                 });
  //               }else{
  //                 this.$message({
  //                   type: 'info',
  //                   message: '已取消删除'
  //                 });
  //               }
  //             }).catch()
	// 	        }).catch(() => {
	// 	          this.$message({
	// 	            type: 'info',
	// 	            message: '已取消删除'
	// 	          });
	// 	        });
	// 	      },
        select(name){
          this.name=name
          this.valus.deName=this.name
          // this.valus.deId=this.name
          // this.valus.deId=this.name
          // this.valus.deDate=this.name
         if(this.name.length === 0){
           this.getData()
         }else{
           this.axios.post("http://localhost:8089/selectlike",this.valus).then((v)=>{
             this.dept=v.data
             // this.getData()
             this.clearForm()
           }).catch()
         }
        },
			 //清空
        clearForm(){
          this.value=''
          this.name=''
        },
        addDept(row){
          this.dialogVisible1=true
          this.value=row.deName
          this.valus.deId=row.deId
          this.value=row.deName
          this.valus.deDate=row.deDate
        },

	    },
  created() {
	      this.getData()
  }
  }
	</script>


<style>
	.dome{
		margin-top: 20px;
	}
	/* .wz{
		margin-left: -1150px;
	} */
</style>
