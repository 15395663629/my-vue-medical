<template>
  <el-radio-group v-model="radio2" class=" my-radio-group"  size="mini" style="margin-top: 20px;">
    <el-radio-button label="查看全部"></el-radio-button>
    <el-radio-button label="当天挂号"></el-radio-button>
    <el-radio-button label="预约挂号"></el-radio-button>
  </el-radio-group>

  <el-table
      size="mini"
      height="490"
      :data="list.slice((wardCurrentPage2-1)*wardPageSize2,wardCurrentPage2*wardPageSize2)"
      style="width: 100%">
    <el-table-column
        label="日期"
        width="180">
      <template #default="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.date }}</span>
      </template>
    </el-table-column>
    <el-table-column
        label="姓名"
        width="180">
      <template #default="scope">
        <el-popover effect="light" trigger="hover" placement="top">
          <template #default>
            <p>姓名: {{ scope.row.name }}</p>
            <p>住址: {{ scope.row.address }}</p>
          </template>
          <template #reference>
            <div class="name-wrapper">
              <el-tag size="medium">{{ scope.row.name }}</el-tag>
            </div>
          </template>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column prop="tag" label="标签"
                     width="100" :filters="[{ text: '复诊', value: '复诊' }, { text: '初诊', value: '初诊' }]"
                     :filter-method="filterTag"  filter-placement="bottom-end">
      <template #default="scope" >
        <el-tag :type="scope.row.tag === '复诊' ? 'primary' : 'success'" disable-transitions>
          {{scope.row.tag}}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="scope">
        <el-button
            size="mini"
            type="success"
            @click="handleEdit(scope.$index, scope.row)">打印小票</el-button>
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
                  :total="list.length">
  </el-pagination>
</template>

<script>
import { ElMessage } from 'element-plus'
  export default {
    props:{
      list:{
        type:Array,
        required:true,
      },
    },
    data(){
      return{
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
    },
    created() {

    }

  }
</script>

<style scoped>
.te /deep/ .el-input__inner {
  color: #ff0000;
  font-size: 18px;
  cursor: pointer;
  width: 188px;
}
</style>