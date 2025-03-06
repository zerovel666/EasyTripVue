import './assets/main.css';

import { createApp, reactive } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import Main from './Pages/Main.vue';
import Filter from './Pages/Filter.vue';
import SetParamsForBuyTrip from './Pages/SetParamsForBuyTrip.vue';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import axios from 'axios';
import { API_URL } from './config'; 
import LoginPage from './Pages/Auth/LoginPage.vue';
import RegisterPage from './Pages/Auth/RegisterPage.vue';
import AboutUs from './Pages/infoPages/AboutUs.vue';
import Questions from './Pages/infoPages/Questions.vue';

function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
}

const loading = reactive({ active: false });

axios.interceptors.request.use((config) => {
    const userId = getCookie('userid');
    if (userId) {
        config.headers['userid'] = userId;
    }
    loading.active = true; 
    return config;
}, (error) => {
    loading.active = false;
    return Promise.reject(error);
});

axios.interceptors.response.use((response) => {
    loading.active = false; 
    return response;
}, (error) => {
    loading.active = false;
    return Promise.reject(error);
});

axios.defaults.baseURL = API_URL;

const routes = [
    { path: '/', component: Main },
    { path: '/filter/:trip_name?', component: Filter },
    { path: '/buy/trip/:trip_name', component: SetParamsForBuyTrip },
    { path: '/login', component: LoginPage },
    { path: '/register', component: RegisterPage },
    { path: '/aboutUs', component: AboutUs},
    { path: '/question', component: Questions}
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

const app = createApp(App);
app.use(router);
app.use(Antd);
app.config.globalProperties.$axios = axios;
app.provide('loading', loading); 
app.mount('#app');
