<script setup>
import { reactive, getCurrentInstance } from "vue";
import { useAllDataStore } from "@/stores";
import { useRouter } from "vue-router";
const loginForm = reactive({
  username: "",
  password: "",
});
const { proxy } = getCurrentInstance();
const { updateMenuList, state, addMenu } = useAllDataStore();
const router = useRouter();
const handleLogin = async () => {
  const res = await proxy.$api.getMenu(loginForm);
  updateMenuList(res.menuList);
  state.token = res.token;
  addMenu(router);
  router.push("/home");
};
</script>

<template>
  <div class="body-login">
    <el-form :model="loginForm" class="login-container">
      <h1>欢迎登录</h1>
      <el-form-item prop="username">
        <el-input
          placeholder="请输入账号"
          v-model="loginForm.username"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          placeholder="请输入密码"
          type="password"
          v-model="loginForm.password"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleLogin">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="less">
.body-login {
  width: 100%;
  height: 100%;
  background-image: url("../assets/images/background.png");
  background-size: 100%;
  overflow: hidden;
}
.login-container {
  width: 400px;
  background-color: #fff;
  border: 1px sold #eaeaea;
  border-radius: 15px;
  padding: 35px 35px 15px 35px;
  box-shadow: 0 0 25px #cacaca;
  margin: 250px auto;
  h1 {
    text-align: center;
    margin-bottom: 20px;
    color: #505450;
  }
  :deep(.el-form-item__content) {
    justify-content: center;
  }
}
</style>
