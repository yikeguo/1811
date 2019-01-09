<template>
  <div>
    <div class="logo">
      <img src="https://weikebang.com/Content/Home/images/logo_white.png" alt>
    </div>
    <!-- <cube-button>登录</cube-button> -->
    <cube-form
     :model="model"
     :schema="schema"
     @submit="handleLogin"
     @validate="handleValidate">
    </cube-form>
  </div>
</template>

<script>
/* eslint-disable */
import axios from "axios";
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
              required: true
            },
            trigger: "blur"
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
      if (ret.status == 200) {
        if (ret.data.code == 0) {
          localStorage.setItem('token', ret.data.token)
          this.$store.commit('settoken', ret.data.token)
        } else {
          const toast = this.$createToast({
            time: 2000,
            txt: ret.data.message || 'err未知错误',
            type: 'error'
          })
          toast.show()
        }
      }
    }
  }
}
</script>
<style>
</style>
