<template>
  <div class="home">
    <cube-slide
      :data="slider"
      :threshold="0.7"
      :interval="10000"
    >
      <cube-slide-item v-for="(item,index) in slider" :key="index">
        <router-link :to="`/detail/${item.id}`">
          <img class='slider' :src="item.img" alt="">
        </router-link>
      </cube-slide-item>
    </cube-slide>
    <cube-button @click='showCatg'>选择分类</cube-button>
    <goods-list :data="all"></goods-list>
    <!-- :visible="showDrawer" -->

    <cube-drawer
      ref='drawer'
      title='请选择分类'
      :data="[drawList]"
      @select="selectHandler"
    >

    </cube-drawer>
  </div>
</template>

<script>
// @ is an alias to /src
import GoodsList from '@/components/GoodsList.vue'
let labels = {
  'fe':'前端',
  'python':'Python',
  'java':'Java',
  'bigdata':'大数据',
  'ai':'人工智能'
}
export default {
  name: 'home',
  components: {
    GoodsList
  },
  data () {
    return {
      slider:[],
      selectKeys:[],
      keys:[],
      data:[],
    }
  },
  methods:{
    showCatg(){
        this.$refs.drawer.show()
    },
    selectHandler(val){
      this.selectKeys = [...val]
    }
  },
  async created () {
    const ret = await this.$axios.get('/api/goods')
    this.slider = ret.slider
    this.keys = ret.keys
    this.selectKeys = [...this.keys]
    this.data = ret.data
  },
  computed:{
    drawList(){
      return this.keys.map(v=>{
        return {
          value:v,
          text: labels[v]
        }
      })
    },
    all(){
      let ret = []
      this.selectKeys.forEach(v=>{
        ret = ret.concat(this.data[v])
      })
      return ret
    }
    // alias
  }
}
</script>
<style>
img{width:100%}
</style>

