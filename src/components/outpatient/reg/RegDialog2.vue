<template>
  <el-row>
    <el-col>
      <el-input style="width:220px" class="my-el-input" v-model="input2" placeholder="请输入你要查询的挂号信息" clearable ></el-input>
      <el-button type="primary" icon="el-icon-search" @click="likeReg(input2,null)">查询</el-button>
    </el-col>
  </el-row>
  <el-radio-group v-model="radio2" class=" my-radio-group"  size="mini" style="margin-top: 20px;">
    <el-radio-button label="查看全部" @change="likeReg(null,null)"></el-radio-button>
    <el-radio-button label="当天挂号"  @change="likeReg(null,1)"></el-radio-button>
    <el-radio-button label="预约挂号"  @change="likeReg(null,2)"></el-radio-button>
  </el-radio-group>
<!--  .native.prevent-->
  <el-table size="mini" height="490"
      :data="list.slice((wardCurrentPage2-1)*wardPageSize2,wardCurrentPage2*wardPageSize2)"
      style="width: 100%">
    <el-table-column
        label="挂号时间"
        width="180">
      <template #default="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.rtOnsetTime }}</span>
      </template>
    </el-table-column>

    <el-table-column label="挂号人员">
      <template #default="scope">
        <el-popover effect="light" trigger="hover" placement="top" width="300">
          <template #default>
            <p>身份证: {{ scope.row.cardObject.mcIdCard }}</p>
            <p>电话: {{ scope.row.cardObject.mzSick.sickPhone}}</p>
            <p>住址: {{ scope.row.cardObject.mzSick.sickSite}}</p>
            <p>挂号卡号:{{ scope.row.cardObject.mcCard}}</p>
          </template>
          <template #reference>
            <div class="name-wrapper">
              <el-tag size="medium">{{ scope.row.cardObject.mzSick.sickName}}</el-tag>
            </div>
          </template>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column label="挂号科室" >
      <template #default="scope">
        <span style="margin-left: 10px">{{ scope.row.rtOverKsName}}</span>
      </template>
    </el-table-column>
    <el-table-column label="挂号医生">
      <template #default="scope">
        <el-popover effect="light" trigger="hover" placement="top">
          <template #default>
            <p>医生: {{ scope.row.rtDoctor }}</p>
            <p>职位: {{ scope.row.rtDoctorGenre }}</p>

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
            <p>挂号科室: {{ scope.row.rtOverKsName }}</p>
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

    <el-table-column prop="rtType" label="标签"
                     width="100" :filters="[{ text: '当天挂号', value: '当天挂号' }, { text: '预约挂号', value: '预约挂号' }]"
                     :filter-method="filterTag"  filter-placement="bottom-end">
      <template #default="scope" >
        <el-tag :type="scope.row.rtType === '当天挂号' ? 'success' : 'warning'" disable-transitions>
          {{scope.row.rtType}}
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
      likeReg:{
        type:Function,
        required: true,
      }
    },
    data(){
      return{
        radio2:"查看全部",
        wardCurrentPage2:1,
        wardPageSize2:4,
        input2:"",//查询搜索框
      }
    },
    methods:{
      filterTag(value, row) {/* 复诊初诊标签方法 */
        return row.rtType === value;
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