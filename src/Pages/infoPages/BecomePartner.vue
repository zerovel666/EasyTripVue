<template>
    <TopBar />
    <div class="become-partner">
        <h1>Партнерство с EasyTrip</h1>
        <p>Мы приглашаем к сотрудничеству туристические агентства, отели и гидов. Ознакомьтесь с нашими условиями и свяжитесь с нашим менеджером.</p>
        
        <div class="become-partner__rules">
            <h2>Правила партнерства</h2>
            <ul>
                <li>Вы должны предоставлять качественные услуги в сфере туризма.</li>
                <li>Все сделки проходят через нашу платформу для безопасности клиентов.</li>
                <li>Комиссия за услуги обсуждается индивидуально.</li>
                <li>Обратная связь и поддержка клиентов являются приоритетом.</li>
            </ul>
        </div>
        
        <div class="become-partner__contact">
            <h2>Свяжитесь с нашим менеджером</h2>
            <p>Оставьте заявку, и наш менеджер свяжется с вами в ближайшее время.</p>
            <button @click="contactManager" class="become-partner__button">Связаться</button>
        </div>
    </div>
    <Footer />
</template>

<script setup>
import Footer from '@/components/Layouts/Footer.vue';
import TopBar from '@/components/Layouts/TopBar.vue';

const contactManager = () => {
    console.log('Запрос на связь с менеджером');
    // Логика связи с менеджером
};
</script>

<style scoped>
.become-partner {
    max-width: 800px;
    margin: 20px auto;
    padding: 20px;
    background: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    text-align: center;
}

.become-partner h1 {
    margin-bottom: 10px;
    font-size: 24px;
    font-weight: bold;
}

.become-partner__rules, .become-partner__contact {
    text-align: left;
    margin-top: 20px;
}

.become-partner__rules h2, .become-partner__contact h2 {
    font-size: 20px;
    margin-bottom: 10px;
}

.become-partner__rules ul {
    list-style: disc;
    padding-left: 20px;
}

.become-partner__button {
    background: #02Bf8c;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: background 0.3s;
    margin-top: 10px;
}

.become-partner__button:hover {
    background: #0056b3;
}
</style>
