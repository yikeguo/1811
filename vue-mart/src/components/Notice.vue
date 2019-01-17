<template>
  <div class="aler">
    <div class="alert-container" v-for="item in alerts" :key="item.id">
      <div class="alert-content">

      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      alerts: []
    }
  },
  created () {},
  methods: {
    
  }
}
</script>
<style>

</style>
