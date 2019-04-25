<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请输入搜索内容"
            v-model="userslistget.query"
            class="input-with-select"
            clearable
            @clear="getuserslist()"
            @keyup.enter.native="getuserslist()"
          >
            <el-button slot="append" icon="el-icon-search" @click="getuserslist()"></el-button>
          </el-input>
        </el-col>
        <el-col :span="7">
          <el-button type="primary" @click="adduserdialogVisible = true">添加用户</el-button>
        </el-col>
      </el-row>
      <el-table :data="userslist" border style="width: 100%">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="mobile" label="手机号码" width="140"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
        <el-table-column prop="mg_state" label="状态" width="100">
          <span slot-scope="xxx">
            <el-switch v-model="xxx.row.mg_state"></el-switch>
          </span>
        </el-table-column>
        <el-table-column prop label="操作" width="300">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top" :enterable="false">
            <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top" :enterable="false">
            <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="设置" placement="top" :enterable="false">
            <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
          </el-tooltip>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="usershandleSizeChange"
        @current-change="usershandleCurrentChange"
        :page-sizes="[1, 2, 3, 4]"
        :page-size="userslistget.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="fytotal"
      ></el-pagination>

      <el-dialog title="添加用户" :visible.sync="adduserdialogVisible" width="30%" :before-close="handleClose">
        <span>这是一段信息</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="adduserdialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="adduserdialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
export default {
    created() {
        this.getuserslist()
    },
    data() {
        return {
            adduserdialogVisible: false,
            userslist: [],
            fytotal: 0,
            userslistget: {
                query: '',
                pagenum: 1,
                pagesize: 2
            }
        }
    },
    methods: {
        handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
        usershandleSizeChange(val) {
            // console.log(`每页 ${val} 条`)
            this.userslistget.pagesize = val
            this.getuserslist()
        },
        usershandleCurrentChange(val) {
            // console.log(`当前页: ${val}`)
            this.userslistget.pagenum = val
            this.getuserslist()
        },
        async getuserslist() {
            var { data: dt } = await this.$http.get('/users', {
                params: this.userslistget
            })
            this.userslist = dt.data.users
            this.fytotal = dt.data.total
            // console.log(dt)
            // console.log(this.userslist)
        }
    }
}
</script>
<style lang="less">
.box-card,
.el-table,
.el-pagination {
    margin-top: 15px;
    font-size: 12px;
}
</style>