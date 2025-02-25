<template>
    <div class="container">
        <p>
            Погрузись в увлекательное путешествие по 627 городам вместе с EasyTrip! Открой для себя новые места, окунись
            в
            атмосферу удивительных культур и создай незабываемые воспоминания. Мир ждет тебя – отправляйся в дорогу!
        </p>
        <div class="content">
            <div class="card" v-for="(city,index) in cities" :key="index" :style="{backgroundImage: `url(${city.image_path})`}">
                <div class="card_infos">
                    <p>{{ city.country_name }}</p>
                    <p class="count_trip">{{ city.count_trip }} городов для посещения</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { API_URL } from '@/config';
import axios from 'axios';
import { onMounted, ref } from 'vue';

const cities = ref([]);
const countTrip = ref(null)
const getCities = async () => {
    const response = await axios.get(API_URL + "/country/countByname");
    cities.value = response.data;

    countTrip.value = response.data.reduce((sum, element) => sum + element.count_trip, 0);
};

onMounted(getCities);
</script>

<style scoped>
.container p{
    text-align: center;
    font-size: 22px;
    margin-top: 50px;
}
.content{
    display: grid;
    grid-gap: 20px;
    grid-template-columns: repeat(1, 1fr);
    justify-content: center;
}
.card{
    position: relative;
    height: 400px;
    width: 100%;
    border: 1px solid #02BF8C;
    margin: 0 auto;
    border-radius: 35px;
    overflow: hidden;
    background-size: cover;
    background-position: center;
}
.card_infos {
    top: 0;
    left: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.6);
    color: white;
    border-radius: 15px;
    padding: 15px; 
    box-sizing: border-box; 
    transform: translateY(-100%);
    transition: transform 0.3s ease;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
 
}

.card:hover .card_infos {
    transform: translateY(0);
}

.card:hover .card_infos {
    top:0;
}

.card_infos p {
    margin: 0;
    text-align: center;
    font-size: 42px;
}
.card_infos .count_trip {
    font-size: 20px;
}

@media (min-width: 768px) {
    .content { 
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (min-width: 1024px) {
    .content { 
        grid-template-columns: repeat(3, 1fr);
    }
}

</style>