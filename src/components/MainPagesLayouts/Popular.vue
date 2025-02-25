<template>
    <div class="container">
        <h2>Популярное</h2>
        <div class="cards">
            <div class="card" v-for="(card, index) in cardInfos" :key="index" :style="{ backgroundImage: `url(${card.image_path})` }">
                <div class="card-info">
                    <div class="head_card_item">
                        <p>{{ card.trip_name }}</p>
                        <div class="rating">
                            {{ card.description_country.rating }}
                            <img src="/src/assets/images/icon/Star.svg" alt="">
                        </div>
                    </div>
                    <p class="preview_text">{{ card.description_country.preview }}</p>
                </div>
            </div>
        </div>
        <div id="buttonCont">
            <button>Посмотреть все туры</button>
            <p v-if="countTrip">{{ countTrip }} городов</p>
        </div>
    </div>
</template>

<script setup>
import { API_URL } from '@/config';
import axios from 'axios';
import { onMounted, ref,defineProps } from 'vue';       

const props = defineProps({
    countTrip: Object, 
});

const cardInfos = ref([]);

const getCardInfos = async () => {
    try {
        const response = await axios.get(API_URL + "/country/best");
        cardInfos.value = response.data;
    } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
    }
};

onMounted(getCardInfos);
</script>

<style scoped>
h2 {
    text-align: center;
    margin: 30px;
}

.cards {
    display: grid;
    grid-gap: 20px;
    grid-template-columns: repeat(1, 1fr);
    justify-content: center;
}

@media (min-width: 768px) {
    .cards {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (min-width: 1024px) {
    .cards {
        grid-template-columns: repeat(3, 1fr);
    }
}

.card {
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

.card::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0);
    transition: background 0.3s ease;
    border-radius: 35px;
    cursor: pointer;
}

.card:hover::before {
    background: rgba(0, 0, 0, 0.5);
}

.card-info {
    position: absolute;
    bottom: -100%;
    height: 100px;
    left: 0;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 10px;
    transition: bottom 0.3s ease-in-out;
    border-radius: 0 0 35px 35px;
    cursor: pointer;
}
p{
    margin: 10px;
}
.card:hover .card-info {
    bottom: 0;
}
.preview_text{
    font-size: 14px;
}
.head_card_item{
    height: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
}

.rating{
    display: flex;
    justify-content: center;
    align-items: center;
}
.rating img{
    width: 15px;
    margin-left: 3px;
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
