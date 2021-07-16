<template>
  <el-table
      :data="mzSickList.slice((wardCurrentPage-1)*wardPageSize,wardCurrentPage*wardPageSize)"
      style="width: 100%"
      height="460" >
    <el-table-column
        label="就诊卡号"
        width="180">
      <template #default="scope">
        <span >{{ scope.row.mcCard}}</span>
      </template>
    </el-table-column>
    <el-table-column label="姓名" width="180">
      <template #default="scope">
        <el-popover width="300" effect="light" trigger="hover" placement="top">
          <template #default>
            <p>姓名: {{ scope.row.mzSick.sickName }}</p>
            <p>电话: {{ scope.row.mzSick.sickPhone}}</p>
            <p>住址: {{ scope.row.mzSick.sickSite }}</p>
            <p>建立日期: {{ scope.row.mzSick.sickTime }}</p>
          </template>
          <template #reference>
            <div class="name-wrapper">
              <el-tag size="medium">{{ scope.row.mzSick.sickName }}</el-tag>
            </div>
          </template>
        </el-popover>
      </template>
    </el-table-column>

    <el-table-column label="身份证" width="180">
      <template #default="scope">
        <span >{{ scope.row.mcIdCard}}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作金额" width="180">
      <template #default="scope">
        <span >{{ scope.row.mcBalance}}</span>
      </template>
    </el-table-column>

    <el-table-column prop="tag" label="标签"
                     width="100" :filters="[{ text: '卡号挂失', value: '卡号挂失' }, { text: '密码修改', value: '密码修改' }]"
                     :filter-method="filterTag"  filter-placement="bottom-end">
      <template #default="scope">
        <el-tag  size="mini"  :type="scope.row.tag === '密码修改' ? 'primary' : 'success'" disable-transitions>
          {{scope.row.tag}}
        </el-tag>
      </template>
    </el-table-column>
  </el-table>
  <!--分页插件-->
  <el-pagination  @size-change="wardHandleSizeChange" @current-change="wardHandleCurrentChange"
                  style="text-align: center; margin-top: 10px"
                  :current-page="wardCurrentPage"
                  :page-sizes="[2,4,6,8]"
                  :page-size="wardPageSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="mzSickList.length">
  </el-pagination>
</template>

<script>
export default{
  props:{
    mzSickList:{
      type:Array,
      required:true
    },
  },
  data(){
    return {
      wardCurrentPage:1,
      wardPageSize:4,
    }
  },
  methods:{
    // 初始病房每页数据数wardpagesize和数据data
    wardHandleSizeChange: function(size) {
      this.wardPageSize = size;
      console.log(this.pagesize) //每页下拉显示数据
    },
    //初始页病房wardcurrentPage
    wardHandleCurrentChange: function(currentPage) {
      this.wardCurrentPage = currentPage;
      console.log(this.currentPage) //点击第几页allDescSick
    },
  }

}
</script>

<style scoped>

</style>