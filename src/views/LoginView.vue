<template>
  <div class="wrapper">
    <div
      style="
        margin: 150px auto;
        background-color: #fff;
        width: 400px;
        height: 300px;
        padding: 20px;
        opacity: 0.95;
        border-radius: 10px;
        border: 1px solid grey;
      "
    >
      <div style="margin: 20px 0; text-align: center; font-size: 28px; color: rgb(64, 64, 64)">
        <img
          src="@/assets/front-logo.jpg"
          style="
            width: 30px;
            height: 30px;
            margin: 0 5px -5px 0;
            -webkit-user-drag: none;
            -khtml-user-drag: none;
            -moz-user-drag: none;
            user-drag: none;
          "
        />
        <b>宠物管理系统</b>
      </div>
      <el-form :model="user" :rules="rules" ref="userForm">
        <el-form-item prop="username">
          <el-input size="large" v-model="user.username" style="font-size: 22px">
            <template #prefix>
              <el-icon><User /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input size="large" show-password v-model="user.password" style="font-size: 22px"
            ><template #prefix>
              <el-icon><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item style="margin: 10px 0; text-align: right">
          <el-button type="warning" autocomplete="off" @click="$router.push('/register')">
            注册</el-button
          >
          <el-button type="primary" autocomplete="off" @click="login"> 登录</el-button>
        </el-form-item>
        <el-form-item style="margin: 10px 0; text-align: right">
          <el-button text @click="handlePass"> 找回密码</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-dialog title="找回密码" :append-to-body="true" v-model="dialogFormVisible" width="30%">
      <el-form label-width="100px">
        <el-form-item label="用户名">
          <el-input v-model="pass.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="pass.phone" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <template v-slot:footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false"> 取 消</el-button>
          <el-button type="primary" @click="passwordBack"> 重置密码</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, onBeforeMount } from 'vue'
import { ref } from 'vue'
import { resetRouter, setRoutes } from '@/router'
import { resetPassword, login as Login } from '@/api/user'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()
const user = ref({})
const pass = ref({})
const dialogFormVisible = ref(false)
const userForm = ref(null)
const rules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' },
  ],
})

const login = async () => {
  await userForm.value.validate(async (valid) => {
    if (valid) {
      console.log('submit!')
      try {
        const res = await Login(user.value)
        console.log(res)
        if (res.code === 200) {
          localStorage.setItem('user', JSON.stringify(res.data)) // 存储用户信息到浏览器
          localStorage.setItem('menus', JSON.stringify(res.data.menus)) // 存储用户信息到浏览器

          // 动态设置当前用户的路由
          setRoutes()
          router.push('/front/home')
          ElMessage.success('登录成功')
        } else {
          ElMessage.error(res.msg)
        }
      } catch (e) {
        console.log(e)
        if (e.response == undefined || e.response.data == undefined) {
          ElMessage({
            showClose: true,
            message: e,
            type: 'error',
            duration: 5000,
          })
        } else {
          ElMessage({
            showClose: true,
            message: e.response.data,
            type: 'error',
            duration: 5000,
          })
        }
      }
    }
  })
}

const handlePass = () => {
  console.log('handlePass')
  dialogFormVisible.value = true
  console.log(dialogFormVisible.value)
  pass.value = {}
}

const passwordBack = async () => {
  const res = await resetPassword(pass.value)
  console.log(res)
  if (res.code == '200') {
    ElMessage({
      message: '重置密码成功，新密码为：123，请尽快修改密码',
      type: 'success',
    })
  } else {
    ElMessage({
      message: res.data.message,
      type: 'error',
    })
  }
}

onBeforeMount(() => {
  resetRouter()
})
</script>

<style scoped>
.wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  overflow-y: auto;
  height: 100%;
  background: url('../assets/background.jpg') center top / cover no-repeat;
  overflow: hidden;
}
</style>
