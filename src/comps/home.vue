<template>
<el-container>
  <el-header>
    <img src="../assets/img/heima.png" alt>
    <span style>电商后台管理系统</span>
    <el-button type="info" @click="logout">退出</el-button>
  </el-header>
  <el-container>
    <el-aside :width="showbar?'200px':'65px'">
      <div class="showbar" @click="showbar=!showbar">|||</div>
      <el-menu background-color="#333744" text-color="#fff" active-text-color="#409eff" :collapse="!showbar" :unique-opened="true" :collapse-transition="false" :width="showbar?'200px':'65px'" :router="true">
        <el-submenu :index="item.path" :style="{width:showbar?'200px':'65px'}" v-for="(item,index) in menulist" :key="item.id">
          <template slot="title">
              <i :class="'iconfont icon-'+menuicon[index]"></i>
              <span style="margin-left:10px">{{item.authName}}</span>
</template>
            <el-menu-item-group v-for="item1 in item.children" :key="item1.id">
              <el-menu-item :index="item1.path">
                <i class="el-icon-menu"></i>
                {{item1.authName}}
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main >
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  created() {
    this.gethomelist()
  },
  data() {
    return {
      showbar: true,
      menulist: [],
      menuicon: ['users', 'tijikongjian', 'shangpin', 'danju', 'baobiao']
    }
  },
  methods: {
    logout() {
      
      this.$confirm('此操作将退出登录, 是否继续?', '提示', {
          confirmButtonText: '退出',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          this.$router.push('/login')
          window.sessionStorage.removeItem('token')
        })
        .catch(() => {})
    },
    async gethomelist() {
      var {
        data: dt
      } = await this.$http.get('/menus')
      this.menulist = dt.data
    }
  }
}
</script>
<style lang="less" scoped>
.el-container {
  height: 100%;
  .el-header {
    background-color: #373d41;
    padding: 0;
    display: flex;
    align-items: center;
    img {
      width: 50px;
      height: 50px;
      margin-right: 10px;
      user-select: none;
      
    }
    span {
      font-size: 22px;
      color: #fff;
      user-select: none;
    }
    .el-button {
      position: absolute;
      right: 20px;
    }
  }
  .el-aside {
    overflow: hidden;
    background-color: #333744;
    height: 100%;
    .showbar {
      color: #ffffff;
      height: 25px;
      line-height: 25px;
      font-size: 12px;
      text-align: center;
      user-select: none;
      letter-spacing: 0.1em;
      cursor: pointer;
      background: #4a5064;
    }
  }
  .el-main {
    height: 100%;
    background-color: #eaedf1;
  }
}
</style>