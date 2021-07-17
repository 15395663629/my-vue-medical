<template>
  <el-table
      :data="upList.slice((wardCurrentPage2-1)*wardPageSize2,wardCurrentPage2*wardPageSize2)"
      style="width: 100%"
      height="460" >
    <el-table-column
        label="操作卡号"
        width="180">
      <template #default="scope">
        <span >{{ scope.row.cardObject.mcCard}}</span>
      </template>
    </el-table-column>
    <el-table-column
        label="操作时间"
        width="180">
      <template #default="scope">
        <span >{{ scope.row.mcrcTime}}</span>
      </template>
    </el-table-column>
    <el-table-column
        label="操作员"
        width="150">
      <template #default="scope">
        <span >{{ scope.row.staffObject.sname}}</span>
      </template>
    </el-table-column>
    <el-table-column label="姓名" width="180">
      <template #default="scope">
        <el-popover width="300" effect="light" trigger="hover" placement="top">
          <template #default>
            <p>姓名: {{ scope.row.cardObject.mzSick.sickName }}</p>
            <p>电话: {{ scope.row.cardObject.mzSick.sickPhone}}</p>
            <p>住址: {{ scope.row.cardObject.mzSick.sickSite }}</p>
            <p>建立日期: {{ scope.row.cardObject.mzSick.sickTime }}</p>
          </template>
          <template #reference>
            <div class="name-wrapper">
              <el-tag size="medium">{{ scope.row.cardObject.mzSick.sickName }}</el-tag>
            </div>
          </template>
        </el-popover>
      </template>
    </el-table-column>

    <el-table-column label="身份证" width="200">
      <template #default="scope">
        <span >{{ scope.row.cardObject.mzSick.sickIdCard}}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作金额" width="150" align="center">
      <template #default="scope">
        <span >{{ scope.row.mcrcPrice}}</span>
      </template>
    </el-table-column>
    <el-table-column label="支付方式" width="100" align="center">
      <template #default="scope">
        <span >{{ scope.row.mcrcPayment}}</span>
      </template>
    </el-table-column>
    <el-table-column prop="mcrcState" label="标签"  align="center"
                     width="140" :filters="[{ text: '诊卡充值', value: '诊卡充值' },{ text: '诊卡退款', value: '诊卡退款' }]"
                     :filter-method="filterTag"  filter-placement="bottom-end">
      <template #default="scope">
        <el-tag  size="mini"  :type="scope.row.alCause === '诊卡充值' ? 'primary' : 'danger'" disable-transitions>
          {{scope.row.mcrcState}}
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
                  :total="upList.length">
  </el-pagination>
</template>

<script>
export default{
  props:{
    upList:{
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