<template>
    <div class="content">
        <transition name="fade">
            <h1 v-if="showText" class="intro-text">С EasyTrip всё проще</h1>
        </transition>

        <transition name="fade">
            <div v-if="showLogin" class="registerCont">
                <h2>Вход</h2>
                <input type="email" placeholder="Email" v-model="email">
                <p v-if="errors.email" class="error">{{ errors.email }}</p>

                <input type="password" placeholder="Пароль" v-model="password">
                <p v-if="errors.password" class="error">{{ errors.password }}</p>

                <input type="password" placeholder="Повторите пароль" v-model="passwordTwo">
                <p v-if="errors.passwordTwo" class="error">{{ errors.passwordTwo }}</p>

                <input type="text" placeholder="ИИН" v-model="iin">
                <p v-if="errors.iin" class="error">{{ errors.iin }}</p>

                <input type="text" placeholder="ФИО" v-model="fullName">
                <p v-if="errors.fullName" class="error">{{ errors.fullName }}</p>

                <h3>Выберите роль</h3>
                <div class="flex">
                    <div class="flex">
                        <p>Стандарт</p>
                        <input type="checkbox" v-model="standart" @change="toggleRole('standart')">
                    </div>
                    <div class="flex">
                        <p>Админ</p>
                        <input type="checkbox" v-model="admin" @change="toggleRole('admin')">
                    </div>
                </div>
                <p v-if="errors.role" class="error">{{ errors.role }}</p>

                <transition name="fade">
                    <div>
                        <input v-if="admin" type="text" placeholder="Введите ключ" v-model="adminKey" class="admin-key">
                        <p v-if="errors.adminKey" class="error">{{ errors.adminKey }}</p>
                    </div>
                </transition>

                <button @click="auth">Зарегистрироваться</button>
                <p @click="goLogin">Вернуться к авторизации</p>
            </div>
        </transition>

        <div v-if="loading.active" class="loader">
            <a-spin size="large" />
        </div>
        <Notification :message="notificationMessage" />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { inject } from 'vue';
import axios from 'axios';
import Notification from '@/components/Layouts/Notification.vue';
import { API_URL } from '@/config';

const loading = inject('loading');
const router = useRouter();
const email = ref('');
const password = ref('');
const passwordTwo = ref('');
const iin = ref('');
const fullName = ref('');
const standart = ref(false);
const admin = ref(false);
const adminKey = ref('');
const showText = ref(true);
const showLogin = ref(false);
const notificationMessage = ref('');
const errors = ref({});

onMounted(() => {
    setTimeout(() => {
        showText.value = false;
        setTimeout(() => {
            showLogin.value = true;
        }, 1000);
    }, 2000);
});

const toggleRole = (role) => {
    if (role === 'standart') {
        admin.value = false;
    } else {
        standart.value = false;
    }
};

const validateForm = () => {
    errors.value = {};
    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
        errors.value.email = 'Введите корректный email';
        isValid = false;
    }
    if (!password.value || password.value.length < 6) {
        errors.value.password = 'Пароль должен содержать минимум 6 символов';
        isValid = false;
    }
    if (passwordTwo.value !== password.value) {
        errors.value.passwordTwo = 'Пароли не совпадают';
        isValid = false;
    }
    if (!iin.value || iin.value.length !== 12 || !/^\d+$/.test(iin.value)) {
        errors.value.iin = 'Введите корректный ИИН (12 цифр)';
        isValid = false;
    }
    if (!fullName.value) {
        errors.value.fullName = 'Введите ФИО';
        isValid = false;
    }
    if (!standart.value && !admin.value) {
        errors.value.role = 'Выберите роль';
        isValid = false;
    }
    if (admin.value && !adminKey.value) {
        errors.value.adminKey = 'Введите ключ администратора';
        isValid = false;
    }

    return isValid;
};

const goLogin = () => {
    router.push('/login');
};

const auth = async () => {
    if (!validateForm()) return;

    try {
        const params = {
            email: email.value,
            password: password.value,
            iin: iin.value,
            full_name: fullName.value,
            role: admin.value ? 'admin' : 'standart',
            adminKey: admin.value ? adminKey.value : null
        };

        const response = await axios.post(`${API_URL}/user/register`, params);

        if (response.status === 200) {
            notificationMessage.value = 'Успешная регистрация!';
            setTimeout(() => {
                router.push('/login');
            }, 3000);
        }else {
            throw new Error('Ошибка регистрации');
        }
    } catch (error) {
        notificationMessage.value = 'Ошибка регистрации';
        setTimeout(() => {
            notificationMessage.value = '';
        }, 3000);
    }
};
</script>



<style scoped>
.error {
    color: red;
    font-size: 12px;
}

.content {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: url('/src/assets/images/login/background.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    position: relative;
}

.content::before {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 0;
}

.intro-text {
    position: absolute;
    color: white;
    font-size: 2rem;
    font-weight: bold;
    z-index: 1;
}

.registerCont {
    width: 20%;
    padding: 20px;
    border-radius: 10px;
    background: white;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 10px;
    position: relative;
    z-index: 1;
}

p {
    margin: 0px;
    cursor: pointer;
}

input {
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
}

button {
    padding: 10px;
    font-size: 1rem;
    border: none;
    background-color: #02BF8C;
    color: white;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background-color: #009c72;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 1s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

#refresh {
    font-size: 12px;
}

.flex {
    display: flex;
    justify-content: space-between;
}

h3 {
    margin: 0;
}

input[type="checkbox"] {
    margin-left: 5px;
    width: 30px;
}

.admin-key {
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
}
</style>
