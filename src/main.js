import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Main from './Pages/Main.vue'
import TripPage from './Pages/TripPage.vue'

const routes = [
    { path: '/', component: Main },
    { path: '/trip/:trip_name', component: TripPage }
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

const app = createApp(App);
app.use(router);
app.mount('#app');

