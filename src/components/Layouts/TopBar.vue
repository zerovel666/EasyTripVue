<template>
    <div class="container">
        <div class="content-logo">
            <img src="/src/assets/images/icon/Logo.svg" alt="" id="logo">
            <p>EasyTrip</p>
        </div>
        <div class="r-content">
            <div class="input-content dropdown-wrapper">
                <input type="text" placeholder="Куда вы собираетесь поехать?" v-model="searchQuery"
                    @focus="showDropdown = true" />
                <button>
                    <img src="/src/assets/images/icon/Search.svg" alt="">
                </button>

                <ul v-if="showDropdown" class="dropdown">
                    <li v-for="option in filteredOptions" :key="option.id" @click="selectOption(option)">
                        {{ option.trip_name }} ({{ option.country_name }})
                    </li>
                </ul>
            </div>
            <p>О проекте •</p>
            <p>Меню •</p>
            <p id="auth">Войти</p>
        </div>
    </div>
</template>



<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import axios from 'axios';
import { API_URL } from '@/config';

const countries = ref([]);
const searchQuery = ref('');
const showDropdown = ref(false);

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
};

const closeDropdown = (event) => {
    if (!event.target.closest('.dropdown-wrapper')) {
        showDropdown.value = false;
    }
};
</script>


<style scoped>
.dropdown-wrapper {
    position: relative;
}

.dropdown {
    position: absolute;
    top: 40px;
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

.container {
    display: flex;
    justify-content: space-between;
    max-height: 70px;
    align-items: center;
}

.content-logo {
    display: flex;
    justify-content: left;
    align-items: center;
    width: 35%;
    height: 70px;
    cursor: pointer;
}

.content-logo p {
    font-size: 30px;
    margin-left: 5px;
}

#logo {
    height: 50px;
}

.r-content {
    display: flex;
    justify-content: left;
    align-items: center;
    height: 70px;
    width: 75%;
}

.r-content p {
    margin-left: 10px;
    cursor: pointer;
}

.input-content {
    width: 60%;
    display: flex;
    align-items: center;
    position: relative;
}

.input-content input {
    width: 100%;
    height: 35px;
    border-radius: 5px;
    padding-right: 45px;
    border: 1px solid #ccc;
    outline: none;
    padding-left: 10px;
    font-size: 18px;
}

.input-content button {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 40px;
    background-color: #02BF8C;
    border: none;
    cursor: pointer;
    border-radius: 0 5px 5px 0;
    display: flex;
    justify-content: center;
    align-items: center;
}

.input-content button img {
    width: 20px;
}

#auth {
    margin-left: 9%;
    color: #007b5b;
}
</style>