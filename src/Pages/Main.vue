<template>
    <TopBar />
    <Banner />
    <Popular />
    <InfoTrip />
    
    <Cities />
</template>

<script setup>
import TopBar from '@/components/Layouts/TopBar.vue';
import Banner from '@/components/MainPagesLayouts/Banner.vue';
import Cities from '@/components/MainPagesLayouts/Cities.vue';
import InfoTrip from '@/components/MainPagesLayouts/InfoTrip.vue';
import Popular from '@/components/MainPagesLayouts/Popular.vue';

</script>

<style>

body{
    height: 10000px;
}
</style>