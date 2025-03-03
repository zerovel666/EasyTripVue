<template>
    <div class="content">
        <div class="tourists">
            <div v-for="(tourist, index) in tourists" :key="index" class="tourist">
                <input type="text" v-model="tourists[index]" placeholder="ИИН туриста" required />
            </div>
            <button @click="addTourist">Добавить туриста</button>
        </div>
        <div class="tripInfo" v-if="trip">
            <h2>{{ trip.trip_name }}</h2>
            <p>Страна : {{ trip.country_name }}</p>
            <p>Город : {{ trip.city_name }}</p>
            <p>Цена за день и человека: {{ trip.price_per_day }} {{ trip.currency }}</p>
            <p>Свободных мест : {{ countFreePlace }}</p>
            <div class="card">
                <p>Количество туристов: {{ touristsCount }}</p>
                <p>Количество дней: {{ countDays }}</p>
                <p>Общая цена: {{countDays * touristsCount * trip.price_per_day  }} {{ trip.currency }}</p>
                <button @click="checkAndProceedToPayment">Перейти к оплате</button>
            </div>
        </div>
    </div>
    <Notification :message="notificationMessage" />
</template>

<script setup>
import { API_URL } from '@/config';
import axios from 'axios';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import Notification from '../Layouts/Notification.vue';

const route = useRoute();
const tourists = ref([]);
const trip = ref([]);
const notificationMessage = ref('');
const countFreePlace = ref(null)
const touristsCount = computed(() => tourists.value.length);

defineProps({
    countDays: {
        type: Number,
        required: true,
    }
});

const getTrip = async () => {
    const response = await axios.get(`${API_URL}/country/${route.params.trip_name}`);
    trip.value = response.data;
    countFreePlace.value = trip.value.count_place - trip.value.occupied;
};


const addTourist = () => {
    if (tourists.value.length >= countFreePlace.value) {
        notificationMessage.value = "Превышено количество свободных мест";
        return;
    }
    tourists.value.push('');

};
const checkAndProceedToPayment = () => {
    if (tourists.value.some(t => !t.trim())) {
        notificationMessage.value = "Заполните все поля ИИН!";
        return;
    }

    if (tourists.value.some(t => t.length !== 12)) {
        notificationMessage.value = "ИИН должен содержать ровно 12 символов!";
        return;
    }

};


onMounted(getTrip);
</script>

<style scoped>
.content {
    display: flex;
    gap: 50px;
    width: 100%;
}

.tourist input {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
}

.tourists button {
    padding: 8px 12px;
    background-color: #02BF8C;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.3s ease;
}

button:hover {
    background-color: #02976F;
}

.tourists {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 40%;
    max-height: 400px;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: #02BF8C #f0f0f0;
}

.tourists:-webkit-scrollbar {
    width: 6px;
}
.tourists:-webkit-scrollbar-thumb {
    background-color: #02BF8C;
    border-radius: 10px;
}
.tourists:-webkit-scrollbar-track {
    background: #f0f0f0;
    border-radius: 10px;
}

.card {
    margin-top: 10%;
    background-color: #02BF8C;
    color: white;
    padding: 15px;
    border-radius: 10px;
}
.card button{
    background-color: #02976F;
    padding: 8px 12px;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.3s ease ;
}
.card button:hover{
    background-color: #01664b;
}
</style>
