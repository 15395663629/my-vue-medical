<template>
  <el-table
      :data="mzSickList.slice((wardCurrentPage2-1)*wardPageSize2,wardCurrentPage2*wardPageSize2)"
      style="width: 100%"
      height="460" >
    <el-table-column
        label="操作卡号"
        width="180">
      <template #default="scope">
        <span >{{ scope.row.alCard}}</span>
      </template>
    </el-table-column>
    <el-table-column
        label="操作时间"
        width="180">
      <template #default="scope">
        <span >{{ scope.row.alTime}}</span>
      </template>
    </el-table-column>
    <el-table-column label="姓名" width="250">
      <template #default="scope">
        <el-popover width="300" effect="light" trigger="hover" placement="top">
          <template #default>
            <p>姓名: {{ scope.row.sickObject.sickName }}</p>
            <p>电话: {{ scope.row.sickObject.sickPhone}}</p>
            <p>住址: {{ scope.row.sickObject.sickSite }}</p>
            <p>建立日期: {{ scope.row.sickObject.sickTime }}</p>
          </template>
          <template #reference>
            <div class="name-wrapper">
              <el-tag size="medium">{{ scope.row.sickObject.sickName }}</el-tag>
            </div>
          </template>
        </el-popover>
      </template>
    </el-table-column>

    <el-table-column label="身份证" width="300">
      <template #default="scope">
        <span >{{ scope.row.sickObject.sickIdCard}}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作金额" width="180">
      <template #default="scope">
        <span >{{ scope.row.alPrice}}</span>
      </template>
    </el-table-column>

    <el-table-column prop="alCause" label="标签"
                     align="center"
                     width="200" :filters="[{ text: '挂失补办', value: '挂失补办' }, { text: '挂失退额', value: '挂失退额'},{ text: '密码修改', value: '密码修改' }]"
                     :filter-method="filterTag"  filter-placement="bottom-end">
      <template #default="scope">
        <el-tag  size="mini"  :type="scope.row.alCause === '密码修改' ? 'primary' : (scope.row.alCause === '挂失补办' ? 'success' :'danger')" disable-transitions>
          {{scope.row.alCause}}
        </el-tag>
      </template>
    </el-table-column>
  </el-table>
  <!--分页插件-->
  <el-pagination  @size-change="wardHandleSizeChange2" @current-change="wardHandleCurrentChange2"
                  style="text-align: center; margin-top: 10px"
                  :current-page="wardCurrentPage2"
                  :page-sizes="[2,4,6,8]"
                  :page-size="wardPageSize2"
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
      wardCurrentPage2:1,
      wardPageSize2:4,
    }
  },
  methods:{
    filterTag(value, row) {/* 复诊初诊标签方法 */
      return row.alCause === value;
    },
    // 初始病房每页数据数wardpagesize2和数据data
    wardHandleSizeChange2: function(size) {
      this.wardPageSize2 = size;
      console.log(this.pagesize) //每页下拉显示数据
    },
    //初始页病房wardcurrentPage2
    wardHandleCurrentChange2: function(currentPage) {
      this.wardCurrentPage2 = currentPage;
      console.log(this.currentPage) //点击第几页allDescSick
    },
  }

}
</script>

<style scoped>

</style>