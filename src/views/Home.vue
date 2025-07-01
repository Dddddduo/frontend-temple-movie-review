<template>
  <div>
    <h1>首页</h1>
    <hello-world msg="影评网站" />

    <div class="button-group">
      <!-- 基础页面链接 -->
<!--      <router-link to="/about" class="btn">关于页面</router-link>-->
<!--      <router-link to="/login" class="btn">登录页面</router-link>/-->

      <!-- 功能页面链接 -->
      <router-link to="/user-manage" class="btn">用户管理</router-link>
      <router-link to="/admin-query" class="btn">管理员查询</router-link>
      <router-link to="/review-manage" class="btn">影评管理</router-link>
      <router-link to="/movie-info-query" class="btn">电影资讯查询</router-link>
      <router-link to="/review-publish" class="btn">影评发布</router-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
// 组件逻辑
import HelloWorld from "@/components/HelloWorld.vue";
</script>

<style scoped>
.button-group {
  margin-top: 20px;
}

.btn {
  display: inline-block;
  margin: 10px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #0056b3;
}
</style>