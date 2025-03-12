<template>
    <div class="overlay-modal" v-if="showModal" @click.self="closeModal">
        <div class="modal">
            <div class="content">
                <div class="contactInfo">
                    <div class="header">
                        <h3 class="num">1</h3>
                        <h3>Контактная информация</h3>
                    </div>
                    <div class="inputContact">
                        <input type="text" placeholder="Email" v-model="email" autocomplete="new-password"
                            spellcheck="false">
                        <input type="text" placeholder="Номер телефона" v-model="phone" inputmode="numeric"
                            autocomplete="new-password" spellcheck="false" @input="phone = phone.replace(/\D/g, '')">
                        <input type="text" placeholder="ФИО" v-model="full_name" autocomplete="new-password"
                            spellcheck="false">
                    </div>
                </div>
                <div class="changePayment">
                    <div class="header">
                        <h3 class="num">2</h3>
                        <h3>Выберите способ оплаты</h3>
                    </div>
                    <div class="selectPayment">
                        <div v-for="(payment, index) in paymentMethods" :key="index" class="imgCont"
                            :class="{ selected: selectedPayment === index }" @click="selectPayment(index)">
                            <img :src="payment.img" :alt="payment.name">
                        </div>
                    </div>
                </div>
                <div class="cardInfo">
                    <div class="header">
                        <h3 class="num">3</h3>
                        <h3>Укажите данные карты</h3>
                    </div>
                    <div class="inputCardInfo">
                        <input type="text" placeholder="Номер карточки" name="not-card" maxlength="16"
                            v-model="cardNumber" autocomplete="off" inputmode="numeric" spellcheck="false" required
                            readonly @focus="removeReadonly">
                        <input type="text" placeholder="ФИ" name="not-name" v-model="cardHolder" autocomplete="off"
                            spellcheck="false" required readonly @focus="removeReadonly">
                        <input type="text" placeholder="CVV" name="not-cvv" maxlength="3" v-model="cvv"
                            autocomplete="off" inputmode="numeric" spellcheck="false" required readonly
                            @focus="removeReadonly">
                        <input id="dateCard" type="text" placeholder="ММ/ГГ" name="not-expiry" maxlength="5"
                            v-model="expiryDate" @input="formatExpiryDate" autocomplete="off" inputmode="numeric"
                            spellcheck="false" required readonly @focus="removeReadonly">
                    </div>
                </div>
                <div class="paid">
                    <div class="header">
                        <h3 class="num">4</h3>
                        <h3>Оплата</h3>
                    </div>
                    <div class="policy">
                        <button @click="addBooking">К оплате {{ paramsForBuy.price_per_day
                            * paramsForBuy.count_days * paramsForBuy.users_iins.length}} KZT</button>
                        <p>Проводя оплату вы принимаете нашу политику конфиденциальности и условия сервиса<br>
                            © От 2025, EasyTrip, Halyk, Kaspi, Visa, MasterCard</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-if="loading.active" class="loader">
        <a-spin size="large" />
    </div>
    <Notification :message="notificationMessage"/>
</template>

