<template>
    <TopBar />
    <div class="container">
        <div class="content">
            <div :style="{ width: '300px', border: '1px solid #d9d9d9', borderRadius: '4px' }">
                <a-calendar v-model:value="value" :fullscreen="false" @panelChange="onPanelChange" />
            </div>
        </div>
    </div>
    <Footer />
</template>

<script setup>
import Footer from '@/components/Layouts/Footer.vue';
import TopBar from '@/components/Layouts/TopBar.vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import dayjs from 'dayjs';

const value = ref(dayjs());
const occupiedDates = ref([]);
const onPanelChange = (value, mode) => {
  console.log(value, mode);
};
const getOccupiedDates = async () => {
    const response = await axios.get(`${API_URL}/booking/${route.params.trip_name}`);
    occupiedDates.value = response.data;
    occupiedDates.value = occupiedDates.value.map(({ check_in, check_out }) => ({ check_in, check_out }));
};

const router = useRouter();
const route = useRoute();
onMounted(getOccupiedDates);
</script>


<style scoped>
.content {
    height: 500px;
    border: 1px solid black;
}
</style>