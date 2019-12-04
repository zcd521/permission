<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
      <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  components:{},
  created() {
    if(sessionStorage.NxToken){
        const token = sessionStorage.NxToken
        const userInfo = sessionStorage.userInfo
      //存储vuex
      this.$store.dispatch('setUserInfo', JSON.parse(userInfo));
      this.$store.dispatch('setAuthenticated', !this.isEmpty(token));
    }
  },

  methods: {
    //判断
    isEmpty(value){
      return (
        value === undefined || 
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      )
    }
  },
}
</script>

<style>
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
} */
body {
  margin:0;
  background: #F2F2F2;
}
</style>
