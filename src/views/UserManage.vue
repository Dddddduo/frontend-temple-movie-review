<template>
  <a-card title="用户管理">
    <!-- 新增用户表单 -->
    <a-form :model="newUser" layout="inline" @finish="handleAddUser">
      <a-form-item label="用户名">
        <a-input v-model:value="newUser.username" />
      </a-form-item>
      <a-form-item label="用户编号">
        <a-input v-model:value="newUser.userId" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit">新增用户</a-button>
      </a-form-item>
    </a-form>

    <!-- 用户列表及操作 -->
    <a-table :columns="columns" :data-source="userList" style="margin-top: 20px;">
      <template #operation="{ record }">
        <a-button type="link" @click="handleEditUser(record)">编辑</a-button>
        <a-button type="link" @click="handleDeleteUser(record.userId)">删除</a-button>
      </template>
    </a-table>

    <!-- 编辑用户模态框 -->
    <EditUserModal
        :visible="editModalVisible"
        :editingUser="editingUser"
        @update="handleUpdateUser"
        @cancel="editModalVisible = false"
    />
  </a-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { message } from 'ant-design-vue';
import EditUserModal from '@/components/editForm/EditUserModal.vue'; // 引入编辑模态框组件

// 假数据
const userList = ref([
  { userId: '1', username: '用户1' },
  { userId: '2', username: '用户2' }
]);
const newUser = ref({ username: '', userId: '' });
const columns = [
  {
    title: '用户编号',
    dataIndex: 'userId',
    key: 'userId'
  },
  {
    title: '用户名',
    dataIndex: 'username',
    key: 'username'
  },
  {
    title: '操作',
    key: 'operation',
    slots: { customRender: 'operation' }
  }
];

// 编辑模态框状态
const editModalVisible = ref(false);
const editingUser = ref({ username: '', userId: '' });

// 新增用户
const handleAddUser = () => {
  // 非空判断
  if (!newUser.value.username || !newUser.value.userId) {
    message.error('用户名和用户编号不能为空');
    return;
  }

  // 重复判断（检查用户编号是否已存在）
  const isUserIdExists = userList.value.some(
      user => user.userId === newUser.value.userId
  );

  if (isUserIdExists) {
    message.error('用户编号已存在，请使用其他编号');
    return;
  }

  // 通过验证后执行添加操作
  userList.value.push({ ...newUser.value });
  message.success('新增用户成功');
  newUser.value = { username: '', userId: '' };
};

// 打开编辑模态框
const handleEditUser = (record: any) => {
  editingUser.value = { ...record };
  editModalVisible.value = true;
};

// 更新用户信息
const handleUpdateUser = (updatedUser: any) => {
  const index = userList.value.findIndex(item => item.userId === updatedUser.userId);
  if (index !== -1) {
    userList.value.splice(index, 1, { ...updatedUser });
    message.success('更新用户成功');
  } else {
    message.error('未找到该用户');
  }
  editModalVisible.value = false;
};

// 删除用户
const handleDeleteUser = (userId: string) => {
  userList.value = userList.value.filter(item => item.userId!== userId);
  message.success('删除用户成功');
};
</script>