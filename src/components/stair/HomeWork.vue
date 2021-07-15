<template>
	<h1>工作台</h1>
	<button @click="logout()">退出登入</button>
  {{token}}
</template>

<script>
	export default{
		data(){
			return{
				token:''
			}
		},
		methods:{
			logout() {
			  window.sessionStorage.clear()
			  this.$router.push('/')
			}
		},
		created() {
      this.token = this.$store.state.token

    }
  }
</script>

<style>
</style>
