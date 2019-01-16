<template>
  <div>
    商品列表
    <div class="item" v-for="item in data" :key="item.id">
      <router-link :to="`/detail/${item.id}`">
        <div class="left">
          <img :src="item.img" alt="" @click.stop.prevent="imgPreview(item.img)">
        </div>
        <div class="right">
          <div class="title">{{item.title}}</div>
          <div class="info">
            <span>{{item.count}}人购买</span>
            <i class="cubeic-add" @click.stop.prevent="addCart($event, item)"></i>
          </div>
        </div>
      </router-link>
    </div>
  </div>
  
</template>
<script>
export default {
  props: ["data"],
  methods: {
    addCart (event, item) {
      this.$store.commit('addCart', item)
      this.$emit('addcart', event.target)
    },
    imgPreview(img) {
      this.$createImagePreview({
        imgs: [img]
      }).show()
    }
  },
  computed() {}
};
</script>
<style lang="stylus">
.item
  padding 10px
  overflow hidden
.left
  width 100px
  float left
  img 
    width 100%
.right
  margin-left 120px
  text-align  right
.title
  line-height 30px
.cubeic-add
  font-size 22px
    
</style>
