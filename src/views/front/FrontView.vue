<template>
  <div style="background-color: #f5f5dc">
    <div
      style="
        display: flex;
        background-color: #fff;
        height: 60px;
        line-height: 60px;
        border-bottom: 1px solid #eee;
      "
    >
      <div style="width: 240px; display: flex; padding-left: 30px">
        <div style="width: 60px">
          <img
            src="../../assets/front-logo.jpg"
            alt=""
            style="width: 40px; position: relative; top: 10px; right: 0"
          />
        </div>
        <div style="flex: 1; font-size: 20px; color: black; font-weight: bold">宠物管理系统</div>
      </div>
      <div style="flex: 1">
        <el-menu :default-active="'1'" class="el-menu-demo" mode="horizontal" router>
          <el-menu-item index="/front/home">首页</el-menu-item>
          <el-menu-item index="/front/adopt">宠物领养</el-menu-item>
          <el-menu-item index="/front/salvation">宠物救助</el-menu-item>
          <el-menu-item index="/front/lost">丢失宠物查看</el-menu-item>
          <el-menu-item index="/front/article">宠物论坛</el-menu-item>
        </el-menu>
      </div>
      <div style="width: 160px">
        <div
          v-if="!user.username"
          style="
            display: flex;
            height: 100%;
            align-items: center;
            text-align: right;
            padding-right: 30px;
          "
        >
          <el-button @click="router.push('/login')">登录</el-button>
          <el-button @click="router.push('/register')">注册</el-button>
        </div>
        <div v-else>
          <el-dropdown style="width: 150px; cursor: pointer; text-align: right">
            <div style="display: inline-block; margin-top: -20px; font-size: 18px">
              <img
                src="https://a.520gexing.com/uploads/allimg/2023082316/qdao44qasb51.jpg"
                alt=""
                style="width: 57px; border-radius: 10%; position: relative; top: 21px; right: 5px"
              />
              <span>{{ user.nickname }}</span>
              <i class="el-icon-arrow-down" style="margin-left: 5px"></i>
            </div>
            <template v-slot:dropdown>
              <el-dropdown-menu style="width: 100px; text-align: center">
                <el-dropdown-item
                  style="font-size: 14px; padding: 5px 0"
                  v-if="user.role !== 'ROLE_USER'"
                >
                  <router-link to="/home">后台管理</router-link>
                </el-dropdown-item>
                <el-dropdown-item style="font-size: 14px; padding: 5px 0">
                  <router-link to="/front/password">修改密码</router-link>
                </el-dropdown-item>
                <el-dropdown-item style="font-size: 14px; padding: 5px 0">
                  <router-link to="/front/person">个人信息</router-link>
                </el-dropdown-item>
                <el-dropdown-item style="font-size: 14px; padding: 5px 0">
                  <span style="text-decoration: none" @click="store.logout">退出</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>
    <div style="width: 800px; margin: 0 auto">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { useStore } from '@/stores'
import { ref } from 'vue'
import { RouterView, useRouter } from 'vue-router'

const router = useRouter()
const store = useStore()

const user = ref(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {})
</script>

<style scoped>
.item {
  display: inline-block;
  width: 100px;

  text-align: center;
  cursor: pointer;
}
.item a {
  color: #1e90ff;
}
.item:hover {
  background-color: LightPink;
}
</style>
