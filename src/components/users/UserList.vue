<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-input placeholder="请输入内容" v-model="pageInfo.query" clearable @clear="getUserList">
            <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="showAddDialog">添加用户</el-button>
        </el-col>
      </el-row>
      <el-table
          border stripe
          :data="userData"
          style="width: 100%">
        <el-table-column
            align="center"
            type="index"
            label="序号"
            width="60">
        </el-table-column>
        <el-table-column
            align="center"
            prop="username"
            label="用户名"
            width="180">
        </el-table-column>
        <el-table-column
            align="center"
            prop="email"
            label="邮箱地址"
            width="180">
        </el-table-column>
        <el-table-column
            align="center"
            prop="mobile"
            label="电话">
        </el-table-column>
        <el-table-column
            align="center"
            prop="role_name"
            label="角色">
        </el-table-column>
        <el-table-column
            align="center"
            label="状态">
          <template v-slot="scope">
            <el-switch
                v-model="scope.row.mg_state"
                @change="userStateChanged(scope.row)"
                active-color="#13ce66"
                inactive-color="#ff4949">
            </el-switch>
          </template>

        </el-table-column>
        <el-table-column
            align="center"
            label="操作">
          <template v-slot="scope">
            <el-button type="primary" icon="el-icon-edit" size="small" @click="showEditDialog(scope.row.id)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="small" @click="deleteUser(scope.row.id)"></el-button>
            <el-button type="warning" icon="el-icon-setting" size="small"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageInfo.pagenum"
          :page-sizes="[1, 2, 5,10]"
          :page-size="pageInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </el-card>
    <el-dialog
        title="添加用户"
        :visible.sync="AddDialogVisible"
        width="50%"
        @close="closeDialog">
      <el-form :model="addUserInfo" :rules="rules" ref="addForm" label-width="100px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addUserInfo.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addUserInfo.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addUserInfo.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="addUserInfo.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="AddDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitUserInfo">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
        title="修改用户"
        :visible.sync="EditDialogVisible"
        width="50%"
        @close="closeEditDialog">
      <el-form :model="editUserInfo" :rules="rules" ref="editForm" label-width="100px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editUserInfo.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="editUserInfo.mobile"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editUserInfo.email"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="EditDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="submitUpdateUserInfo" >确 定</el-button>
  </span>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: "UserList",
  data(){
    var validateMail = (rule, value, callback) => {
      const pattern = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+$/;
      if(pattern.test(value)){
        callback();
      }
      callback(new Error('请输入合法的邮箱地址'));
    };
    var validateMoblie = (rule, value, callback) => {
      const pattern = /^1[3456789]\d{9}$/;
      if(pattern.test(value)){
        callback();
      }
      callback(new Error('请输入正确的手机号码'));
    };
    return{
      rules: {
        username: [
          {required: true, message: '请输入用户名称', trigger: 'blur'},
          {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur'}
        ],
        email: [
          {required: true, message: '请输入邮箱', trigger: 'blur'},
          {validator:validateMail,trigger: "blur"}
        ],
        mobile: [
          {required: true, message: '请输入手机号', trigger: 'blur'},
          {validator:validateMoblie,trigger: "blur"}
        ],
      },
      addUserInfo:{
        username:'',
        password:'',
        email:'',
        mobile:''
      },
      editUserInfo:{
        username:'',
        email:'',
        mobile:'',
        id:''
      },
      pageInfo:{
        pagenum:1,
        pagesize:5,
        query:""
      },
      userData:[],
      total:0,
      AddDialogVisible:false,
      EditDialogVisible:false
    }
  },
  methods:{
    //pagesize每页大小变化
    handleSizeChange(size){
      this.pageInfo.pagesize=size;
      this.getUserList();
    },
    //pagenum页码变化
    handleCurrentChange(num){
      console.log('num:'+num);
      this.pageInfo.pagenum=num;
      this.getUserList();
    },
    userStateChanged(obj){
      console.log(obj);
      this.$axios.put(`/users/${obj.id}/state/${obj.mg_state}`).then(res=>{
        console.log(res);
        if (res.data.meta.status !== 200){
          this.$message.error(res.data.meta.msg);
          return;
        }
        this.$message.success("修改用户状态成功！")
      })
    },
    getUserList(){
      this.$axios.get("/users",{
        params: this.pageInfo
      }).then(res=>{
        console.log(res);
        if (res.data.meta.status !== 200){
          this.$message.error(res.data.meta.msg);
          return;
        }
        this.userData = res.data.data.users;
        this.total=res.data.data.total
      })
    },
    showAddDialog(){
      this.AddDialogVisible = true
    },
    submitUserInfo(){
      this.$refs.addForm.validate(valid=>{
        if (!valid){
          return this.$message.error('请填写完整用户信息！');
        }else {
          this.$axios.post("/users",this.addUserInfo).then(
              res=>{
                if (res.data.meta.status !== 201){
                  this.$message.error(res.data.meta.msg)
                  return;
                }else {
                  this.$message.success("添加用户成功！")
                  this.AddDialogVisible = false
                  this.getUserList()
                }
              })
        }
      })
    },
    closeDialog(){
      this.$refs.addForm.resetFields();
    },
    closeEditDialog(){
      this.$refs.editForm.resetFields();
    },
    showEditDialog(id){
      this.EditDialogVisible = true;
      this.$axios.get(`users/${id}`).then(res=>{
        console.log(res);
        this.editUserInfo.username = res.data.data.username;
        this.editUserInfo.email = res.data.data.email;
        this.editUserInfo.mobile = res.data.data.mobile;
        this.editUserInfo.id = res.data.data.id;
      })
    },
    submitUpdateUserInfo(){
      this.$refs.editForm.validate(valid=>{
        if (!valid){
          return this.$message.error("请填写完整信息！")
        }else {
          this.$axios.put(`/users/${this.editUserInfo.id}`,
              {
                  email: this.editUserInfo.email,
                  mobile: this.editUserInfo.mobile
              }).then(res=>{
                if (res.data.meta.status !== 200){
                  return this.$message.error('修改用户信息失败！')
                }
                this.$message.success("更新用户信息成功！")
                this.EditDialogVisible = false
                this.getUserList()
          })
        }
      })
    },
    deleteUser(id){
      this.$confirm('确定删除该用户？','提示',{
        confirmButtonText:'确定',
        cancelButtonText:'取消',
        type:'warning'
      }).then(()=>{
        this.$axios.delete(`/users/${id}`).
        then(res=>{
          if (res.data.meta.status !==200){
            return this.$message.error('删除用户失败!')
          }
          this.$message.success('删除用户成功!')
          this.getUserList()
        })
      }).catch(()=>{
        return;
      })
    }
  },

  created(){
    this.getUserList();
  }
}
</script>

<style scoped>
.el-card{
  margin-top: 20px;
}
.el-table{
  margin-top: 20px;
}

</style>
