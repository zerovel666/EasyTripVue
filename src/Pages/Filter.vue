<template>
    <TopBar />

    <div class="content" v-for="(trip, index) in filteredTrips" :key="index">
        <div class="trip" :style="{ backgroundImage: `url(${trip.image_path})` }">
            <div class="shadow-box">
                <div class="containerCard">
                    <div class="card">
                        <div class="card-header" :class="{ 'hidden': activeIndex === index }">
                            <h1>{{ trip.trip_name }}</h1>
                            <p>{{ trip.country_name }} — {{ trip.trip_name }}</p>
                        </div>
                        <div class="menu" :class="{ 'rotated': activeIndex === index }" @click="toggleCardInfo(index)">
                            <img src="/src/assets/images/FilterPages/menu.svg" alt="">
                        </div>
                        <div class="card-info" :class="{ 'active': activeIndex === index }">
                            <h2>{{ trip.description_country.title }}</h2>
                            <p class="scrollable-text">{{ trip.description_country.description }}</p>
                            <ul v-for="(tag,index) in trip.tags" class="tags">
                                <li>{{ tag.tag }}</li>
                            </ul>
                            <p>Цена за день — {{ trip.price_per_day }} {{ trip.currency }}</p>
                            <button>Забронировать</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import TopBar from '@/components/Layouts/TopBar.vue';
import { API_URL } from '@/config';
import axios from 'axios';
import { onMounted, ref, computed } from 'vue';

const trips = ref([]);
const activeIndex = ref(null); // Хранит индекс активного card-info

const filters = ref({
    country: '',
    city: '',
    minPrice: null,
    maxPrice: null,
    onlyAvailable: false,
    onlyActive: false
});

const getAllTrips = async () => {
    const response = await axios.get(API_URL + '/country/all');
    trips.value = response.data;
};
onMounted(getAllTrips);

const toggleCardInfo = (index) => {
    activeIndex.value = activeIndex.value === index ? null : index;
};

const filteredTrips = computed(() => {
    return trips.value.filter(trip => {
        return (
            (!filters.value.country || trip.country_name.toLowerCase().includes(filters.value.country.toLowerCase())) &&
            (!filters.value.city || trip.city_name.toLowerCase().includes(filters.value.city.toLowerCase())) &&
            (!filters.value.minPrice || trip.price_per_day >= filters.value.minPrice) &&
            (!filters.value.maxPrice || trip.price_per_day <= filters.value.maxPrice) &&
            (!filters.value.onlyAvailable || (trip.count_place - trip.occupied) > 0) &&
            (!filters.value.onlyActive || trip.active)
        );
    });
});
</script>

<style scoped>
.trip {
    position: relative;
    min-height: 400px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    margin-bottom: 1px;
}

.containerCard {
    padding: 0 10%;
    height: 100%;
}

.shadow-box {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    overflow: hidden;
    box-sizing: border-box;
    padding: 10px 0;
}

.card {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: end;
    width: 100%;
    height: 100%;
}

.menu {
    position: absolute;
    right: -100px;
    top: 50%;
    transform: translateY(-50%) rotate(0);
    transition: transform 0.3s ease-in-out;
    cursor: pointer;
}

.menu.rotated {
    transform: translateY(-50%) rotate(-90deg);
}

.menu img {
    width: 60px;
}

.card-info {
    position: absolute;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    left: 200%;
    transition: left 0.3s ease-in-out;
    max-height: 400px; 
    overflow-y: auto; 
    padding-right: 10px;
}
.card-info button {
    font-size: 20px;
    height: 50px;
    border-radius: 10px;
    background: rgba(104, 255, 220, 0.438); 
    color: white;
    border: none;
    backdrop-filter: blur(10px);
    transition: transform 0.3s ease-in-out;
    cursor: pointer;
    margin-left: 10px;
}

.card-info button:hover {
    transform: scale(1.05);
}

.card-info.active {
    left: 0;
}

.card-info button {
    width: 300px;
}

.card-header {
    transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
}

.card-header.hidden {
    opacity: 0;
    transform: translateY(-10px);
    pointer-events: none;
}
.tags{
    margin: 0;
}
.scrollable-text {
    max-height: 70px;
    overflow-y: auto;
}
.scrollable-text::-webkit-scrollbar {
    width: 6px; 
}

.scrollable-text::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1); 
    border-radius: 3px;
}

.scrollable-text::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.5); 
    border-radius: 3px;
}

.scrollable-text::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.8); 
}

</style>
