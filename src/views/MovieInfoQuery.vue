<template>
  <a-card title="电影资讯查询">
    <!-- 搜索表单 -->
    <a-form layout="inline" style="margin-bottom: 20px;">
      <a-form-item label="电影名称">
        <a-input v-model="searchForm.name" placeholder="请输入电影名称" />
      </a-form-item>
      <a-form-item label="上映时间">
        <a-date-picker v-model="searchForm.releaseTime" placeholder="请选择上映时间" />
      </a-form-item>
      <a-form-item label="电影类别">
        <a-select v-model="searchForm.type" placeholder="请选择电影类别">
          <a-select-option v-for="type in movieTypes" :key="type" :value="type">
            {{ type }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="演职人员">
        <a-input v-model="searchForm.cast" placeholder="请输入演职人员" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="handleQueryMovie">查询</a-button>
        <a-button style="margin-left: 8px;" @click="resetForm">重置</a-button>
      </a-form-item>
    </a-form>

    <!-- 电影列表 -->
    <a-table :columns="columns" :data-source="movieList" style="margin-top: 20px;">
      <template #title>
        电影资讯结果
      </template>
      <template #empty>
        <div style="text-align: center; padding: 20px;">
          <a-icon type="frown-o" style="font-size: 24px; color: #ccc;" />
          <p style="margin-top: 10px;">暂无匹配的电影数据</p>
        </div>
      </template>
    </a-table>
  </a-card>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue';
import { message } from 'ant-design-vue';

// 电影类型列表
const movieTypes = ['剧情', '喜剧', '动作', '科幻', '悬疑', '爱情', '动画', '恐怖', '纪录片'];

// 搜索表单
const searchForm = reactive({
  name: '',
  releaseTime: null,
  type: '',
  cast: ''
});

// 原始电影数据
const originalMovies = ref([
  {
    id: 1,
    name: '流浪地球2',
    releaseTime: '2023-01-22',
    type: '科幻',
    intro: '太阳即将毁灭，人类在地球表面建造出巨大的推进器，寻找新的家园。',
    cast: '吴京, 李雪健, 沙溢, 宁理'
  },
  {
    id: 2,
    name: '满江红',
    releaseTime: '2023-01-22',
    type: '剧情',
    intro: '南宋绍兴年间，岳飞死后四年，秦桧率兵与金国会谈。',
    cast: '沈腾, 易烊千玺, 张译, 雷佳音'
  },
  {
    id: 3,
    name: '无名',
    releaseTime: '2023-01-22',
    type: '悬疑',
    intro: '讲述了地下工作者们冒着生命危险送出情报，用生命与热血保卫祖国的故事。',
    cast: '梁朝伟, 王一博, 周迅, 黄磊'
  },
  {
    id: 4,
    name: '熊出没·伴我“熊芯”',
    releaseTime: '2023-01-22',
    type: '动画',
    intro: '熊妈妈的意外出现，开启了熊大、熊二的探寻真相之旅。',
    cast: '张秉君, 谭笑, 张伟, 缪莹莹'
  },
  {
    id: 5,
    name: '深海',
    releaseTime: '2023-01-22',
    type: '动画',
    intro: '在大海的最深处，藏着所有秘密。一位少女在神秘海底世界的冒险之旅。',
    cast: '苏鑫, 王亭文, 滕奎兴, 杨雨光'
  }
]);

// 过滤后的电影列表
const movieList = computed(() => {
  return originalMovies.value.filter(movie => {
    // 电影名称模糊匹配
    if (searchForm.name && !movie.name.includes(searchForm.name)) return false;

    // 上映时间精确匹配
    if (searchForm.releaseTime &&
        new Date(movie.releaseTime).toISOString().split('T')[0] !==
        searchForm.releaseTime?.format('YYYY-MM-DD')) return false;

    // 电影类别精确匹配
    if (searchForm.type && movie.type !== searchForm.type) return false;

    // 演职人员模糊匹配
    if (searchForm.cast && !movie.cast.includes(searchForm.cast)) return false;

    return true;
  });
});

const columns = [
  {
    title: '电影名称',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '上映时间',
    dataIndex: 'releaseTime',
    key: 'releaseTime'
  },
  {
    title: '电影类别',
    dataIndex: 'type',
    key: 'type'
  },
  {
    title: '电影简介',
    dataIndex: 'intro',
    key: 'intro',
    ellipsis: true,
    width: 200
  },
  {
    title: '演职人员',
    dataIndex: 'cast',
    key: 'cast'
  }
];

// 查询电影资讯
const handleQueryMovie = () => {
  message.success('查询电影资讯完成');
};

// 重置表单
const resetForm = () => {
  searchForm.name = '';
  searchForm.releaseTime = null;
  searchForm.type = '';
  searchForm.cast = '';
};

// 页面加载时初始化数据
onMounted(() => {
  // 初始加载时显示全部电影
  message.success('电影数据加载成功');
});
</script>