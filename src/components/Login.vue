<template>
  <div class="login_container" ref="vantaRef">
    <div class="login_box">
      <h1>登 录</h1>
      <div class="login_bd">
        <el-form ref="form" :model="user" :rules="rules">
          <el-form-item prop="username">
            <el-input prefix-icon="el-icon-user" v-model="user.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input show-password prefix-icon="el-icon-lock" v-model="user.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="userLogin">登录</el-button>
            <el-button @click="resetLoginForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

  </div>
</template>

<script>
import * as THREE from 'three'
import BIRDS from 'vanta/src/vanta.birds.js'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Login",
  data(){
    return{
      user:{
        username:"",
        password:""
      },
      rules:{
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.vantaEffect = BIRDS({
      el: this.$refs.vantaRef,
      THREE: THREE
    })
  },
  beforeDestroy() {
    if (this.vantaEffect) {
      this.vantaEffect.destroy()
    }
  },
  methods:{
    userLogin(){
      //表单验证，通过验证了才能发送请求
      this.$refs.form.validate(result=>{
        if(!result){
          return;
        }
        this.$axios.post("/login",this.user).
        then(res=>{
          console.log(res);
          if(res.data.meta.status !==200){
            return this.$message.error(res.data.meta.msg);
          }
          sessionStorage.setItem("token",res.data.data.token)
          this.$message.success(res.data.meta.msg);
          this.$router.push("/home")
        })
      })

    },
    resetLoginForm(){
      this.$refs.form.resetFields();
    }

  }
}
</script>

<style scoped>
.login_container{
  background-color: lightslategray;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
h1{
  margin-top: 20px;

}
.login_box{
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 10px;
}
.login_bd{
  padding:0 15px;
  margin-top: 40px;
}
</style>
