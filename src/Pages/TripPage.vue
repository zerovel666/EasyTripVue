<template>
    <TopBar />
    <Banner :tripInfo="tripInfo" />
</template>

<script setup>
import TopBar from '@/components/Layouts/TopBar.vue';
import Banner from '@/components/TripPagesLayouts/Banner.vue';
import { API_URL } from '@/config';
import axios from 'axios';
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const tripInfo = ref(null);

const getTripInfo = async () => {
    try {
        const response = await axios.get(`${API_URL}/country/${route.params.trip_name}`);
        tripInfo.value = response.data;
    } catch (error) {
        console.error("Ошибка загрузки:", error);
    }
};
watch(() => route.params.trip_name, getTripInfo);
onMounted(getTripInfo);
</script>
