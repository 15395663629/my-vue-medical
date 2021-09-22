<template>
	<router-view></router-view>
</template>

<script >

	export default {
	  name: 'App',
	  created: function() {
	    if (sessionStorage.getItem("state")) {
	      this.$store.replaceState(
	        Object.assign(
	          {},
	          this.$store.state,
	          JSON.parse(sessionStorage.getItem("state"))
	        )
	      )
	    }
	  },
	  mounted: function() {
	    window.addEventListener('beforeunload', () => {
	      //刷新前将目前登录的用户保存到sessionStorage中
	      sessionStorage.setItem('state', JSON.stringify(this.$store.state))
	    })
	  },

	}
</script>

<style>
	*{
			margin: 0px;
			padding: 0px;
	}
	#app {
	  font-family: Avenir, Helvetica, Arial, sans-serif;
	  -webkit-font-smoothing: antialiased;
	  -moz-osx-font-smoothing: grayscale;
	  color: #502c31;
	  width: 100%;
	  height: 100%;
	  position: fixed;
	}
</style>
