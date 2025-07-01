<template>
  <a-card title="影评管理">
    <a-table :columns="columns" :data-source="reviewList" style="margin-bottom: 20px;">
      <template #operation="{ record }">
        <a-button type="link" @click="handlePromptEdit(record.id)">提示修改</a-button>
        <a-button type="link" @click="handleDeleteReview(record.id)">删除影评</a-button>
      </template>
    </a-table>
  </a-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { message } from 'ant-design-vue';

// 假数据 - 影评列表
const reviewList = ref([
  { id: '1', content: '影评1，很好看' },
  { id: '2', content: '影评2，一般般' }
]);
const columns = [
  {
    title: '影评内容',
    dataIndex: 'content',
    key: 'content'
  },
  {
    title: '操作',
    key: 'operation',
    slots: { customRender: 'operation' }
  }
];

// 提示用户修改（简单演示）
const handlePromptEdit = (reviewId: string) => {
  message.info(`提示用户修改影评${reviewId}，可实现弹窗等交互`);
};

// 删除影评
const handleDeleteReview = (reviewId: string) => {
  reviewList.value = reviewList.value.filter(item => item.id!== reviewId);
  message.success('删除影评成功');
};
</script>