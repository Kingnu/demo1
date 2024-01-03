<template>
  <el-container>
    <el-header>
      <div class="header_img">
        <img src="../assets/img.png" style="width: 130px;margin-left: 14px" alt="">
        <span>高校餐厅管理系统</span>
      </div>
      <el-button @click="logOutSystem" >退出登录</el-button>
    </el-header>
    <el-container>
      <el-aside :width="isCollapce?'64px':'200px'">
        <div class="toggle-button" @click="isCollapce=!isCollapce" style="color: slategray">|||</div>
            <el-menu
                unique-opened
                :collapse="isCollapce"
                :collapse-transition="false"
                :router="true"
                :default-active="activePath"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose">
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-s-custom"></i>
                  <span>用户管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="1-1" @click="saveNavPath()"><i class="el-icon-user"></i>管理员账号管理</el-menu-item>
                  <el-menu-item index="1-2"><i class="el-icon-user-solid"></i>用户账号管理</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-s-shop"></i>
                  <span>店铺管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="2-1"> <i class="el-icon-s-shop"></i>商户信息管理</el-menu-item>
                  <el-menu-item index="2-2"> <i class="el-icon-s-shop"></i>菜品信息管理</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-s-tools"></i>
                  <span>权限管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="3-1"><i class="el-icon-s-tools"></i>用户权限管理</el-menu-item>
                  <el-menu-item index="3-2"><i class="el-icon-s-tools"></i>商户权限管理</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="4">
                <template slot="title">
                  <i class="el-icon-s-data"></i>
                  <span>榜单管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="4-1"><i class="el-icon-s-data"></i>红榜</el-menu-item>
                  <el-menu-item index="4-2"><i class="el-icon-s-data"></i>黑榜</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="5">
                <template slot="title">
                  <i class="el-icon-mobile"></i>
                  <span>动态管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="5-1"><i class="el-icon-mobile"></i>动态内容</el-menu-item>
                  <el-menu-item index="5-2"><i class="el-icon-mobile"></i>评论内容</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="6">
                <template slot="title">
                  <i class="el-icon-data-analysis"></i>
                  <span>数据分析</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="6-1"><i class="el-icon-data-analysis"></i>点赞</el-menu-item>
                  <el-menu-item index="6-2"><i class="el-icon-data-analysis"></i>浏览</el-menu-item>
                  <el-menu-item index="6-3"><i class="el-icon-data-analysis"></i>评分</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
      </el-aside>
      <el-main><router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  data(){
    return{
      isCollapce:false,
      num:10,
      menuList:[],
      menuWidth:"200px",
      iconObj:{
        125:"el-icon-user-solid",
        103:"el-icon-s-tools",
        101:"el-icon-s-shop",
        102:"el-icon-s-order",
        145:"el-icon-orange"
      },
      activePath:""
    }
  },
  created(){
    this.$axios.get("menus").
    then(res=>{
      console.log(res);
      if (res.data.meta.status !== 200){
        this.$message.error(res.data.meta.msg);
        return;
      }
      this.menuList = res.data.data;
    })
     this.activePath=window.sessionStorage.getItem("path")
  },
  methods:{
    logOutSystem(){
      window.sessionStorage.removeItem("token");
      window.sessionStorage.removeItem("path");
      this.$router.push("/login")
    },
    menuCollapce(){
      this.isCollapce = !this.isCollapce;
      this.menuWidth="65px";
    },
    saveNavPath(path){
      window.sessionStorage.setItem("path",path)
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style scoped>
.el-container{
  height: 100%;
}
.el-header{
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color:black;
  font-size: 20px;
}
.header_img{
  display: flex;
  align-items: center;
}
.header_img>img{
  width: 50px;
  border-radius: 5px;
  margin-right: 20px;
}
.el-aside{
  background-color: #ffffff;
}
.el-aside span{
  margin-left: 5px;
}
.el-main{
  background-color: #e3f0f4;
}
.toggle-button{
  text-align: center;
  line-height: 28px;
  color: white;
  cursor: pointer;
  letter-spacing: 2px ;
}
</style>
