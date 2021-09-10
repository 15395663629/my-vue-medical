<template>
	<div class="div-login">
		<video style="width: 100%;" data-v-10a6bc2b="" autoplay="autoplay" loop="loop" muted="muted"><source  data-v-10a6bc2b="" src="../../../public/static/img/jl.mp4" type="video/mp4">
		</video>
		<div class="div-w">
			<el-form  ref="form" :model="form" :rules="rules" class="login-box">
					  <h3 class="login-title">柿子医疗后台登录</h3>
					  <el-form-item prop="uName" :error="errors.user" >
					    <el-input type="text" style="margin-top: 20px;" placeholder="请输入账号" v-model="form.uName"/>
					  </el-form-item>
					  <el-form-item  prop="uPswd" :error="errors.user">
					    <el-input type="password" placeholder="请输入密码" style="width: 100%;" v-model="form.uPswd"/>
					  </el-form-item>
					  <el-form-item>
						<el-row>
							<el-col :span="11">
								<el-button type="primary" @click="resetForm">重 置</el-button>
							</el-col>
							
							<el-col :offset="2" :span="11">
								 <el-button type="primary" @click="onSubmit('form')">登录</el-button>
							</el-col>
						</el-row>
					  </el-form-item>
					</el-form>
						
<!--					<el-dialog-->
<!--					  title="温馨提示"-->
<!--					  :visible.sync="dialogVisible"-->
<!--            modelVa="dialogVisible"-->
<!--					  width="30%"  :before-close="handleClose">-->
<!--					  <span>请输入账号和密码</span>-->
<!--					  <span slot="footer" class="dialog-footer">-->
<!--					    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>-->
<!--					  </span>-->
<!--			</el-dialog>-->
		</div>
	</div>
</template>

<script>
import qs from 'qs'
	export default{
		data(){
			return{

				user:{
					userName:'',
					userPassword:''
				},
				form: {
				  uId:0,
          uName:'',
          uPswd:'',
				},
				errors:{
					users:'',
				},
				// 表单验证，需要在 el-form-item 元素中增加 prop 属性
				rules: {
          uName: [
					{required: true, message: '账号不可为空', trigger: 'blur'}
				  ],
          uPswd: [
					{required: true, message: '密码不可为空', trigger: 'blur'}
				  ]
				},
	
				// 对话框显示和隐藏
				dialogVisible: false
			}
		},

		methods:{
			resetForm(){
				this.$refs['loginForm'].resetFields();
			},
			clearForm(){
				this.user={
					userName:'',
					userPassword:''
				}
				this.form={
					userName:'',
					userPassword:''
				}
			},
			onSubmit(formName) {
        this.$refs[formName].validate(valid =>{
          if(valid){
            this.axios.post('http://localhost:8089/jwt',qs.stringify(this.form)).then((v)=>{
             console.log(v.data)
              if(v.data.success===true){
                this.axios({
                  url:"test",
                  params:{token:v.data.data,uName:this.form.uName}
                }).then((d)=>{
                 console.log(d.data)
                  this.$store.state.token = d.data;
                  sessionStorage.setItem("token",JSON.stringify(v.data))
                  this.$router.push('/home')
                }).catch();
              }else{
                this.$message.error(v.data.message)
              }
            }).catch()
          }else{
            this.$message.error("账号密码错误")
          }
        });

			},
      dome(){
			  console.log(122)
        //清空sessionStorage
        this.$store.state.token = ''
        sessionStorage.removeItem("token")
        this.axios.interceptors.request.use((config)=>{
          if(this.$store.state.token.uid===null||this.$store.state.token.uid===undefined){
            this.$router.push('/')
          }else{
            this.$router.push('/home')
          }
          return config;
        })
      }

		},
    created(){
      this.dome()

    },

  }
</script>

<style scoped>
	.div-login{
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
	.div-w{
		padding: 25px 30px 20px 30px;
		background-color: white;
		transform: translate(-50%,-50%);
		position: absolute;
		width: 300px;
		background: rgba(163,186,208,0.3);
		left: 50%;
		top: 50%;
		text-align: center;
		z-index: 100;
	}
	.el-button{
		width: 100%;
	}
	.el-input{
		text-align: center;
	}
</style>
