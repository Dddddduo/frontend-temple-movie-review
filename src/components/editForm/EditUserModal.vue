<!-- EditUserModal.vue -->
<template>
  <a-modal
      title="编辑用户"
      :visible="visible"
      @ok="handleOk"
      @cancel="handleCancel"
  >
    <a-form :model="userData" layout="vertical">
      <a-form-item label="用户名" :rules="[{ required: true, message: '请输入用户名' }]">
        <a-input v-model:value="userData.username" />
      </a-form-item>
      <a-form-item label="用户编号" :rules="[{ required: true, message: '请输入用户编号' }]">
        <a-input v-model:value="userData.userId" disabled />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import {defineProps, defineEmits, computed} from 'vue';

const props = defineProps({
  visible: {
    type: Boolean,
    required: true
  },
  editingUser: {
    type: Object,
    required: true
  }
});

const emits = defineEmits(['update', 'cancel']);

// 使用计算属性实现双向绑定
const userData = computed({
  get() {
    return { ...props.editingUser };
  },
  set(value) {
    // 不需要实现，因为我们通过事件传递数据
  }
});

const handleOk = () => {
  emits('update', userData.value);
};

const handleCancel = () => {
  emits('cancel');
};
</script>