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
        <el-table-column prop="id" label="操作" width="300">
          <template slot-scope="aa">
            <el-tooltip class="item" effect="dark" content="编辑" placement="top" :enterable="false">
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="edituser(aa.row.id)"
              ></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除" placement="top" :enterable="false">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="deluser(aa.row.id)"
              ></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="设置" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog
        title="提示"
        :visible.sync="editdialogVisible"
        width="30%"
        :before-close="handleClose"
      >
        <el-form ref="editform" :model="editform" label-width="80px">
          <el-form-item label="用户名称">
            <el-input v-model="editform.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="editform.email"></el-input>
          </el-form-item>
          <el-form-item label="手机号码">
            <el-input v-model="editform.mobile"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editdialogVisible = false">取 消</el-button>
          <el-button type="primary" slot-scope @click="editsure()">确 定</el-button>
        </span>
      </el-dialog>
      <el-pagination
        @size-change="usershandleSizeChange"
        @current-change="usershandleCurrentChange"
        :page-sizes="[1, 2, 3, 4]"
        :page-size="userslistget.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="fytotal"
      ></el-pagination>

      <el-dialog
        title="添加用户"
        :visible.sync="adduserdialogVisible"
        width="50%"
        :before-close="handleClose"
        @close="addclose"
      >
        <el-form
          :model="addruleForm"
          :rules="addrules"
          ref="addruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名称" prop="username">
            <el-input v-model="addruleForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="addruleForm.password"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="addruleForm.email"></el-input>
          </el-form-item>
          <el-form-item label="手机号码" prop="mobile">
            <el-input v-model="addruleForm.mobile"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="adduserdialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addsure">确 定</el-button>
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
    var checkmobile = (rule, value, callback) => {
      if (!/^1[35789]\d{9}$/.test(value)) {
        return callback(new Error('请输入正确的手机号码'))
      }
      callback()
    }
    return {
      editform: {
        username: '',
        email: '',
        mobile: ''
      },
      addruleForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      addrules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
        mobile: [
          { required: false, message: '请输入手机号码', trigger: 'blur' },
          { validator: checkmobile, trigger: 'blur' }
        ]
      },
      editdialogVisible: false,
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
    async editsure() {
      // console.log(this.editform)
      var { data: dt } = await this.$http.put(
        '/users/' + this.editform.id,
        this.editform
      )
      if (dt.meta.status != 200) return this.$message.error(dt.meta.msg)
      this.$message.success(dt.meta.msg)
      this.editdialogVisible = false
    },
    async edituser(id) {
      var { data: dt } = await this.$http.get('/users/' + id)
      // console.log(dt)
      this.editform = dt.data
      // console.log(this.editform)
      this.editdialogVisible = true
    },
    deluser(id) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          var { data: dt } = await this.$http.delete('/users/' + id)
          if (dt.meta.status == 200) {
            this.$message.success('删除成功')
          } else {
            return this.$message.error(dt.meta.msg)
          }
          this.getuserslist()
        })
        .catch(() => {})
    },
    addsure() {
      this.$refs.addruleForm.validate(async valid => {
        if (valid) {
          var { data: dt } = await this.$http.post('/users', this.addruleForm)
          if (dt.meta.status != 201) {
            this.$message.success(dt.meta.msg)
            return false
          }
          this.$message.success(dt.meta.msg)
          this.adduserdialogVisible = false
        }
      })
    },
    addclose() {
      this.$refs.addruleForm.resetFields()
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
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
      // console.log(this.userslist )
      // console.log(this)
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