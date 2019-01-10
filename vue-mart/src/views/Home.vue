<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  async created () {
    const ret = await this.$axios.get('/api/goods')
  }
}
</script>
