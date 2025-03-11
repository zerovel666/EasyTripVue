<template>
    <div class="content-overlay" v-if="showModal" @click="closeModal">
        <div class="content" @click.stop>
            <div class="input-contentAll" v-if="inputData" @click="showDropdown = false">
                <div v-for="(items, index) in inputData" :key="index">
                    <h3>{{ index }}</h3>
                    <div class="input-section">
                        <template v-for="(item, key) in items" :key="key">
                            <label v-if="item === 'image_path'" class="custom-file-label">
                                <span>{{ formData[index][item + '_name'] || 'Выбрать файл' }}</span>
                                <input type="file" @change="handleFileUpload($event, index, item)" />
                            </label>

                            <input v-else-if="item === 'active'" type="checkbox" v-model="formData[index][item]" />

                            <input v-else type="text" :placeholder="item"
                                :disabled="['id', 'created_at', 'updated_at','country_id'].includes(item)"
                                :style="{ backgroundColor: ['id', 'created_at', 'updated_at','country_id'].includes(item) ? '#e6e6e6' : '' }"
                                v-model="formData[index][item]" />
                        </template>

                    </div>
                </div>
                <button @click="submitForm">Send</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { API_URL } from '@/config';
import axios from 'axios';
import { defineProps, defineEmits, onMounted, ref } from 'vue';

const inputData = ref([]);
const formData = ref({
    country: {
        country_name: "",
        image_path: null,
    },
    image_country: {
        image_path: null,
    },
});
const showDropdown = ref(false);

defineProps({
    showModal: Boolean
});

const getColumnOrRelation = async () => {
    const response = await axios.get(`${API_URL}/admin/country/download`);
    inputData.value = response.data;
    formData.value = Object.fromEntries(Object.keys(response.data).map(key => [key, {}]));
};



const emit = defineEmits(['update:showModal']);

const closeModal = () => {
    emit('update:showModal', false);
};

onMounted(() => {
    getColumnOrRelation();
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
    height: 650px;
    width: 800px;
    z-index: 1000;
    overflow-y: auto;
}

.input-contentAll {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.input-section {
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(3, 1fr);
}

.input-contentAll button {
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

.input-section input,
.custom-file-label {
    width: 100%;
    height: 40px;
    border-radius: 10px;
    border: 1px solid #898989;
    outline: none;
    padding-left: 10px;
    font-size: 18px;
}

.custom-file-label {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #02BF8C;
    color: white;
    font-weight: bold;
    cursor: pointer;
    padding: 0;
    text-align: center;
}

.custom-file-label:hover {
    background-color: #008561;
}

.custom-file-label input {
    display: none;
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

.content::-webkit-scrollbar {
    width: 5px;
    height: 3px;
}

.content::-webkit-scrollbar-track {
    background: #ffffff33;
}

.content::-webkit-scrollbar-thumb {
    background: #0d8767;
}

.content::-webkit-scrollbar-thumb:hover {
    background: #03c89d;
}

.dropdown::-webkit-scrollbar {
    width: 2px;
}

.dropdown::-webkit-scrollbar-thumb {
    background-color: #02BF8C;
    border-radius: 10px;
}

.dropdown::-webkit-scrollbar-track {
    background: #f0f0f0;
    border-radius: 10px;
}
</style>