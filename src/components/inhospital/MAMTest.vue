<template>

  <!--=====================================================================医嘱弹框（选择药品弹框）======================-->
  <el-dialog title="药品选择" v-model="isAddDrugShow">
    <el-table
        :data="ZYDoctorEnjoinDetails"
        style="width: 100%">
      <el-table-column
          prop="date"
          label="药品编号"
          width="180">
      </el-table-column>
      <el-table-column
          prop="name"
          label="药品规格"
          width="180">
      </el-table-column>
      <el-table-column
          prop="name"
          label="药品价格"
          width="180">
      </el-table-column>
      <el-table-column
          prop="name"
          label="药品单位"
          width="180">
      </el-table-column>
      <el-table-column
          prop="address"
          label="药房库存">
      </el-table-column>
      <el-table-column label="操作">
        <template  #default='scope'>
          <el-button size="mini" type="success" @click="" >选择</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--分页插件-->
    <el-pagination
        style="text-align: right;"
        @size-change="totalCut"
        @current-change="pageCut"
        :current-page="1"
        :page-sizes="[2,4,6,8,10]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
    </el-pagination>
  </el-dialog>

  <!--=====================================================================化验弹框（选择化验弹框）======================-->
  <el-dialog title="化验选择" v-model="isAddTestShow">
    <el-table
        :data="ZYDoctorEnjoinDetails"
        style="width: 100%">
      <el-table-column
          prop="date"
          label="项目编号"
          width="180">
      </el-table-column>
      <el-table-column
          prop="name"
          label="项目名称"
          width="180">
      </el-table-column>
      <el-table-column
          prop="address"
          label="项目费用">
      </el-table-column>
      <el-table-column
          prop="name"
          label="项目备注"
          width="180">
      </el-table-column>
      <el-table-column label="操作">
        <template  #default='scope'>
          <el-button size="mini" type="success" @click="" >选择</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页插件-->
    <el-pagination
        style="text-align: right;"
        @size-change="totalCut"
        @current-change="pageCut"
        :current-page="1"
        :page-sizes="[2,4,6,8,10]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
    </el-pagination>
  </el-dialog>






  <!--=====================================================================添加医嘱弹框======================-->
  <el-dialog :title="addYZTitle" v-model="isAddYZShow">

    <el-form>

      <el-row>
        <el-col :offset="3" :span="5">
          <el-form-item label="药品名称" label-width="70px">
            <el-input></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="1"><el-button @click="isAddDrugShow = true" icon="el-icon-data-line" type="primary"></el-button></el-col>

        <el-col :offset="4" :span="7">
          <el-form-item label="药品规格" label-width="70px">
            <el-input></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :offset="3" :span="6">
          <el-form-item label="计量" label-width="70px">
            <el-input></el-input>
          </el-form-item>
        </el-col>


        <el-col :offset="4" :span="7">
          <el-form-item label="用法" label-width="70px">
            <el-input></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :offset="3" :span="6">
          <el-form-item label="嘱托" label-width="70px">
            <el-input></el-input>
          </el-form-item>
        </el-col>


        <el-col :offset="4" :span="7">
          <el-form-item label="价格" label-width="70px">
            <el-input></el-input>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>


    <template #footer>
      <el-row>
        <el-col :span="18"></el-col>
        <el-col :span="2">
          <el-button @click="addEmp('empFrom')" type="primary">确定</el-button>
        </el-col>
        <el-col :span="1"></el-col>
        <el-col :span="2">
          <el-button @click="isShowZY = false" type="danger">取消</el-button>
        </el-col>
        <el-col :span="1"></el-col>
      </el-row>
    </template>
  </el-dialog>




  <!--=====================================================================添加医嘱弹框======================-->
  <el-dialog :title="addYZJYTitle" v-model="isAddYZJYShow">

    <el-form>

      <el-row>
        <el-col :offset="3" :span="5">
          <el-form-item label="化验名称" label-width="70px">
            <el-input></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="1"><el-button @click="isAddTestShow = true" icon="el-icon-document-copy" type="primary"></el-button></el-col>

        <el-col :offset="4" :span="7">
          <el-form-item label="用法" label-width="70px">
            <el-input></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :offset="3" :span="6">
          <el-form-item label="计量" label-width="70px">
            <el-input></el-input>
          </el-form-item>
        </el-col>


        <el-col :offset="4" :span="7">
          <el-form-item label="价格" label-width="70px">
            <el-input></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :offset="3" :span="6">
          <el-form-item label="嘱托" label-width="70px">
            <el-input></el-input>
          </el-form-item>
        </el-col>


        <el-col :offset="4" :span="7">
          <el-form-item label="单位" label-width="70px">
            <el-input></el-input>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>


    <template #footer>
      <el-row>
        <el-col :span="18"></el-col>
        <el-col :span="2">
          <el-button @click="addEmp('empFrom')" type="primary">确定</el-button>
        </el-col>
        <el-col :span="1"></el-col>
        <el-col :span="2">
          <el-button @click="isShowZY = false" type="danger">取消</el-button>
        </el-col>
        <el-col :span="1"></el-col>
      </el-row>
    </template>
  </el-dialog>






  <el-container  style="height: 100%;" v-if="isThisView">

    <!--头部-->
    <el-header >


      <!--这里放用户信息-->
      <el-row  class="text_nr">
        <el-col :offset="4" :span="5">
          住院号：<span style="color: #3A8EE6;">101</span>
        </el-col>

        <el-col :span="5">
          病人姓名：<span style="color: #3A8EE6;">张三</span>
        </el-col >

        <el-col :span="5">
          性别：<span style="color: #3A8EE6;">男</span>
        </el-col>

        <el-col :span="5">
          年龄：<span style="color: #3A8EE6;">50</span>
        </el-col>
      </el-row>


      <!--这里放用户信息-->
      <el-row class="text_nr">
        <el-col :offset="4" :span="5">
          入院时间：<span style="color: #3A8EE6;">2020-10-24 10:08:24</span>
        </el-col>

        <el-col :span="5">
          住院天数：<span style="color: #3A8EE6;">4</span>
        </el-col >

        <el-col :span="5">
          入院诊断：<span style="color: #3A8EE6;">骨折</span>
        </el-col>

        <el-col :span="5">
          床位：<span style="color: #3A8EE6;">201</span>
        </el-col>
      </el-row>


      <!--这里放用户信息-->
      <el-row class="text_nr">
        <el-col :offset="4" :span="5">
          主治医生：<span  style="color: #3A8EE6;">张医生</span>
        </el-col>

        <el-col :span="5">
          负责护士：<span style="color: #3A8EE6;">王五</span>
        </el-col >

        <el-col :span="5">
          入院科室：<span style="color: #3A8EE6;">骨科</span>
        </el-col>

        <el-col :span="5">
          当前科室：<span style="color: #3A8EE6;">骨科</span>
        </el-col>
      </el-row>

    </el-header>
    <el-main>
      <el-row>
        <el-col :span="2">
          <el-button @click="addYZ" size="small"  type="primary">添加医嘱</el-button>
        </el-col>
        <el-col :span="2">
          <el-button @click="addYZJY" size="small" :disabled="isYZOrJY"  type="primary">添加项目</el-button>
        </el-col>

        <el-col :span="2" :offset="18">
          <el-button size="small" type="primary">打印医嘱</el-button>
        </el-col>
      </el-row>

      <el-table
          height="70%"
          ref="multipleTable"
          :data="ZYDoctorEnjoinDetails"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
        <el-table-column
            label="编号"
            prop="desId">
        </el-table-column>
        <el-table-column
            prop="desDate"
            label="录入时间">
        </el-table-column>


        <el-table-column
            prop="desDrugName"
            label="医嘱内容">
        </el-table-column>

        <el-table-column
            prop="desText"
            label="嘱托">
        </el-table-column>

        <el-table-column
            prop="desSpecification"
            label="规格">
        </el-table-column>
        <el-table-column
            prop="desMeasure"
            label="剂量">
        </el-table-column>
        <el-table-column
            prop="desUsage"
            label="用法">
        </el-table-column>

        <el-table-column
            prop="desNurseName"
            label="执行人">
        </el-table-column>


        <el-table-column
            prop="ssdemo"
            label="停嘱时间">
        </el-table-column>

        <el-table-column
            prop="ssdemo"
            label="停嘱医生">
        </el-table-column>

        <el-table-column label="操作" width="200px">
          <template #default="obj">
            <el-button size="small" type="danger">停嘱</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--分页插件-->
      <el-pagination
          style="text-align: right;"
          @size-change="totalCut"
          @current-change="pageCut"
          :current-page="1"
          :page-sizes="[2,4,6,8,10]"
          :page-size="size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </el-main>
    <el-footer style="background: white;background-color:#F1F1F1;padding-top: 10px;" height="30%">

      <!--这里放操作按钮-->
      <el-row style="margin-bottom: 35px;margin-top: 20px; line-height: 32px;">
        <el-col  :span="2">
          <el-button size="small" type="primary">新开医嘱单</el-button>
        </el-col>

        <el-col :offset="2" :span="5">
          预交金：<span style="color: #3A8EE6;">3000</span>
        </el-col >

        <el-col :span="5">
          费用总额：<span style="color: #3A8EE6;">1500</span>
        </el-col>

        <el-col :span="5">
          余额：<span style="color: #3A8EE6;">1500</span>
        </el-col>


        <el-col :offset="1" :span="2">
          <el-button size="small" @click="saveYZ" type="primary">保存医嘱</el-button>
        </el-col>

        <el-col  :span="2">
          <el-popover
              placement="top-start"
              title="医嘱重整"
              :width="200"
              trigger="hover"
              content="当医嘱停用过多时 可以选择重整医嘱将停用医嘱移除"
          >
            <template #reference>
              <el-button size="small" @click="reformYZ" type="danger">重整医嘱</el-button>
            </template>
          </el-popover>
        </el-col>
      </el-row>




    </el-footer>
  </el-container>

  <div v-if="!isThisView">页面进入错误！！</div>

