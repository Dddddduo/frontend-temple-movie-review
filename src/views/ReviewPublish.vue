<template>
  <a-card title="影评发布">
    <a-form :model="reviewForm" layout="vertical" @finish="handlePublish">
      <a-form-item label="选择电影" :rules="[{ required: true, message: '请选择电影' }]">
        <a-select v-model:value="reviewForm.movieId" placeholder="请选择电影">
          <a-select-option v-for="movie in movieOptions" :key="movie.id" :value="movie.id">
            {{ movie.title }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="影评内容" :rules="[{ required: true, message: '请输入影评内容' }]">
        <a-textarea v-model:value="reviewForm.content" rows="4" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit">发布影评</a-button>
      </a-form-item>
    </a-form>

    <!-- 已发布影评展示 -->
    <a-divider>已发布影评</a-divider>
    <a-list :data-source="publishedReviews" bordered>
      <template #renderItem="{ item }">
        <a-list-item>
          <div class="flex flex-col">
            <div class="font-medium text-lg">{{ getMovieTitle(item.movieId) }}</div>
            <div class="text-gray-600 mt-1">{{ item.content }}</div>
            <div class="text-gray-400 text-sm mt-2">发布于: {{ formatDate(item.createTime) }}</div>
          </div>
        </a-list-item>
      </template>
    </a-list>
  </a-card>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { message } from 'ant-design-vue';

// 电影假数据
const movieOptions = [
  { id: 1, title: '星际穿越' },
  { id: 2, title: '盗梦空间' },
  { id: 3, title: '蝙蝠侠：黑暗骑士' },
  { id: 4, title: '泰坦尼克号' },
  { id: 5, title: '肖申克的救赎' }
];

// 获取电影标题的计算属性
const getMovieTitle = (movieId: number) => {
  const movie = movieOptions.find(m => m.id === movieId);
  return movie?.title || '未知电影';
};

// 格式化日期函数
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString();
};

// 存储已发布影评（添加假数据）
const publishedReviews = ref([
  {
    movieId: 1,
    content: "这部电影的镜头语言太震撼了，每一帧都像一幅画，剧情也充满了深度，值得反复品味。",
    createTime: new Date().toISOString()
  },
  {
    movieId: 2,
    content: "演员的演技简直封神！故事节奏紧凑，反转不断，看完后久久不能平静，强烈推荐给所有人！",
    createTime: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
  },
  {
    movieId: 3,
    content: "画面精美，配乐恰到好处，虽然剧情有些薄弱，但整体观影体验非常棒，适合放松时观看。",
    createTime: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString()
  },
  {
    movieId: 5,
    content: "没想到小成本电影也能这么精彩！剧情贴近生活，台词充满共鸣，看完后忍不住思考了很多。",
    createTime: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString()
  }
]);

const reviewForm = ref({
  movieId: null as number | null,
  content: ''
});

// 发布影评
const handlePublish = () => {
  if (!reviewForm.value.movieId || !reviewForm.value.content) {
    message.error('请选择电影并填写影评内容');
    return;
  }

  publishedReviews.value.push({
    ...reviewForm.value,
    createTime: new Date().toISOString()
  });

  message.success('影评发布成功');
  reviewForm.value = {
    movieId: null,
    content: ''
  };
};
</script>

<style scoped>
/* 确保中文正常显示 */
:deep(.ant-select-selection-item) {
  font-family: 'Inter', 'system-ui', 'sans-serif';
}
</style>