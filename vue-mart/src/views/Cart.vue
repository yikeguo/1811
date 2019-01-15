<template>
  <div>
    <div class="good" v-for="(item, index) in cart" :key="item.id">
      {{item.title}}
      <div class="right">
        <i class="cubeic-remove" @click="removeCart(index)"></i>
        <span>
          {{item.cartCount}}
        </span>
        <i class="cubeic-add" @click="addCart(index)"></i>
      </div>
    </div>
    <div>
      总价 {{total}}
    </div>
    <!-- <div>
      {{cart}}
    </div> -->
  </div>
</template>
<script>
import {mapState, mapGetters} from 'vuex'
export default {
  computed: {
    ...mapState({
      cart: state => state.cart
    }),
    ...mapGetters({
      total: 'total'
    })
  },
  methods: {
    addCart(index) {
      this.$store.commit('cartadd', index)
    },
    removeCart(index) {
      this.$store.commit('cartremove', index)
    }
  }
}
</script>
<style lang="stylus">
.good
  padding 10px
  text-align left
  .right
    float right
  i 
    font-size 18px
</style>
