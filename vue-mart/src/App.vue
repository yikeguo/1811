<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/login">login</router-link> | 
      <span v-if="isLogin" @click="logout">退出</span>
    </div>
    <router-view/>
  </div>
</template>
<script>
export default {
  computed: {
    isLogin() {
      return !!this.$store.state.token
    }
  },
  methods: {
    logout() {
      this.$axios.get('/api/logout')
    }
  },
  async created () {
    const token = localStorage.getItem('token')
    if (token) {
      this.$store.commit('settoken', token)
    }
    const ret = await this.$axios.get('/api/goods')
  }
}
</script>

<style lang="stylus">
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50

#nav
  padding 30px
  a
    font-weight bold
    color #2c3e50
    &.router-link-exact-active
      color #42b983
</style>
