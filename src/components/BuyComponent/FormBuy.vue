<template>
    <div class="content">
        <div class="tourists">
            <div v-for="(tourist, index) in tourists" :key="index" class="tourist">
                <div class="input-container">
                    <input type="text" v-model="tourists[index]" placeholder="ИИН туриста" required maxlength="12"
                        @input="tourists[index] = $event.target.value.replace(/\D/g, '')" />
                    <button class="remove-btn" @click="removeTourist(index)">−</button>
                </div>
            </div>
            <button @click="addTourist">Добавить туриста</button>
        </div>
        <div class="tripInfo" v-if="trip">
            <h2>{{ trip.trip_name }}</h2>
            <p>Страна : {{ trip.country_name }}</p>
            <p>Город : {{ trip.city_name }}</p>
            <p>Цена за день и человека: {{ trip.price_per_day }} {{ trip.currency }}</p>
            <div class="card">
                <p>Количество туристов: {{ touristsCount }}</p>
                <p>Количество дней: {{ countDays }}</p>
                <p>Общая цена: {{ amount }} {{ trip.currency }}</p>
                <button @click="checkAndProceedToPayment">Перейти к оплате</button>
            </div>
        </div>
    </div>
    <div v-if="loading.active" class="loader">
        <a-spin size="large" />
    </div>
    <Notification :message="notificationMessage" />
</template>

<script setup>
import { API_URL } from '@/config';
import axios from 'axios';
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import Notification from '../Layouts/Notification.vue';
import { inject } from 'vue';

const loading = inject('loading');
const emit = defineEmits(['updateTouristsData']);
const route = useRoute();
const tourists = ref([]);
const trip = ref({});
const amount = ref(null);
const notificationMessage = ref('');
const touristsCount = computed(() => tourists.value.length);

const props = defineProps({
    countDays: {
        type: Number,
        required: true,
    }
});

watch(() => loading.active, (newVal) => {
    if (newVal) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});

const getTrip = async () => {
    const response = await axios.get(`${API_URL}/country/${route.params.trip_name}`);
    trip.value = response.data;
};

watch(() => props.countDays, () => {
    if (trip.value.price_per_day) {
        amount.value = props.countDays * touristsCount.value * trip.value.price_per_day;
    }
});

watch(() => tourists.value.length, () => {
    if (trip.value.price_per_day) {
        amount.value = props.countDays * touristsCount.value * trip.value.price_per_day;
    }
});

const addTourist = () => {
    tourists.value.push('');
};

const removeTourist = (index) => {
    tourists.value.splice(index, 1);
};

const checkAndProceedToPayment = () => {
    if (tourists.value.some(t => typeof t !== 'string' || !t.trim())) {
        notificationMessage.value = "Заполните все поля ИИН!";
        setTimeout(() => {
            notificationMessage.value = '';
        }, 3000);
        return;
    }

    if (tourists.value.some(t => t.length !== 12)) {
        notificationMessage.value = "ИИН должен содержать ровно 12 символов!";
        setTimeout(() => {
            notificationMessage.value = '';
        }, 3000);
        return;
    }
    const params = {
        amountDay: trip.value.price_per_day,
        tourists: tourists.value,
    }
    emit('updateTouristsData', params);
};

onMounted(getTrip);
</script>

<style scoped>
.content {
    display: flex;
    gap: 50px;
    width: 100%;
}

.input-container {
    position: relative;
    display: flex;
    align-items: center;
}

.input-container input {
    flex: 1;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
    padding-right: 30px;
}

.input-container input[type="number"]::-webkit-outer-spin-button,
.input-container input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

.remove-btn {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    right: 5px;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.1) !important;
    border: none;
    color: #666;
    width: 24px;
    height: 24px;
    font-size: 18px;
    line-height: 20px;
    text-align: center;
    cursor: pointer;
    border-radius: 50%;
    transition: background 0.3s;
}

.remove-btn:hover {
    background: rgba(0, 0, 0, 0.3) !important;
    color: white;
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

.card {
    margin-top: 10%;
    background-color: #02BF8C;
    color: white;
    padding: 15px;
    border-radius: 10px;
}

.card button {
    background-color: #02976F;
    padding: 8px 12px;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.3s ease;
}

.card button:hover {
    background-color: #01664b;
}
</style>
