import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

const Home = () => import('@/views/Home.vue');
const About = () => import('@/views/About.vue');
const NotFound = () => import('@/views/NotFound.vue');
const Login = () => import('@/views/Login.vue');

// 引入新增功能页面
import UserManage from '../views/UserManage.vue';
import AdminQuery from '../views/AdminQuery.vue';
import ReviewManage from '../views/ReviewManage.vue';
import MovieInfoQuery from '../views/MovieInfoQuery.vue';
import ReviewPublish from '../views/ReviewPublish.vue';

// 定义路由
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        component: About
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound
    },
    // 用户管理
    {
        path: '/user-manage',
        name: 'UserManage',
        component: UserManage
    },
    // 管理员查询
    {
        path: '/admin-query',
        name: 'AdminQuery',
        component: AdminQuery
    },
    // 影评管理
    {
        path: '/review-manage',
        name: 'ReviewManage',
        component: ReviewManage
    },
    // 电影资讯查询
    {
        path: '/movie-info-query',
        name: 'MovieInfoQuery',
        component: MovieInfoQuery
    },
    // 影评发布
    {
        path: '/review-publish',
        name: 'ReviewPublish',
        component: ReviewPublish
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

export default router;