</template>

<script>
import { ElLoading } from 'element-plus';
export default{
  data(){
    return{
      yzText:'',
      lod:'',
      medical:'',
      ZYDoctorEnjoinDetails:[//医嘱详表
        {
          desId:'201',//医嘱详细编号
          deId:'2003',//医嘱编号
          yfDrinId:'2',//连接药品编号
          desDrugName:'维生素C针',//药品名称
          desText:'无',//医嘱内容
          desSpecification:'0.5g*10支',//规格
          desMeasure:'2',//计量
          desUnit:'g',//单位
          desUsage:'',//用法
          desPrice:'',//价格
          sId:'2',//执行护士
          desNurseName:'李四',
          desDate:'2020-10-24 10:09:24',
          desIs:'1',//是否停止执行医嘱 1是未停嘱 2是停嘱
          desExecuteDate:'',//执行时间
          desEndDate:'',//结束时间
          desPresent_date:'',//当前执行时间
        },
        {
          desId:'201',//医嘱详细编号
          deId:'2003',//医嘱编号
          yfDrinId:'2',//连接药品编号
          desDrugName:'维生素C针',//药品名称
          desText:'无',//医嘱内容
          desSpecification:'0.5g*10支',//规格
          desMeasure:'2',//计量
          desUnit:'g',//单位
          desUsage:'',//用法
          desPrice:'',//价格
          sId:'2',//执行护士
          desNurseName:'李四',
          desDate:'2020-10-24 10:09:24',
          desIs:'1',//是否停止执行医嘱 1是未停嘱 2是停嘱
          desExecuteDate:'',//执行时间
          desEndDate:'',//结束时间
          desPresent_date:'',//当前执行时间

        },
        {
          desId:'201',//医嘱详细编号
          deId:'2003',//医嘱编号
          yfDrinId:'2',//连接药品编号
          desDrugName:'维生素C针',//药品名称
          desText:'无',//医嘱内容
          desSpecification:'0.5g*10支',//规格
          desMeasure:'2',//计量
          desUnit:'g',//单位
          desUsage:'',//用法
          desPrice:'',//价格
          sId:'2',//执行护士
          desNurseName:'李四',
          desDate:'2020-10-24 10:09:24',
          desIs:'1',//是否停止执行医嘱 1是未停嘱 2是停嘱
          desExecuteDate:'',//执行时间
          desEndDate:'',//结束时间
          desPresent_date:'',//当前执行时间

        },
        {
          desId:'201',//医嘱详细编号
          deId:'2003',//医嘱编号
          yfDrinId:'2',//连接药品编号
          desDrugName:'维生素C针',//药品名称
          desText:'无',//医嘱内容
          desSpecification:'0.5g*10支',//规格
          desMeasure:'2',//计量
          desUnit:'g',//单位
          desUsage:'',//用法
          desPrice:'',//价格
          sId:'2',//执行护士
          desNurseName:'李四',
          desDate:'2020-10-24 10:09:24',
          desIs:'1',//是否停止执行医嘱 1是未停嘱 2是停嘱
          desExecuteDate:'',//执行时间
          desEndDate:'',//结束时间
          desPresent_date:'',//当前执行时间

        },
        {
          desId:'201',//医嘱详细编号
          deId:'2003',//医嘱编号
          yfDrinId:'2',//连接药品编号
          desDrugName:'维生素C针',//药品名称
          desText:'无',//医嘱内容
          desSpecification:'0.5g*10支',//规格
          desMeasure:'2',//计量
          desUnit:'g',//单位
          desUsage:'',//用法
          desPrice:'',//价格
          sId:'2',//执行护士
          desNurseName:'李四',
          desDate:'2020-10-24 10:09:24',
          desIs:'1',//是否停止执行医嘱 1是未停嘱 2是停嘱
          desExecuteDate:'',//执行时间
          desEndDate:'',//结束时间
          desPresent_date:'',//当前执行时间

        },
        {
          desId:'201',//医嘱详细编号
          deId:'2003',//医嘱编号
          yfDrinId:'2',//连接药品编号
          desDrugName:'维生素C针',//药品名称
          desText:'无',//医嘱内容
          desSpecification:'0.5g*10支',//规格
          desMeasure:'2',//计量
          desUnit:'g',//单位
          desUsage:'',//用法
          desPrice:'',//价格
          sId:'2',//执行护士
          desNurseName:'李四',
          desDate:'2020-10-24 10:09:24',
          desIs:'1',//是否停止执行医嘱 1是未停嘱 2是停嘱
          desExecuteDate:'',//执行时间
          desEndDate:'',//结束时间
          desPresent_date:'',//当前执行时间

        },
        {
          desId:'201',//医嘱详细编号
          deId:'2003',//医嘱编号
          yfDrinId:'2',//连接药品编号
          desDrugName:'维生素C针',//药品名称
          desText:'无',//医嘱内容
          desSpecification:'0.5g*10支',//规格
          desMeasure:'2',//计量
          desUnit:'g',//单位
          desUsage:'',//用法
          desPrice:'',//价格
          sId:'2',//执行护士
          desNurseName:'李四',
          desDate:'2020-10-24 10:09:24',
          desIs:'1',//是否停止执行医嘱 1是未停嘱 2是停嘱
          desExecuteDate:'',//执行时间
          desEndDate:'',//结束时间
          desPresent_date:'',//当前执行时间
        }
      ],
      isAddTestShow:false,//显示添加化验表格弹框
      isAddDrugShow:false,//显示添加药品表格弹框
      addYZTitle:'',//添加医嘱弹框标题
      addYZJYTitle:'',//添加化验弹框标题
      isAddYZShow:false,//显示添加医嘱单
      isAddYZJYShow:false,//显示添加化验单
      isYZOrJY:false,
      isThisView:true//页面是否显示
    }
  },
  methods:{
    addYZ(is){
      this.addYZTitle = '添加医嘱（'+this.medical.name+'）'
      this.isAddYZShow = true;

    },
    addYZJY(is){
      this.addYZJYTitle = '添加化验（'+this.medical.name+'）'
      this.isAddYZJYShow = true;
    },
    reformYZ(){//重整医嘱
      this.ZYDoctorEnjoinDetails = [];
    },
    saveYZ(){//保存医嘱
      this.lod = this.$loading({
        lock: true,
        text: '保存医嘱中',
        background:'white'
      });
      setTimeout(() => {
        this.$router.push('/medicaladvicemanage');
        this.lod.close();

        this.$message({type: 'success', message: '保存医嘱成功'});
      }, 2000);
    },
    ts(){
      alert("s")
    },
    initView(){
      // this.medical = JSON.parse();
      if(JSON.stringify(this.$route.params) == '{}'){
        return;
      }
      this.medical = JSON.parse(this.$route.params.medical);
      console.log(this.medical)
      let is = JSON.parse(this.$route.params.is);
      this.isThisView = true;
      if(is == 1){
        this.yzText = '长期医嘱操作（'+this.medical.name+'）'
        this.isYZOrJY = true;
      }else{
        this.yzText = '临时医嘱操作（'+this.medical.name+'）'
        this.isYZOrJY = false;
      }
      // console.log(this.medical);
    }

  },
  created() {
    this.initView();
  }
}
</script>

<style>
.text_nr{
  margin-bottom: 35px;
}
</style>
