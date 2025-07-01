<template>
  <a-card title="管理员查询">
    <!-- 查询用户 -->
    <a-form :model="userQuery" layout="inline" style="margin-bottom: 20px;">
      <a-form-item label="查询方式">
        <a-radio-group v-model:value="queryType">
          <a-radio value="username">按用户名</a-radio>
          <a-radio value="userId">按用户编号</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item>
        <a-input v-model:value="userQuery.keyword" :placeholder="`请输入${queryType === 'username' ? '用户名' : '用户编号'}`" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="handleQueryUser">查询用户</a-button>
      </a-form-item>
    </a-form>
    <a-table :columns="userColumns" :data-source="queriedUsers" v-if="showUserResult" style="margin-bottom: 20px;">
      <template #title>
        查询用户结果
      </template>
    </a-table>

    <!-- 查询影评内容 -->
    <a-button type="primary" @click="handleQueryReviews">查询影评内容</a-button>
    <a-table :columns="reviewColumns" :data-source="queriedReviews" v-if="showReviewResult" style="margin-top: 20px;">
      <template #title>
        查询影评内容结果
      </template>
    </a-table>
  </a-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { message } from 'ant-design-vue';

// 假数据 - 模拟用户列表
const allUsers = [
  { userId: '1', username: '用户1' },
  { userId: '2', username: '用户2' }
];
// 假数据 - 模拟影评列表
const allReviews = [
  { id: '1', content: '影评1，很好看' },
  { id: '2', content: '影评2，一般般' }
];

const queryType = ref<'username' | 'userId'>('username');
const userQuery = ref({ keyword: '' });
const queriedUsers = ref<any[]>([]);
const showUserResult = ref(false);
const userColumns = [
  {
    title: '用户编号',
    dataIndex: 'userId',
    key: 'userId'
  },
  {
    title: '用户名',
    dataIndex: 'username',
    key: 'username'
  }
];

const queriedReviews = ref<any[]>([]);
const showReviewResult = ref(false);
const reviewColumns = [
  {
    title: '影评内容',
    dataIndex: 'content',
    key: 'content'
  }
];

// 查询用户
const handleQueryUser = () => {
  if (queryType.value === 'username') {
    queriedUsers.value = allUsers.filter(item => item.username.includes(userQuery.value.keyword));
  } else {
    queriedUsers.value = allUsers.filter(item => item.userId === userQuery.value.keyword);
  }
  showUserResult.value = true;
  message.success('查询用户完成');
};

// 查询影评内容
const handleQueryReviews = () => {
  queriedReviews.value = allReviews;
  showReviewResult.value = true;
  message.success('查询影评内容完成');
};
</script>