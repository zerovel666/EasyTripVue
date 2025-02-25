<template>
    <TopBar />
    <Banner />
    <Popular />
    <div class="container">
        <div id="line"></div>
    </div>
    <Cities />
</template>

<script setup>
import TopBar from '@/components/Layouts/TopBar.vue';
import Banner from '@/components/MainPagesLayouts/Banner.vue';
import Cities from '@/components/MainPagesLayouts/Cities.vue';
import Popular from '@/components/MainPagesLayouts/Popular.vue';

</script>

<style>
#line{
    margin-top: 50px;
    width: 100%;
    border: 1px solid #02BF8C;
    background-color: #02BF8C;
    border-radius: 100px;
    height: 1px;
}
body{
    height: 10000px;
}
</style>