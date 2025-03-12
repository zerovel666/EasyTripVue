<template>
    <div class="content-overlay" v-if="showModal" @click="closeModal">
        <div class="content" @click.stop>
            <div class="input-container" v-for="(items, key) in inputData" :key="key">
                <h3>{{ key }}</h3>
                <div class="input-content">
                    <template v-for="(item, index) in items" :key="index">
                        <label v-if="item === 'image_path'" class="custom-file-label">
                            <span>{{ selectedFileName || "Выбрать файл" }}</span>
                            <input type="file" @change="handleFileUpload">
                        </label>
                        <input v-model="selectedRowData[item]" :type="item === 'active' ? 'checkbox' : 'text'"
                            :placeholder="item"
                            :disabled="['id', 'created_at', 'updated_at'].includes(item)"
                            :style="{ backgroundColor: ['id', 'created_at', 'updated_at'].includes(item) ? '#e6e6e6' : '' }">
                    </template>
                </div>
            </div>
            <button @click="sendImageCountry">Отправить</button>
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
import { inject, ref, watch } from 'vue';
import Notification from '../Layouts/Notification.vue';

const loading = inject('loading');
const notificationMessage = ref('');
const inputData = ref([]);
const selectedFileName = ref('');
const selectedFile = ref(null);
const selectedRowData = ref({});

const getAllColumnsOrRelations = async () => {
    const response = await axios.get(`${API_URL}/admin/imageCountry/download`);
    inputData.value = response.data;
};

const props = defineProps({
    showModal: Boolean
});

const emit = defineEmits();

watch(() => props.showModal, (newVal) => {
    if (newVal) {
        getAllColumnsOrRelations();
    }
});

watch(() => loading.active, (newVal) => {
    document.body.style.overflow = newVal ? 'hidden' : '';
});

const closeModal = () => {
    emit('update:showModal', false);
};

const sendImageCountry = async () => {
    if (!selectedRowData.value.country_name || !selectedFile.value) {
        notificationMessage.value = 'Название страны и изображение обязательны';
        return;
    }
    
    const formData = new FormData();
    formData.append('country_name', selectedRowData.value.country_name);
    formData.append('image_path', selectedFile.value);
    
    try {
        const response = await axios.post(`${API_URL}/admin/imageCountry/create`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        if (response.status === 200){
            notificationMessage.value = 'Файл успешно загружен';
            setTimeout(() => {
                notificationMessage.value = '';
            },2000);
            closeModal();
        }
    } catch (error) {
        notificationMessage.value = `Ошибка ${error}`;
        setTimeout(() => {
            notificationMessage.value = '';
        },3000);
    }
};

const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        selectedRowData.value.image_path = file;
        selectedFileName.value = file.name;
        selectedFile.value = file;
    }
};
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
.content button{
    width: 100%;
    margin-top: 20px;
    height: 40px;
    border: none;
    border-radius: 10px;
    background-color: #02BF8C;
    color: white;
}
.content button:hover{
    background-color: #008561;
}
.input-content {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
}

.input-content input {
    width: 100%;
    height: 35px;
    border-radius: 5px;
    padding-right: 45px;
    border: 1px solid #9e9e9e;
    outline: none;
    padding-left: 10px;
    font-size: 18px;
}

.custom-file-label {
    width: 100%;
    height: 40px;
    border-radius: 10px;
    border: 1px solid #898989;
    outline: none;
    padding-left: 10px;
    font-size: 18px;
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
</style>