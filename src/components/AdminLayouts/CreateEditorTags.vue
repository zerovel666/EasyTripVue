<template>
    <div class="content-overlay" v-if="showModal" @click="closeModal">
        <div class="content" @click.stop>
            <div class="input-container">
                <div class="header-section" v-for="(items, index) in inputData" :key="index">
                    <h3>{{ index }}</h3>
                    <div class="input-section">
                        <template v-for="(item, key) in items" :key="key">
                            <div class="filter" v-if="item === 'country_id'">
                                <div class="input-content dropdown-wrapper">
                                    <input type="text" placeholder="Выберите тур" v-model="formData[item]"
                                        @focus="showDropdown = true" @click="formData[item] = ''" />
                                    <ul v-if="showDropdown" class="dropdown">
                                        <li v-for="option in filteredOptions" :key="option.id" @click="selectOption(option)">
                                            {{ option.trip_name }} ({{ option.country_name }})
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <input v-else type="text" v-model="formData[item]" :placeholder="item" class="inputs"
                                :disabled="['id', 'created_at', 'updated_at'].includes(item)"
                                :style="{ backgroundColor: ['id', 'created_at', 'updated_at'].includes(item) ? '#e6e6e6' : '' }"
                            />
                        </template>
                    </div>
                </div>
                <button @click="sendNewTag">Отправить</button>
            </div>
        </div>
    </div>
    <div v-if="loading.active" class="loader">
        <a-spin size="large" />
    </div>
    <Notification :message="notificationMessage" />
</template>

<script setup>
import { API_URL } from '@/config';
import axios from 'axios';
import { defineProps, defineEmits, watch, ref, computed, onMounted, onBeforeUnmount, inject } from 'vue';
import Notification from '../Layouts/Notification.vue';

const inputData = ref([]);
const showDropdown = ref(false);
const countries = ref([]);
const formData = ref({}); 
const searchQuery = ref('');
const loading = inject('loading');
const notificationMessage = ref('');


watch(() => loading.active, (newVal) => {
    if (newVal) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});

const props = defineProps({
    showModal: Boolean
});

const emit = defineEmits();

const getAllColumnsOrRelations = async () => {
    try {
        const response = await axios.get(`${API_URL}/admin/tags/download`);
        inputData.value = response.data;

        for (const key in response.data) {
            response.data[key].forEach(field => {
                formData.value[field] = '';
            });
        }
    } catch (error) {
        console.error("Ошибка загрузки данных:", error);
    }
};

const selectOption = (option) => {
    formData.value['country_id'] = option.trip_name;
    showDropdown.value = false;
};

const getCountries = async () => {
    try {
        const response = await axios.get(API_URL + "/country/all");
        countries.value = response.data;
    } catch (error) {
        console.error("Ошибка загрузки данных:", error);
    }
};

const sendNewTag = async () => {
    const payload = {};

    for (const key in formData.value) {
        if (key === 'country_id') {
            const selectedCountry = countries.value.find(item => item.trip_name === formData.value[key]);
            payload[key] = selectedCountry ? selectedCountry.id : null;
        } else {
            payload[key] = formData.value[key];
        }
    }

    try {
        const response = await axios.post(`${API_URL}/admin/tags/create`, payload, {
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.status === 200) {
            notificationMessage.value = 'Тег успешно добавлен';
            setTimeout(() => {
                notificationMessage.value = '';
                emit('update:showModal', false);
            }, 2000);
        } else if (response.status === 400) {
            notificationMessage.value = response.data.message;
            setTimeout(() => {
                notificationMessage.value = '';
            }, 3000);
        } else if (response.status === 500) {
            notificationMessage.value = response.data.message;
            setTimeout(() => {
                notificationMessage.value = '';
            }, 3000);
        }
    } catch (error) {
    }
};

const filteredOptions = computed(() => {
    if (!searchQuery.value) return countries.value;
    return countries.value.filter(item =>
        item.trip_name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        item.country_name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
});

onMounted(() => {
    document.addEventListener('click', closeDropdown);
});

onBeforeUnmount(() => {
    document.removeEventListener('click', closeDropdown);
});

const closeDropdown = (event) => {
    if (!event.target.closest('.dropdown-wrapper')) {
        showDropdown.value = false;
    }
};

const closeModal = () => {
    emit('update:showModal', false);
};

watch(() => props.showModal, (newVal) => {
    if (newVal) {
        getAllColumnsOrRelations();
        getCountries();
    };
});
</script>



<style scoped>
.content-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
}

.content {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 800px;
    z-index: 1000;
    overflow-y: auto;
}
.input-section{
    display: grid;
    grid-template-columns: repeat(3,1fr);
    gap: 20px;
}

.filter {
    margin-bottom: 10px;
}

.input-content {
    display: flex;
    align-items: center;
    position: relative;
}

.input-content input,.inputs {
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
.input-container{
    display: flex;
    flex-direction: column;
    gap: 20px;
}
.input-container button{
    width: 100%;
    height: 40px;
    border-radius: 10px;
    border: none;
    background-color: #02BF8C;
    color: white;
    font-weight: bold;
    cursor: pointer;
    font-size: 18px;
}
</style>