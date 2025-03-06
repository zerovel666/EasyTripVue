<template>
    <TopBar />
    <div class="container">
        <h1 class="title">О нас</h1>
        <p class="description">
            EasyTrip — это ваш надежный помощник в организации незабываемых путешествий.
            Мы создаем удобные инструменты для планирования маршрутов, поиска лучших предложений
            и бронирования всего необходимого для комфортного отдыха.
        </p>

        <div class="content">
            <div class="card">
                <h2>Наша миссия</h2>
                <p>
                    Мы стремимся сделать путешествия проще и доступнее, предоставляя
                    современные инструменты и персонализированные рекомендации.
                </p>
            </div>

            <div class="card">
                <h2>Почему выбирают нас?</h2>
                <p>
                    - Удобный интерфейс и продуманный функционал.<br>
                    - Доступ к эксклюзивным предложениям и скидкам.<br>
                    - Надежная поддержка 24/7.
                </p>
            </div>
            <div class="card">
                <h2>Попробуйте наш сервис!</h2>
                <p>Выберите направление и мы подберем для вас лучшие предложения.</p>
            </div>
        </div>


    </div>
    <Footer />
</template>

<script setup>
import { ref } from 'vue';
import Footer from '@/components/Layouts/Footer.vue';
import TopBar from '@/components/Layouts/TopBar.vue';

</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 50px;
    width: 100%;
}

.title {
    font-size: 3rem;
    font-weight: bold;
    margin-bottom: 20px;
}

.description {
    font-size: 1.2rem;
    max-width: 800px;
    color: #666;
    margin-bottom: 40px;
}

.content {
    display: flex;
    gap: 50px;
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;
}

.card {
    background-color: #02BF8C;
    color: white;
    padding: 20px;
    border-radius: 10px;
    width: 300px;
    text-align: left;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.card h2 {
    margin-bottom: 10px;
    font-size: 1.5rem;
}

.card p {
    font-size: 1rem;
    color: white;
}
</style>