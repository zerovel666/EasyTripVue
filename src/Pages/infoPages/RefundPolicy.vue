<template>
    <TopBar />
    <div class="container">
        <section class="refund-policy">
            <h2>Политика возврата</h2>
            <p>Мы стремимся предоставить лучший сервис нашим клиентам. Если вам необходимо отменить бронирование, ознакомьтесь с нашей политикой возврата:</p>
            <ul>
                <li>Отмена за 14 дней до поездки — полный возврат.</li>
                <li>Отмена за 7 дней до поездки — возврат 50% стоимости.</li>
                <li>Отмена менее чем за 7 дней — возврат невозможен.</li>
            </ul>
            <p>Для запроса возврата, пожалуйста, свяжитесь с нашей службой поддержки.</p>
        </section>
    </div>
    <Footer />
</template>

<script setup>
import Footer from '@/components/Layouts/Footer.vue';
import TopBar from '@/components/Layouts/TopBar.vue';
</script>

<style scoped>
.refund-policy {
    max-width: 800px;
    margin: 20px auto;
    padding: 20px;
    background: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.refund-policy h2 {
    margin-bottom: 10px;
}
.refund-policy ul {
    list-style: disc;
    padding-left: 20px;
}
</style>