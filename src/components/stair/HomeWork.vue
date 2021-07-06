<template>
	<h1>工作台</h1>
	<button @click="logout()">退出登入</button>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			logout() {
			  window.sessionStorage.clear()
			  this.$router.push('/')
			}
		}
	}
</script>

<style>
</style>
