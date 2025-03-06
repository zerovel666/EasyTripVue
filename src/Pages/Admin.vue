<template>
    <div class="content">
        <div class="bg-parallax"></div> 
        <div class="panel">
            <h1>Таблицы</h1>
            <div class="tables">
                <button v-for="(table, index) in tables" :key="index">{{ table }}</button>
                <button v-for="(table, index) in tables" :key="index">{{ table }}</button>
                <button v-for="(table, index) in tables" :key="index">{{ table }}</button>
                <button v-for="(table, index) in tables" :key="index">{{ table }}</button>
                <button v-for="(table, index) in tables" :key="index">{{ table }}</button>
                <button v-for="(table, index) in tables" :key="index">{{ table }}</button>
            </div>
        </div>
        <div class="table"></div>
    </div>
    <Notification :notificationMessage="message" />
</template>


<script setup>
import { API_URL } from '@/config';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import Cookies from 'js-cookie';
import Notification from '@/components/Layouts/Notification.vue';

const router = useRouter();
const tables = ref([]);
const notificationMessage = ref('');

const checkRole = () => {
    const role = Cookies.get('role');
    if (!role || role !== 'admin') {
        notificationMessage.value = 'У вас недостаточно прав';
        Object.keys(Cookies.get()).forEach(cookie => Cookies.remove(cookie));
        router.push('/login');
    }
};

const getTable = async () => {
    try {
        const response = await axios.get(`${API_URL}/admin/table`);
        tables.value = response.data['data'];
    } catch (error) {
        console.error('Ошибка при загрузке таблиц:', error);
    }
};

onMounted(() => {
    checkRole();
    getTable();
    window.addEventListener("scroll", () => {
        document.querySelector(".bg-parallax").style.transform = `translateY(${window.scrollY * 0.5}px)`;
    });
});
</script>

<style scoped>
.content {
    display: flex;
    height: 100vh;
    width: 100vw;
    margin: auto;
    overflow-y: auto;
}
.panel {
    background-color: #02Bf8c;
    max-width: 30%;
    width: 100%;
    padding: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
    position: relative;
    z-index: 2;
    max-height: 100vh;
    overflow-y: auto;
}

.panel::-webkit-scrollbar {
    width: 8px; 
}

.panel::-webkit-scrollbar-track {
    background: #ffffff33; 
    border-radius: 10px;
}

.panel::-webkit-scrollbar-thumb {
    background: #0d8767;
    border-radius: 10px;
}

.panel::-webkit-scrollbar-thumb:hover {
    background: #03c89d; 
}



.bg-parallax {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: url('https://source.unsplash.com/random') no-repeat center/cover;
    transform: translateY(0);
    z-index: -1;
}

.tables{
    display: flex;
    align-items: center;
    gap: 30px;
    flex-direction: column;
    width: 100%;
}
.tables button{
    width: 70%;
    height: 40px;
    border-radius: 10px;
    border: none;
    background-color: #008e68;
    color: white;
    transition: transform 0.3s ease;
    cursor: pointer;
}
.panel button:hover{
    transform: scale(1.1);
}
</style>