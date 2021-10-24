<template>
  <h1>门诊发药</h1>
  <el-table
      :data="MzRecipe.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      stripe
      style="width: 100%">
    <el-table-column
        label="处方编号"
        prop="recipeNumber">
    </el-table-column>
    <el-table-column
        label="患者名字"
        prop="recipeSickName">
    </el-table-column>
    <el-table-column
        prop="recipeTime"
        label="开处方时间">
    </el-table-column>
    <el-table-column
        prop="recipeDoctorName"
        label="主治医生">
    </el-table-column>
    <el-table-column
        prop="recipePrice"
        label="处方价格">
    </el-table-column>
    <el-table-column label="操作">
      <template #default="scope">
        <el-button type="primary" plain size="small" @click="mzfy(scope.row)">查看药品</el-button>
        <el-button type="success" plain size="small" @click="fayao(scope.row)">发药</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!--        发药详情里面的药品-->
  <el-dialog title="发药详情" v-model="mzzy">
    <el-tabs v-model="card" @tab-click="handleClick">
      <el-tab-pane label="中药" name="中药">
        <el-table :data="zy">
          <el-table-column property="zpNumber" label="中药处方中单"/>
          <el-table-column property="zpName" label="药品名"/>
          <el-table-column property="zpCount" label="发药数量"/>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="西药" name="西药">
        <el-table :data="xy">
          <el-table-column property="rdNumber" label="西药处方单号"/>
          <el-table-column property="rdName" label="药品名"/>
          <el-table-column property="rdCount" label="发药数量"/>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
  <!-- 分页 -->
  <el-pagination
      style="text-align: center"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 40]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="MzRecipe.length">
  </el-pagination>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1, //初始页
      pagesize: 8,    //    每页的数据
      MzRecipe: [],//处方单
      zy:[],
      xy:[],
      mzzy:false,
      card:'中药',
    }
  },
  methods: {
    handleSizeChange: function (size) {
      this.pagesize = size;
      console.log(this.pagesize)  //每页下拉显示数据
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
      console.log(this.currentPage)  //点击第几页
    },
    getData(recipeNumber) {


      //查询门诊发药西药
      this.axios({url:"allmzxy",params:{recipeNumber:recipeNumber}}).then((v)=>{
        this.xy = v.data
      })
      //查询门诊发药中药
      this.axios({url:"allmzzy",params:{recipeNumber:recipeNumber}}).then((v)=>{
        this.zy = v.data
      })
    },
    //药房发药
    fayao(row){
      console.log(row)
      this.axios.post("fayao",{mzRecipe:row,sId:this.staff.sid}).then((v)=>{
        this.axios.post("allMzRecipe").then((v) => {
          this.MzRecipe = v.data
        })
        if(v.data == "ok"){
          this.$message({
            message: '发药成功',
            type: 'success'
          });
        }
      }).catch();
      console.log("sssss");

      this.getData();
    },
    //发的药品详情弹窗
    mzfy(row){
      this.mzzy = true;
      console.log(row);

      this.getData(row.recipeNumber);
      // this.zy = row.zpList;
      // this.xy = row.xpList;
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
  },
  created() {
    this.staff = this.$store.state.token.list;//将登录存入的值在取出来  获取当前的员工
    //查询门诊处方单号
    this.axios.post("allMzRecipe").then((v) => {
      this.MzRecipe = v.data
    })
  }
}
</script>

<style scoped>
.works {
  padding: 15px;
}

.el-dialog__body {
  padding: 20px 60px;
  padding-left: 100px;
  text-align: center;
}
</style>
