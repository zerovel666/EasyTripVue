<template>
    <TopBar />
    <div class="container">
        <div class="content">
            <Calendar ref="calendarRef" @updateCountDays="handleCountDays" />
            <FormBuy :countDays="countDays" @updateTouristsData="handleTouristsData" />
        </div>
    </div>
    <ModalPay v-model:showModal="showModal" v-model:paramsForBuy="paramsForBuy" />
    <Footer />
    <Notification :message="messageNotification"/>
</template>

<script setup>
import TopBar from '@/components/Layouts/TopBar.vue';
import Footer from '@/components/Layouts/Footer.vue';
import Calendar from '@/components/BuyComponent/Calendar.vue';
import FormBuy from '@/components/BuyComponent/FormBuy.vue';
import ModalPay from '@/components/Modal/ModalPay.vue';
import { ref, watch, onUnmounted } from 'vue';
import Notification from '@/components/Layouts/Notification.vue';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const countDays = ref(0);
const touristsData = ref([]);
const calendarRef = ref(null);
const paramsForBuy = ref(null);
const showModal = ref(false);
const messageNotification = ref('');

watch(showModal, (newValue) => {
    document.body.style.overflow = newValue ? 'hidden' : '';
});

onUnmounted(() => {
    document.body.style.overflow = '';
});

const handleCountDays = (days) => {
    countDays.value = days;
};

const handleTouristsData = (data) => {
    touristsData.value = data;

    if (calendarRef.value && typeof calendarRef.value.getSelectedDates === 'function') {
        const selectedDates = calendarRef.value.getSelectedDates();
        paramsForBuy.value = {
            occupied_place: touristsData.value.occupiedPlace,
            count_days: countDays,
            price_per_day: touristsData.value.amountDay,
            check_in: selectedDates[0],
            check_out: selectedDates[1],
            users_iins: touristsData.value.tourists
        }
    }
};

watch(() => paramsForBuy.value, (newVal) => {
    const userId = cookies.get('userid');
    if (userId) {
        if (newVal &&
            newVal.count_days &&
            newVal.price_per_day &&
            newVal.check_in &&
            newVal.check_out &&
            newVal.users_iins?.length > 0
        ) {
            showModal.value = true;
        } else {
            messageNotification.value = 'Заполните все данные';
        }
    } else {
        messageNotification.value = 'Вы не авторизованы';
    }

    setTimeout(() => {
        messageNotification.value = '';
    }, 3000);
});



</script>

<style scoped>
.content {
    display: flex;
    gap: 5%;
    margin-top: 30px;
}
</style>
