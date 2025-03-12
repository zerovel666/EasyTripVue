<template>
    <TopBar />
    <div class="container">
        <h3>
            Приветствуем, {{ userInfo.full_name }}! В данном разделе вы сможете посмотреть свои данные и изменить их.
            А также узнать информацию о ваших поездках. Приятного путешествия!
        </h3>
        <div class="cardUserInfo">
            <div class="contentUserInfo">
                <input type="text" v-for="(value, key) in userInfo" :key="key" :placeholder="key"
                    v-model="userInfo[key]"
                    :disabled="['id', 'password', 'role', 'created_at', 'updated_at'].includes(key)" />
            </div>
            <button @click="change">Изменить</button>
        </div>
        <div class="tripUserInfo">
            <div class="contentTripUserInfo" v-for="(value, key) in bookingInfo" :key="key"
                :style="{ backgroundImage: `url('${value.tripInfo.image_path}')` }">
                <div class="tripText">
                    <div class="info">
                        <p>Территория : {{ value.tripInfo.country_name }}/{{ value.tripInfo.city_name }}</p>
                        <p>Тур : {{ value.tripInfo.trip_name }}</p>
                        <p>Общая цена за поездку : {{ value.amount }} KZT</p>
                        <p>ИИН туристов : {{ value.users_iins }}</p>
                    </div>
                    <div class="activity">
                        <h4 v-if="value.active">Активен</h4>
                        <h4 v-else="value.active">Не активен</h4>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Notification :message="notificationMessage" />
    <Footer />
    <div v-if="loading.active" class="loader">
        <a-spin size="large" />
    </div>
</template>

<script setup>
import { inject, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { API_URL } from '@/config';
import TopBar from '@/components/Layouts/TopBar.vue';
import Footer from '@/components/Layouts/Footer.vue';
import Notification from '@/components/Layouts/Notification.vue';

const cookies = new Cookies();
const userInfo = ref([]);
const router = useRouter();
const notificationMessage = ref('');
const loading = inject('loading');
const bookingInfo = ref([]);

const getUserInfo = async () => {
    try {
        const response = await axios.get(`${API_URL}/userInfo/${cookies.get('userid')}`);
        if (response.status === 200) {
            userInfo.value = response.data;
        } else {
            showNotification('Неавторизованный пользователь');
            router.push('/login');
        }
    } catch (error) {
        showNotification('Ошибка загрузки данных');
        router.push('/login');
    }
};



const getBookingUser = async () => {
    const response = await axios.get(`${API_URL}/userBooking/${cookies.get('userid')}`);
    if (response.status == 200) {
        bookingInfo.value = response.data;
    } else {
        notificationMessage.value = 'Обратитесь в поддержку, Ошибка: Загрузка туристических поездок пользователя';
        setTimeout(() => {
            notificationMessage = '';
        }, 3000);
    }
}
const change = async () => {
    try {
        const updatedUserInfo = { ...userInfo.value };
        ['id', 'email', 'password', 'role', 'created_at', 'updated_at'].forEach(field => delete updatedUserInfo[field]);

        const response = await axios.put(`${API_URL}/userInfo/${cookies.get('userid')}`, updatedUserInfo);

        if (response.status === 200) {
            notificationMessage.value = 'Данные успешно обновлены!';
        } else {
            notificationMessage.value = 'Ошибка при обновлении данных.';
        }
    } catch (error) {
        notificationMessage.value = 'Ошибка сети или сервера.';
    }

    setTimeout(() => {
        notificationMessage.value = '';
    }, 2000);
};

const showNotification = (message) => {
    notificationMessage.value = message;
    setTimeout(() => {
        notificationMessage.value = '';
    }, 2000);
};

onMounted(() => {
    getUserInfo();
    getBookingUser();
});
</script>

<style scoped>
h3 {
    margin: 20px;
    text-align: center;
}

.cardUserInfo {
    background-color: #02BF8C;
    border-radius: 10px;
    padding: 40px;
}

.cardUserInfo button {
    width: 100%;
    margin-top: 40px;
    height: 40px;
    border-radius: 10px;
    background-color: #008e68;
    color: white;
    border: none;
    cursor: pointer;
}

.cardUserInfo button:hover {
    background-color: #026b4f;
}

.contentUserInfo {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px 50px;
}

.contentUserInfo input {
    padding: 10px;
    border-radius: 5px;
    border: none;
    background-color: #fff;
    text-align: left;
}

.contentUserInfo input:disabled {
    background-color: #e0e0e0;
    color: #757575;
}

.tripUserInfo {
    display: flex;
    flex-direction: column;
    gap: 40px;
    margin-top: 40px;
}

.contentTripUserInfo {
    position: relative;
    height: 400px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    padding: 40px;
    color: white;
    border-radius: 10px;
}

.contentTripUserInfo::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1;
    border-radius: 10px;
}

.tripText {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
}
</style>