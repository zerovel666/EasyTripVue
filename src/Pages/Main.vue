<script setup>
import { ref } from 'vue';
import TopBar from '@/components/Layouts/TopBar.vue';
import Banner from '@/components/MainPagesLayouts/Banner.vue';
import Cities from '@/components/MainPagesLayouts/Cities.vue';
import InfoTrip from '@/components/MainPagesLayouts/InfoTrip.vue';
import Popular from '@/components/MainPagesLayouts/Popular.vue';

const countTrip = ref(null);

const updateCountTrip = (data) => {
    countTrip.value = data;
};
</script>

<template>
    <TopBar />
    <Banner />
    <Popular :countTrip="countTrip" />
    <InfoTrip />
    <Cities @updateCountTrip="updateCountTrip" />
</template>

<style>
body{
    height: 10000px;
}
</style>