<script setup>
import { API_URL } from '@/config';
import axios from 'axios';
import { defineProps, defineEmits, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { inject } from 'vue';
import Notification from '../Layouts/Notification.vue';

const loading = inject('loading');
const route = useRoute();
const props = defineProps({
    showModal: Boolean,
    paramsForBuy: Object
});

const notificationMessage = ref('');
const cardNumber = ref('');
const cardHolder = ref('');
const cvv = ref('');
const expiryDate = ref('');
const selectedPayment = ref(null);
const phone = ref('+7');
const email = ref('');
const full_name = ref('');

watch(() => loading.active, (newVal) => {
    document.body.style.overflow = newVal ? 'hidden' : '';
});

watch(phone, (newValue) => {
    let cleaned = newValue.replace(/\D/g, '');
    if (!cleaned.startsWith('7')) {
        cleaned = '7' + cleaned;
    }
    phone.value = '+' + cleaned;
});

const formatExpiryDate = () => {
    let val = expiryDate.value.replace(/\D/g, '');
    if (val.length > 2) {
        val = val.slice(0, 2) + '/' + val.slice(2, 4);
    }
    expiryDate.value = val.slice(0, 5);
};

const emit = defineEmits(['update:showModal']);

const removeReadonly = (event) => {
    event.target.removeAttribute('readonly');
};

const closeModal = () => {
    emit('update:showModal', false);
};

const paymentMethods = ref([
    { name: "Visa", img: "/src/assets/images/icon/footer/Visa.svg" },
    { name: "Kaspi", img: "/src/assets/images/icon/footer/KaspiLogo.svg" },
    { name: "MasterCard", img: "/src/assets/images/icon/footer/MasterCard.svg" },
    { name: "Halyk", img: "/src/assets/images/icon/footer/HalykBankLogo.svg" }
]);

const selectPayment = (index) => {
    selectedPayment.value = index;
};

const validateFields = () => {
    if (!email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        notificationMessage.value = 'Введите корректный email';
        return false;
    }
    if (phone.value.length < 11) {
        notificationMessage.value = 'Введите корректный номер телефона';
        return false;
    }
    if (!full_name.value.trim()) {
        notificationMessage.value = 'Введите ФИО';
        return false;
    }
    if (selectedPayment.value === null) {
        notificationMessage.value = 'Выберите способ оплаты';
        return false;
    }
    if (cardNumber.value.length !== 16) {
        notificationMessage.value = 'Введите корректный номер карты';
        return false;
    }
    if (!cardHolder.value.trim()) {
        notificationMessage.value = 'Введите имя владельца карты';
        return false;
    }
    if (cvv.value.length !== 3) {
        notificationMessage.value = 'Введите корректный CVV';
        return false;
    }
    if (!expiryDate.value.match(/^\d{2}\/\d{2}$/)) {
        notificationMessage.value = 'Введите корректную дату окончания (ММ/ГГ)';
        return false;
    }
    return true;
};

const addBooking = async () => {
    if (!validateFields()) return;

    try {
        const params = {
            card: {
                phone: phone.value,
                email: email.value,
                full_name: full_name.value,
                type: paymentMethods.value[selectedPayment.value].name,
                num_card: cardNumber.value,
                fn_mn_card: cardHolder.value,
                trip_name: route.params.trip_name,
                amount: props.paramsForBuy.price_per_day * props.paramsForBuy.count_days
            },
            data: {
                check_in: props.paramsForBuy.check_in,
                check_out: props.paramsForBuy.check_out,
                users_iins: props.paramsForBuy.users_iins
            }
        };

        const response = await axios.post(`${API_URL}/payment/paid`, params);
        if (response.status === 200) {
            notificationMessage.value = 'Успешная покупка! Вся информация отправлена на указанный email';
            setTimeout(() => { notificationMessage.value = ''; }, 3000);
        }
    } catch (error) {
        notificationMessage.value = 'Ошибка при оплате. Попробуйте позже';
    }
};
</script>


<style scoped>
.overlay-modal {
    background: rgba(0, 0, 0, 0.5);
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

.modal {
    width: 70%;
    height: 70%;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    position: relative;
    padding: 30px;
    z-index: 100;
}

.modal input {
    outline: none;
}

.modal::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    filter: blur(5px);
    opacity: 0.7;
    z-index: -1;
}

.content {
    display: flex;
    flex-direction: column;
    gap: 30px;
}

.contactInfo {
    display: flex;
    flex-direction: column;
    color: #02BF8C;
}

.header {
    display: flex;
    align-items: center;
    color: #02BF8C;
}

.num {
    border: 2px solid #02BF8C;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    border-radius: 100px;
    margin-right: 10px;
}

.inputContact {
    display: flex;
    justify-content: space-between;
    color: black;
}

.inputContact input {
    width: 30%;
    padding: 5px;
    border: 2px solid #028c67;
    border-radius: 10px;
}

.numPhone {
    display: flex;
    align-items: center;
    width: 30%;
}

.numPhone input {
    width: 100%;
    margin-left: 5px;
}

.selectPayment {
    display: flex;
    justify-content: space-between;
}

.selectPayment img {
    height: 70px;
}

.imgCont {
    border-radius: 10px;
    padding: 10px;
    transition: background 0.3s ease-in;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

.imgCont:hover {
    background: #c8c8c8;
}

.selectPayment {
    display: flex;
    justify-content: space-between;
}

.imgCont {
    border-radius: 10px;
    padding: 10px;
    transition: background 0.3s ease-in;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

.imgCont:hover {
    background: #c8c8c8;
}

.selected {
    border: 2px solid #02BF8C;
    background: rgba(2, 191, 140, 0.2);
}

.inputCardInfo {
    display: flex;
    justify-content: space-between;
    color: black;
}

.inputCardInfo input {
    width: 25%;
    padding: 5px;
    border: 2px solid #028c67;
    border-radius: 10px;
}

#dateCard {
    width: 10% !important;
}

.policy {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 10px;
}

.policy button {
    border: none;
    border-radius: 10px;
    background-color: #02BF8C;
    color: white;
    height: 30px;
    width: 50%;
    transition: background 0.3s ease;
}

.policy button:hover {
    background-color: #028c67;
}

.policy p {
    font-size: 12px;
    text-align: center;
}
</style>