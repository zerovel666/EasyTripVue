<template>
    <TopBar />
    <div class="iconPages">
        <div id="scrollTop" @click="scrollToTop">
            <img src="/src/assets/images/icon/filter/scrollTop.svg" alt="">
        </div>
        <div id="settingFilter" @click="toggleFilter">
            <img src="/src/assets/images/icon/filter/filter.svg" alt="">
        </div>
        <div v-if="isFilterOpen" class="filter-modal" ref="filterRef">
            <h3>Фильтр</h3>
            <div class="input-filter">
                <label>
                    Рейтинг:
                    <input type="number" v-model="filters.rating" min="0" max="5" step="0.1">
                </label>
                <label>
                    Город:
                    <input type="text" v-model="filters.city">
                </label>
                <label>
                    Страна:
                    <input type="text" v-model="filters.country">
                </label>
                <label>
                    Мин. цена:
                    <input type="number" v-model="filters.minPrice">
                </label>
                <label>
                    Макс. цена:
                    <input type="number" v-model="filters.maxPrice">
                </label>
            </div>
            <button @click="applyFilters">Применить</button>
        </div>
    </div>

    <div class="content" v-for="(trip, index) in filteredTrips" :key="index">
        <div class="trip" :style="{ backgroundImage: `url(${trip.image_path})` }">
            <div class="shadow-box">
                <div class="containerCard">
                    <div class="card">
                        <div class="card-header" :class="{ 'hidden': activeIndex === index }">
                            <h1>{{ trip.trip_name }}</h1>
                            <p>{{ trip.country_name }} — {{ trip.city_name }}</p>
                            <div class="rating">
                                <p>{{ trip.description_country.rating }}</p>
                                <img src="/src/assets/images/icon/Star.svg" alt="">
                            </div>
                        </div>
                        <div class="menu" :class="{ 'rotated': activeIndex === index }" @click="toggleCardInfo(index)">
                            <img src="/src/assets/images/FilterPages/menu.svg" alt="">
                        </div>
                        <div class="card-info" :class="{ 'active': activeIndex === index }">
                            <h2>{{ trip.description_country.title }}</h2>
                            <p class="scrollable-text">{{ trip.description_country.description }}</p>
                            <ul v-for="(tag, index) in trip.tags" class="tags">
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
import { ref, onMounted, onUnmounted } from 'vue';
import axios from 'axios';
import TopBar from '@/components/Layouts/TopBar.vue';
import { API_URL } from '@/config';

const trips = ref([]);
const filteredTrips = ref([]); 
const activeIndex = ref(null);
const isFilterOpen = ref(false);
const filterRef = ref(null);

const filters = ref({
    rating: null,
    country: '',
    city: '',
    minPrice: null,
    maxPrice: null,
});

const getAllTrips = async () => {
    const response = await axios.get(API_URL + '/country/all');
    trips.value = response.data;
    filteredTrips.value = response.data; 
};
onMounted(getAllTrips);

const toggleCardInfo = (index) => {
    activeIndex.value = activeIndex.value === index ? null : index;
};

const toggleFilter = () => {
    isFilterOpen.value = !isFilterOpen.value;
};

const closeFilterOnClickOutside = (event) => {
    if (isFilterOpen.value) {
        const filterModal = document.querySelector('.filter-modal');
        const filterButton = document.getElementById('settingFilter');
        if (filterModal && !filterModal.contains(event.target) && !filterButton.contains(event.target)) {
            isFilterOpen.value = false;
        }
    }
};

onMounted(() => {
    document.addEventListener('click', closeFilterOnClickOutside);
});

onUnmounted(() => {
    document.removeEventListener('click', closeFilterOnClickOutside);
});

const applyFilters = () => {
    filteredTrips.value = trips.value.filter(trip => {
        return (
            (!filters.value.rating || trip.description_country.rating >= filters.value.rating) &&
            (!filters.value.country || trip.country_name.toLowerCase().includes(filters.value.country.toLowerCase())) &&
            (!filters.value.city || trip.city_name.toLowerCase().includes(filters.value.city.toLowerCase())) &&
            (!filters.value.minPrice || trip.price_per_day >= filters.value.minPrice) &&
            (!filters.value.maxPrice || trip.price_per_day <= filters.value.maxPrice)
        );
    });

    if (filteredTrips.value.length === 0) {
        alert("По вашему запросу ничего не найдено.");
        resetFilters();
    }

    isFilterOpen.value = false; 
};

const resetFilters = () => {
    filters.value = {
        rating: null,
        country: '',
        city: '',
        minPrice: null,
        maxPrice: null,
    };
    filteredTrips.value = [...trips.value]; 
};



const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
};
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

.rating {
    display: flex;
}

.rating p {
    margin: 0;
}

.rating img {
    width: 16px;
    margin-left: 3px;
}

.iconPages {
    position: fixed;
    top: 100px;
    right: 3.5%;
    z-index: 100;
    cursor: pointer;
}

.iconPages img {
    width: 60px;
}

.filter-modal {
    position: absolute;
    top: 50px;
    right: 75px;
    width: 300px;
    background: white;
    border-radius: 10px;
    padding: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    z-index: 101;
}

.input-filter {
    width: 100%;
    position: relative;
    box-sizing: border-box;
}

.input-filter input {
    box-sizing: border-box;
    width: 100%;
    padding: 5px;
    border-radius: 10px;
    border: 0.5px solid #02BF8C;
    margin-top: 5px;
}

.input-filter input:focus {
    outline: none;
    border-color: #02BF8C;
    background-color: #f0f0f0;
}

.input-filter label {
    display: block;
    margin-bottom: 10px;
}

.input-filter input::-webkit-input-placeholder {
    color: #aaa;
}

.filter-modal h3 {
    margin: 0 0 10px;
    font-size: 18px;
}


.filter-modal button {
    width: 100%;
    padding: 8px;
    background: #02BF8C;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
    color: white;
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

.tags {
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
