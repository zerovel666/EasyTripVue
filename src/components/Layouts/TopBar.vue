<template>
    <div class="container">
        <div class="content-logo">
            <img src="/src/assets/images/icon/Logo.svg" alt="" id="logo" @click="goHome">
            <p @click="goHome">EasyTrip</p>
        </div>
        <div class="r-content">
            <div class="input-content dropdown-wrapper">
                <input type="text" placeholder="Куда вы собираетесь поехать?" v-model="searchQuery"
                    @focus="showDropdown = true" @click="searchQuery = ''" />
                <button @click="searchTrip">
                    <img src="/src/assets/images/icon/Search.svg" alt="">
                </button>

                <ul v-if="showDropdown" class="dropdown">
                    <li v-for="option in filteredOptions" :key="option.id" @click="selectOption(option)">
                        {{ option.trip_name }} ({{ option.country_name }})
                    </li>
                </ul>
            </div>
            <p @click="goAboutUs">О проекте •</p>
            <div class="menu">
                <p @click="toggleMenu">Меню •</p>
                <ul v-if="showMenu" class="menu-dropdown">
                    <li @click="goTo('/filter')">Фильтрация</li>
                    <li @click="goTo('/profile')">Мой профиль</li>
                    <li @click="logout">Выйти</li>
                </ul>
            </div>
            <p id="auth" @click="goLogin" v-if="isAuthorized">Войти</p>
        </div>
    </div>
    <div v-if="loading.active" class="loader">
        <a-spin size="large" />
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';
import axios from 'axios';
import { API_URL } from '@/config';
import { useRouter } from 'vue-router';
import { inject } from 'vue';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const loading = inject('loading');
const router = useRouter();
const countries = ref([]);
const searchQuery = ref('');
const showDropdown = ref(false);
const isAuthorized = ref(true);
const showMenu = ref(false);

const toggleMenu = () => {
    showMenu.value = !showMenu.value;
};

const goTo = (path) => {
    router.push(path);
    showMenu.value = false;
};

const logout = () => {
    cookies.remove('userid');
    router.push('/login');
    showMenu.value = false;
};

const authorizedBool = () => {
    const userId = cookies.get('userid');
    if (userId) {
        isAuthorized.value = false
    }
}
const getCountries = async () => {
    try {
        const response = await axios.get(API_URL + "/country/all");
        countries.value = response.data;
    } catch (error) {
        console.error("Ошибка загрузки данных:", error);
    }
};
const goLogin = () => {
    router.push('/login');
}
onMounted(() => {
    getCountries();
    document.addEventListener('click', closeDropdown);
});

watch(() => loading.active, (newVal) => {
    if (newVal) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});

onBeforeUnmount(() => {
    document.removeEventListener('click', closeDropdown);
});

const goHome = () => {
    router.push('/');
};

const goAboutUs = () => {
    router.push('/aboutUs');
};

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
    router.push(`/filter/${encodeURIComponent(option.trip_name)}`);
    showDropdown.value = false;
};

const closeDropdown = (event) => {
    if (!event.target.closest('.dropdown-wrapper')) {
        showDropdown.value = false;
    }
};
const searchTrip = () => {
    const query = searchQuery.value.trim();
    router.push(query ? `/filter/${encodeURIComponent(query)}` : '/filter');
};
onMounted(authorizedBool)
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
    align-items: center;
    height: 70px;
}

.content-logo {
    display: flex;
    align-items: center;
    gap: 10px;
}

.content-logo p {
    font-size: 30px;
    margin: 0;
    cursor: pointer;
    line-height: 1;
}

#logo {
    height: 50px;
    cursor: pointer;
}

.r-content {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70px;
    width: 75%;
    gap: 15px;
}

.r-content p {
    margin: 0;
    cursor: pointer;
    border: none;
    font-size: 18px;
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
    margin-left: auto;
    color: #007b5b;
}
.menu-dropdown {
    position: absolute;
    top: 50px;
    background: white;
    border: 1px solid #ccc;
    border-radius: 8px;
    list-style: none;
    padding: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    z-index: 1000;
}

.menu-dropdown li {
    padding: 10px;
    cursor: pointer;
    transition: background 0.2s ease-in-out;
}

.menu-dropdown li:hover {
    background: #f5f5f5;
}
.menu{
    position: relative;
}

</style>