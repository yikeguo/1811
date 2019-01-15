<template>
  <div>
    <div class="logo">
      <img src="https://weikebang.com/Content/Home/images/logo_white.png" alt>
    </div>
    <!-- <cube-button>登录</cube-button> -->
    <cube-form
     v-if="!$store.state.token"
     :model="model"
     :schema="schema"
     @submit="handleLogin"
     @validate="handleValidate">
    </cube-form>
    <div v-else>
      <p>已登录</p>
      <i class="cubeic-person"></i>
      <cube-button @click="logout">注销</cube-button>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import axios from "axios";
import {mapState} from 'vuex'
export default {
  data() {
    return {
      model: {
        username: "",
        passwd: ""
      },
      schema: {
        fields: [
          {
            type: "input",
            modelKey: "username",
            label: "用户名",
            props: {
              placeholder: "请输入用户名"
            },
            rules: {
              required: true,
              type: 'string',
              min: 3,
              max: 15,
              usercheck: (val) => {
                return (reslove) => {
                  this.$axios.get('/api/check?username=' + val).then(res => {
                    reslove(res.code == 0)
                  })
                }
              }
            },
            trigger: "blur",
            messages: {
              required: '请输入用户名',
              min: '用户名小于3',
              max: '用户名不超过15'
            }
          },
          {
            type: "input",
            modelKey: "passwd",
            label: "密码",
            props: {
              type: "password",
              placeholder: "请输入密码",
              eye: {
                open: true
              }
            },
            rules: {
              required: true
            },
            trigger: "blur"
          },
          {
            type: "submit",
            label: "登录"
          }
        ]
      }
    };
  },
  methods: {
    logout () {
      localStorage.removeItem('token')
      this.$store.commit('settoken', '')
    },
    handleValidate(ret) {
      console.log(ret);
    },
    async handleLogin(e) {
      e.preventDefault();
      const obj = {
        username: this.model.username,
        passwd: this.model.passwd
      };
      const ret = await axios.get("/api/login", { params: obj });
      console.log(ret);
        if (ret.code == 0) {
          localStorage.setItem('token', ret.token)
          this.$store.commit('settoken', ret.token)
        } else {
          const toast = this.$createToast({
            time: 2000,
            txt: ret.message || 'err未知错误',
            type: 'error'
          })
          toast.show()
        }
    }
  }
}
</script>
<style>
</style>
