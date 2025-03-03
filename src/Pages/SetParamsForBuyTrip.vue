<template>
    <TopBar />
    <div class="container">
        <div class="content">
            <Calendar @updateCountDays="handleCountDays" />
            <FormBuy :countDays="countDays" />
        </div>
    </div>
    <Footer />
</template>

<script setup>
import { ref } from 'vue';
import TopBar from '@/components/Layouts/TopBar.vue';
import Footer from '@/components/Layouts/Footer.vue';
import Calendar from '@/components/BuyComponent/Calendar.vue';
import FormBuy from '@/components/BuyComponent/FormBuy.vue';

const countDays = ref(0); 

const handleCountDays = (days) => {
    countDays.value = days;
};
</script>

<style scoped>
.content {
    display: flex;
    gap: 5%;
    margin-top: 30px;
}
</style>
