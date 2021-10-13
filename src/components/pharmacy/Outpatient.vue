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
        <el-button type="success" plain size="small">发药</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!--        发药详情里面的药品-->
  <el-dialog title="发药详情" v-model="mzzy">
    <el-table :data="zy">
      <el-table-column property="zpNumber" label="中药处方中单"/>
      <el-table-column property="zpName" label="药品名"/>
      <el-table-column property="zpCount" label="药品数量"/>
    </el-table>
    <el-table :data="xy">
      <el-table-column property="rdNumber" label="西药处方单号"/>
      <el-table-column property="rdName" label="药品名"/>
      <el-table-column property="rdCount" label="药品数量"/>
    </el-table>
  </el-dialog>
  <!-- 分页 -->
  <el-pagination
      style="text-align: center"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[3, 8, 16, 32]"
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
    getData() {
      //查询门诊处方单号
      this.axios.post("allMzRecipe").then((v) => {
        this.MzRecipe = v.data
      })
      //查询门诊发药西药
      this.axios.post("allmzxy").then((v)=>{
        this.xy = v.data
      })
      //查询门诊发药中药
      this.axios.post("allmzzy").then((v)=>{
        this.zy = v.data
      })
    },
    //发的药品详情弹窗
    mzfy(row){
      this.mzzy = true;
      this.zy = row.zpList;
      this.xy = row.xpList;
    }
  },
  created() {
    this.getData()
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
