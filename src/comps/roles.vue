<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>角色管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-button type="primary">添加角色</el-button>
      <el-table :data="rolestable" border style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="xxx">
            <el-row
              v-for="(item, index) in xxx.row.son"
              :key="index"
              style="border-top: 1px solid rgb(235, 238, 245);border-bottom: 1px solid rgb(235, 238, 245);margin-top: -1px;"
            >
              <el-col :span="6">
                <el-tag closable @close="delrights(xxx.row,item.id)">{{item.authName}}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <el-col :span="18">
                <el-row
                  v-for="(item1, index) in item.children"
                  :key="index"
                  style="border-bottom: 1px solid rgb(235, 238, 245);;margin-bottom: -1px;"
                >
                  <el-col :span="8">
                    <el-tag
                      @close="delrights(xxx.row,item1.id)"
                      closable
                      type="success"
                    >{{item1.authName}}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="16">
                    <el-tag
                      @close="delrights(xxx.row,item2.id)"
                      closable
                      type="warning"
                      v-for="(item2, index) in item1.children"
                      :key="index"
                    >{{item2.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作" :width="300">
          <el-button type="primary" size="mini" icon="el-icon-edit">编辑</el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete">删除</el-button>
          <el-button type="warning" size="mini" icon="el-icon-setting" @click="allowpower()">分配权限</el-button>
        </el-table-column>
      </el-table>
      <el-dialog title="提示" :visible.sync="powerdialogVisible" width="40%">
        <el-form ref="form" :model="form" label-width="80px">
          <el-tree
            :data="data2"
            show-checkbox
            node-key="id"
            default-expand-all
            :default-checked-keys="[5]"
            :props="defaultProps"
          ></el-tree>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="powerdialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="powerdialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
export default {
    created() {
        this.getrolestable()
    },
    methods: {
        allowpower() {
            this.powerdialogVisible = true
        },
        delrights(e, k) {
            //请求路径：roles/:roleId/rights/:rightId
            //请求方法：delete
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(async () => {
                    var { data: dt } = await this.$http.delete(
                        '/roles/' + e.id + '/rights/' + k
                    )
                    if (dt.meta.status != 200) {
                        return this.$message.error(dt.meta.msg)
                    }
                    this.$message.success(dt.meta.msg)
                    e.son = dt.data
                })
                .catch(() => {})
        },
        async getrolestable() {
            var { data: dt } = await this.$http.get('/roles')
            dt.data.forEach(item => {
                item.son = item.children
                delete item.children
            })
            this.rolestable = dt.data
        }
    },
    data() {
        return {
            rolestable: [],
            powerdialogVisible: false,
            data2: [
                {
                    id: 1,
                    label: '一级 1',
                    children: [
                        {
                            id: 4,
                            label: '二级 1-1',
                            children: [
                                {
                                    id: 9,
                                    label: '三级 1-1-1'
                                },
                                {
                                    id: 10,
                                    label: '三级 1-1-2'
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 2,
                    label: '一级 2',
                    children: [
                        {
                            id: 5,
                            label: '二级 2-1'
                        },
                        {
                            id: 6,
                            label: '二级 2-2'
                        }
                    ]
                },
                {
                    id: 3,
                    label: '一级 3',
                    children: [
                        {
                            id: 7,
                            label: '二级 3-1'
                        },
                        {
                            id: 8,
                            label: '二级 3-2'
                        }
                    ]
                }
            ],
            defaultProps: {
                children: 'children',
                label: 'label'
            }
        }
    }
}
</script>
<style lang="less">
.el-row {
    display: flex;
    align-items: center;
    .el-tag {
        margin: 10px 5px;
    }
}
</style>