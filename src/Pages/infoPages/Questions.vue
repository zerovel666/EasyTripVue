<template>
    <TopBar />
    <div class="container">
        <h1 class="text-2xl font-bold mb-4">Часто задаваемые вопросы</h1>
        <div v-for="(faq, index) in faqs" :key="index" class="faq-item" @click="toggle(index)" :class="{ 'active': activeIndex === index }">
            <p class="faq-question">
                {{ faq.question }}
                <span class="faq-icon">⬇</span>
            </p>
            <div v-if="activeIndex === index" class="faq-answer">{{ faq.answer }}</div>
        </div>
    </div>
    <Footer />
</template>

<script setup>
import { ref } from 'vue';
import Footer from '@/components/Layouts/Footer.vue';
import TopBar from '@/components/Layouts/TopBar.vue';

const faqs = ref([
    { question: 'Как забронировать поездку?', answer: 'Вы можете оформить бронирование через наш сайт.' },
    { question: 'Какие способы оплаты доступны?', answer: 'Мы принимаем оплату картой и через банковский перевод.' },
    { question: 'Как проверить статус бронирования?', answer: 'Статус можно посмотреть в личном кабинете на сайте.' },
    { question: 'Сколько времени занимает подтверждение бронирования?', answer: 'Обычно подтверждение занимает от нескольких минут до 24 часов.' },
    { question: 'Можно ли изменить даты поездки?', answer: 'Да, свяжитесь с поддержкой, чтобы уточнить возможность изменений.' },
    { question: 'Как связаться с поддержкой?', answer: 'Вы можете написать нам на email или воспользоваться чатом на сайте.' },
    { question: 'Как отменить бронирование?', answer: 'Свяжитесь с нашей поддержкой для отмены бронирования.' },
    { question: 'Какие города доступны для бронирования?', answer: 'Вы можете посмотреть список доступных направлений на сайте.' },
    { question: 'Как получить информацию о месте проживания?', answer: 'Подробное описание и фотографии доступны на странице бронирования.' },
    { question: 'Есть ли дополнительные сборы?', answer: 'Все сборы указываются при оформлении бронирования.' },
    { question: 'Как оформить предзаказ на поездку?', answer: 'Вы можете оставить заявку на сайте, и мы вас уведомим.' },
    { question: 'Можно ли заказать групповую поездку?', answer: 'Да, мы предлагаем групповые туры. Свяжитесь с нами для деталей.' },
    { question: 'Как оставить отзыв о поездке?', answer: 'Вы можете оставить отзыв в личном кабинете после поездки.' },
    { question: 'Как выбрать подходящий маршрут?', answer: 'Используйте фильтры на сайте, чтобы найти подходящую поездку.' },
    { question: 'Можно ли забронировать проживание отдельно?', answer: 'Нет, мы предоставляем только комплексные туры.' },
    { question: 'Какие документы нужны для бронирования?', answer: 'Для бронирования достаточно вашего имени и контактных данных.' },
    { question: 'Как узнать, есть ли свободные места?', answer: 'Актуальная информация о наличии мест указана на сайте.' },
    { question: 'Что делать, если возникли проблемы с поездкой?', answer: 'Свяжитесь с нашей поддержкой, и мы поможем вам.' },
    { question: 'Можно ли перенести поездку на другую дату?', answer: 'Возможность изменения зависит от условий бронирования.' },
    { question: 'Как быстро оформляется возврат?', answer: 'Возврат оформляется в течение 5-10 рабочих дней.' },
    { question: 'Можно ли изменить состав участников поездки?', answer: 'Да, но необходимо уведомить нас заранее.' },
    { question: 'Есть ли мобильное приложение?', answer: 'На данный момент у нас нет мобильного приложения.' },
    { question: 'Можно ли забронировать поездку в другой стране?', answer: 'Да, мы предлагаем международные туры.' },
    { question: 'Как зарегистрироваться на сайте?', answer: 'Вы можете зарегистрироваться, заполнив форму на сайте.' },
    { question: 'Как удалить аккаунт?', answer: 'Напишите в поддержку, и мы удалим ваш аккаунт.' },
    { question: 'Как выбрать подходящее жилье?', answer: 'Бронирование отелей включено в поездку' },
    { question: 'Можно ли получить консультацию перед бронированием?', answer: 'Да, наши специалисты помогут вам выбрать поездку.' }
]);


const activeIndex = ref(null);

const toggle = (index) => {
    activeIndex.value = activeIndex.value === index ? null : index;
};
</script>

<style scoped>
button {
    cursor: pointer;
}
.container {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.faq-item {
    background: #02BF8C;
    color: white;
    padding: 12px;
    border-radius: 8px;
    transition: background 0.3s ease;
    cursor: pointer;
}

.faq-item:hover {
    background: #02976F;
}

.faq-question {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    border: none;
    border-radius: 10px;
}

.faq-answer {
    margin-top: 8px;
    color: #f0f0f0;
    font-size: 14px;
    display: none;
}

.faq-item.active .faq-answer {
    display: block;
}

.faq-icon {
    transition: transform 0.3s ease;
}

.faq-item.active .faq-icon {
    transform: rotate(180deg);
}

</style>
