<template>
    <Carousel :autoplay="3000" :wrap-around="true">
        <Slide v-for="(banner, index) in banners" :key="index">
            <div class="banner" :style="{ backgroundImage: `url(${banner.image})` }">
                <div class="banner-text">{{ banner.text }}</div>
            </div>
        </Slide>
    </Carousel>
    <div class="search">
        <div class="input-content dropdown-wrapper">
            <input type="text" placeholder="Куда вы собираетесь поехать?" v-model="searchQuery"
                @focus="showDropdown = true" />
            <button @click="searchTrip">
                <img src="/src/assets/images/icon/Search.svg" alt="">
            </button>

            <ul v-if="showDropdown" class="dropdown">
                <li v-for="option in filteredOptions" :key="option.id" @click="selectOption(option)">
                    {{ option.trip_name }} ({{ option.country_name }})
                </li>
            </ul>
        </div>
        <div v-if="loading.active" class="loader">
            <a-spin size="large" />
        </div>
    </div>
</template>

<script setup>
import { Carousel, Slide } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';
import axios from 'axios';
import { API_URL } from '@/config';
import { useRouter } from 'vue-router';
import { inject } from 'vue';

const loading = inject('loading');
const countries = ref([]);
const searchQuery = ref('');
const showDropdown = ref(false);
const router = useRouter();

const banners = ref([
    { image: "/src/assets/images/banner/banner.svg", text: "Путешествуйте по миру!" },
    { image: "/src/assets/images/banner/bannerSea.svg", text: "Наслаждайтесь морем и солнцем" },
    { image: "/src/assets/images/banner/bannerMountain.svg", text: "EasyTrip всегда с вами!" },
]);

watch(() => loading.active, (newVal) => {
    if (newVal) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});

const getCountries = async () => {
    try {
        const response = await axios.get(API_URL + "/country/all");
        countries.value = response.data;
    } catch (error) {
        console.error("Ошибка загрузки данных:", error);
    }
};

onMounted(() => {
    getCountries();
    document.addEventListener('click', closeDropdown);
});

onBeforeUnmount(() => {
    document.removeEventListener('click', closeDropdown);
});

const filteredOptions = computed(() => {
    if (!searchQuery.value) return countries.value;
    return countries.value.filter(item =>
        item.country_name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        item.city_name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        item.trip_name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
});

const selectOption = (option) => {
    searchQuery.value = option.trip_name;
    showDropdown.value = false;
    router.push(`/filter/${encodeURIComponent(option.trip_name)}`);
};
const searchTrip = () => {
    const query = searchQuery.value.trim();
    router.push(query ? `/filter/${encodeURIComponent(query)}` : '/filter');
};


const closeDropdown = (event) => {
    if (!event.target.closest('.dropdown-wrapper')) {
        showDropdown.value = false;
    }
};
</script>

<style scoped>
.banner {
    width: 100vw;
    height: 60vh;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}

.banner-text {
    color: white;
    font-size: 32px;
    font-weight: bold;
    padding: 10px 20px;
    border-radius: 10px;
    text-align: center;
}

.search {
    display: flex;
    justify-content: center;
    position: relative;
    bottom: 35px;
    z-index: 100;
}

.dropdown-wrapper {
    position: relative;
}

.dropdown {
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;
    background: white;
    border: 1px solid #ccc;
    border-radius: 8px;
    max-height: 200px;
    overflow-y: auto;
    list-style: none;
    padding: 5px 0;
    z-index: 1000;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.dropdown li {
    padding: 10px;
    cursor: pointer;
    transition: background 0.2s ease-in-out;
}

.dropdown li:hover {
    background: #f5f5f5;
}

.dropdown::-webkit-scrollbar {
    width: 6px;
}

.dropdown::-webkit-scrollbar-thumb {
    background-color: #02BF8C;
    border-radius: 10px;
}

.dropdown::-webkit-scrollbar-track {
    background: #f0f0f0;
    border-radius: 10px;
}

.input-content {
    width: 300px;
    height: 70px;
    background-color: #02BF8C;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100px;
    position: relative;
}

.input-content input {
    width: 80%;
    height: 30px;
    border-radius: 100px;
    border: 1px solid #ccc;
    outline: none;
    padding-left: 10px;
    font-size: 13px;
    background: white;
}

.input-content button {
    position: absolute;
    right: 25px;
    width: 30px;
    height: 30px;
    background-color: #02BF8C;
    border: none;
    cursor: pointer;
    border-radius: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.input-content button img {
    width: 20px;
}
</style>
