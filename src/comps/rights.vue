<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-table :data="rightslist" border style="width: 100%" stripe>
        <el-table-column type="index" label="序号" width="180"></el-table-column>
        <el-table-column prop="authName" label="权限名称" width="180"></el-table-column>
        <el-table-column prop="path" label="路径"></el-table-column>
        <el-table-column prop="level" label="等级">
          <div slot-scope="xxx">
            <el-tag v-if="xxx.row.level==0">一级</el-tag>
            <el-tag v-else-if="xxx.row.level==1" type="success">二级</el-tag>
            <el-tag v-else-if="xxx.row.level==2" type="warning">三级</el-tag>
          </div>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  created() {
    this.getrightslist()
  },
  methods: {
    async getrightslist() {
      var { data: dt } = await this.$http.get('/rights/list')
      // console.log(dt)
      this.rightslist = dt.data
    }
  },
  data() {
    return {
      rightslist: []
    }
  }
}
</script>

<style lang="less" scoped>
</style>