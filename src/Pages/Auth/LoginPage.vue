<template>
    <div class="content">
        <transition name="fade">
            <h1 v-if="showText" class="intro-text">С EasyTrip всё проще</h1>
        </transition>

        <transition name="fade">
            <div v-if="showLogin" class="loginCont">
                <h2>Вход</h2>
                <input type="email" placeholder="Email" v-model="email" @blur="validateEmail">
                <p v-if="emailError" class="error">{{ emailError }}</p>
                
                <input type="password" placeholder="Пароль" v-model="password" @blur="validatePassword">
                <p v-if="passwordError" class="error">{{ passwordError }}</p>
                
                <button @click="auth" :disabled="loading.active">Войти</button>
                <p @click="goMain">Войти как гость</p>
                <p @click="goRegister">Регистрация</p>
                <p id="refresh">Забыли пароль?</p>
            </div>
        </transition>
        
        <div v-if="loading.active" class="loader">
            <a-spin size="large" />
        </div>
        
        <Notification :message="notificationMessage" />
    </div>
</template>

<script setup>
import Notification from '@/components/Layouts/Notification.vue';
import { API_URL } from '@/config';
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { inject } from 'vue';

const loading = inject('loading');
const router = useRouter();
const email = ref('');
const password = ref('');
const showText = ref(true);
const showLogin = ref(false);
const notificationMessage = ref('');
const emailError = ref('');
const passwordError = ref('');

onMounted(() => {
    setTimeout(() => {
        showText.value = false;
        setTimeout(() => {
            showLogin.value = true;
        }, 1000);
    }, 2000);
});

const validateEmail = () => {
    if (!email.value) {
        emailError.value = 'Email не может быть пустым';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        emailError.value = 'Некорректный email';
    } else {
        emailError.value = '';
    }
};

const validatePassword = () => {
    if (!password.value) {
        passwordError.value = 'Пароль не может быть пустым';
    }else {
        passwordError.value = '';
    }
};

const goMain = () => {
    router.push('/');
};

const goRegister = () => {
    router.push('/register');
};

const auth = async () => {
    validateEmail();
    validatePassword();
    
    if (emailError.value || passwordError.value) {
        return;
    }

    try {
        loading.active = true;
        const params = { email: email.value, password: password.value };
        const response = await axios.post(`${API_URL}/user/login`, params);
        
        if (response.status === 200) {
            document.cookie = `userid=${response.data.user_id}`;
            document.cookie = `role=${response.data.role}`
            if (response.data['role'] == 'standart'){
                router.push('/');
            } else if(response.data['role'] == 'admin'){
                router.push('/admin')
            }
        } else {
            throw new Error('Неверный логин или пароль');
        }
    } catch (error) {
        notificationMessage.value = 'Ошибка авторизации';
        setTimeout(() => {
            notificationMessage.value = '';
        }, 3000);
    } finally {
        loading.active = false;
    }
};
</script>

<style scoped>
.error {
    color: red;
    font-size: 12px;
    margin-top: -10px;
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

.loginCont {
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
</style>