<template>
  <div class="login-bg">
    <div class="loginbox">
      <div class="loginimg">
        <img src="../assets/img/logo.png">
      </div>
      <el-form ref="loginformref" :model="loginform" :rules="loginformrules">
        <el-form-item prop="username">
          <el-input v-model="loginform.username">
            <i slot="prefix" class="iconfont icon-user"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginform.password" type="password">
            <i slot="prefix" class="iconfont">&#xe66c;</i>
          </el-input>
        </el-form-item>
        <el-row>
          <el-col :push="15">
            <el-button type="primary" @click="login">登录</el-button>
            <el-button type="info" @click="reset">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    login() {
      // location.href='/#/home'
      this.$refs.loginformref.validate(async valid => {
        if (valid) {
          var { data: dt } = await this.$http.post('/login', {
            username: this.loginform.username,
            password: this.loginform.password
          })
          if (dt.meta.status === 400) return this.$message.error(dt.meta.msg)
          window.sessionStorage.setItem('token', dt.data.token)
          // location.href = '/#/home'
          this.$router.push('/home')
        }
      })
    },
    reset() {
      this.$refs.loginformref.resetFields()
    }
  },
  data() {
    return {
      loginformrules: {
        username: [{ required: true, message: '必填项', trigger: 'blur' }],
        password: [{ required: true, message: '必填项', trigger: 'blur' }]
      },
      loginform: {
        username: 'admin',
        password: '123456'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-bg {
  background-color: #2b4b6b;
  height: 100%;
  overflow: hidden;
  .loginbox {
    width: 450px;
    height: 304px;
    background-color: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 4px;
    .loginimg {
      width: 130px;
      height: 130px;
      border: 1px solid #eee;
      border-radius: 50%;
      overflow: hidden;
      padding: 8px;
      box-shadow: 0 0 10px #eee;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #fff;
      img {
        width: 100%;
        height: 100%;
        vertical-align: center;
        background-color: #eee;
        border-radius: 50%;
      }
    }
    .el-form {
      width: 100%;
      padding: 20px;
      box-sizing: border-box;
      position: absolute;
      bottom: 0;
    }
  }
}
</style>

