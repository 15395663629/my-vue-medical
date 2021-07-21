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
        label="挂号时间"
        width="180">
      <template #default="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.rtTime }}</span>
      </template>
    </el-table-column>

    <el-table-column label="挂号卡号" width="150">
      <template #default="scope">
        <el-popover effect="light" trigger="hover" placement="top">
          <template #default>
            <p>姓名: {{ scope.row.cardObject.mzSick.sickName}}</p>
            <p>身份证: {{ scope.row.cardObject.mcIdCard }}</p>
            <p>电话: {{ scope.row.cardObject.mzSick.sickPhone}}</p>
            <p>住址: {{ scope.row.cardObject.mzSick.sickSite}}</p>
          </template>
          <template #reference>
            <div class="name-wrapper">
              <el-tag size="medium">{{ scope.row.cardObject.mcCard}}</el-tag>
            </div>
          </template>
        </el-popover>
      </template>
    </el-table-column>

    <el-table-column
        label="姓名"
        width="110">
      <template #default="scope">
        <el-popover effect="light" trigger="hover" placement="top">
          <template #default>
            <p>医生: {{ scope.row.rtDoctor }}</p>
            <p>职位: {{ scope.row.rtType }}</p>
            <p>所属科室: {{ scope.row.rtOverKsName }}</p>
          </template>
          <template #reference>
            <div class="name-wrapper">
              <el-tag size="medium">{{ scope.row.rtDoctor}}</el-tag>
            </div>
          </template>
        </el-popover>
      </template>
    </el-table-column>

    <el-table-column
        label="挂号类型"
        width="100">
      <template #default="scope">
        <el-popover effect="light" trigger="hover" placement="top">
          <template #default>
            <p>挂号费: {{ scope.row.rtPrice }}</p>
            <p>挂号科室: {{ scope.row.rtType }}</p>
            <p>初复诊: {{ scope.row.rtClass }}</p>
            <p>操作人: {{ scope.row.staffObject.sname }}</p>
          </template>
          <template #reference>
            <div class="name-wrapper">
              <el-tag size="medium">{{ scope.row.rtScience}}</el-tag>
            </div>
          </template>
        </el-popover>
      </template>
    </el-table-column>

    <el-table-column prop="rtState" label="标签"
                     width="100" :filters="[{ text: '当天挂号', value: '当天挂号' }, { text: '预约挂号', value: '预约挂号' }]"
                     :filter-method="filterTag"  filter-placement="bottom-end">
      <template #default="scope" >
        <el-tag :type="scope.row.rtState === '当天挂号' ? 'success' : 'warning'" disable-transitions>
          {{scope.row.rtState}}
        </el-tag>
      </template>
    </el-table-column>

<!--    <el-table-column label="操作">-->
<!--      <template #default="scope">-->
<!--        <el-button-->
<!--            size="mini"-->
<!--            type="success"-->
<!--            @click="handleEdit(scope.row)">打印小票</el-button>-->
<!--      </template>-->
<!--    </el-table-column>-->
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
        radio2:"查看全部",
        wardCurrentPage2:1,
        wardPageSize2:4,
      }
    },
    methods:{
      filterTag(value, row) {/* 复诊初诊标签方法 */
        return row.rtState === value;
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