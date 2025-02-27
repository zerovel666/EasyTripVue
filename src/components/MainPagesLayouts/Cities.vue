<template>
    <div class="container">
        <h2>Исследуй мир с EasyTrip</h2>
        <p>
            Погрузись в увлекательное путешествие по {{ countTrip }} городам вместе с EasyTrip!
            Открой для себя новые места, окунись в атмосферу удивительных культур и создай незабываемые воспоминания.
            Мир ждет тебя – отправляйся в дорогу!
        </p>
        <div class="content">
            <div class="card" 
                 v-for="(city, index) in visibleCities" 
                 :key="index" 
                 :style="{ backgroundImage: `url(${city.image_path})` }">
                <div class="card_infos">
                    <p>{{ city.country_name }}</p>
                    <p class="count_trip">{{ city.count_trip }} городов для посещения</p>
                </div>
            </div>
        </div>
        <div id="buttonCont">
            <button>Посмотреть все города</button>
        </div>
    </div>
</template>

<script setup>
import { API_URL } from '@/config';
import axios from 'axios';
import { onMounted, ref, computed, defineEmits } from 'vue';

const cities = ref([]);
const countTrip = ref(null);
const emit = defineEmits(['updateCountTrip']);

const getCities = async () => {
    const response = await axios.get(API_URL + "/country/countByname");
    cities.value = response.data;

    countTrip.value = response.data.reduce((sum, element) => sum + element.count_trip, 0);
    emit('updateCountTrip', countTrip.value);
};

const visibleCities = computed(() => {
    const count = cities.value.length;
    const maxCount = count - (count % 3);
    return cities.value.slice(0, maxCount);
});

onMounted(getCities);
</script>


<style scoped>
h2{
    text-align: center;
    margin: 20px 0 0 0;
}
.container p{
    text-align: center;
    font-size: 22px;
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
    margin: 0 auto;
    border-radius: 10px;
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

#buttonCont{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
    flex-direction: column;
}
#buttonCont button{
    width: 25%;
    height: 50px;
    font-size: 20px;
    border-radius: 10px;
    border: none;
    background-color: #02BF8C;
    color: white;
    cursor: pointer;
    transition: transform 0.3s ease; 
    cursor: pointer;    
}
#buttonCont button:hover {
    transform: scale(1.05); 
}

</style>