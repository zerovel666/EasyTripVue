<template>
    <TopBar />
    <Banner />
    <Popular />
</template>

<script setup>
import TopBar from '@/components/Layouts/TopBar.vue';
import Banner from '@/components/MainPagesLayouts/Banner.vue';
import Popular from '@/components/MainPagesLayouts/Popular.vue';

</script>

<style>
body{
    height: 1000000px;
}
</style>