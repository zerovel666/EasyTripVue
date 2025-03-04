<template>
    <TopBar />
    <div class="container">
        <div class="content">
            <Calendar ref="calendarRef" @updateCountDays="handleCountDays" />
            <FormBuy :countDays="countDays" @updateTouristsData="handleTouristsData" />
        </div>
    </div>
    
    <Footer />
</template>

<script setup>
import { ref, watch } from 'vue';
import TopBar from '@/components/Layouts/TopBar.vue';
import Footer from '@/components/Layouts/Footer.vue';
import Calendar from '@/components/BuyComponent/Calendar.vue';
import FormBuy from '@/components/BuyComponent/FormBuy.vue';

const countDays = ref(0);
const touristsData = ref([]);
const calendarRef = ref(null);
const paramsForBuy = ref(null);
 
const handleCountDays = (days) => {
    countDays.value = days;
};

const handleTouristsData = (data) => {
    touristsData.value = data;

    if (calendarRef.value && typeof calendarRef.value.getSelectedDates === 'function') {
        const selectedDates = calendarRef.value.getSelectedDates();
        paramsForBuy.value = {
            occupied_place : touristsData.value.occupiedPlace,
            check_in : selectedDates[0],
            check_out : selectedDates[1],
            users_iins : touristsData.value.tourists 
        }
    }
};

watch (() => paramsForBuy.value, () => {
    if (paramsForBuy.value != null) {

    }
})
</script>

<style scoped>
.content {
    display: flex;
    gap: 5%;
    margin-top: 30px;
}
</style>
