<template>
    <footer>
        <div class="line"></div>
        <div class="container">
            <div class="content">
                <div class="l-content">
                    <div class="link-social">
                        <h3>Социальные сети</h3>
                        <div class="button-link">
                            <button :style="{
                                backgroundImage: hoverInstagram
                                    ? 'url(/src/assets/images/icon/footer/InstagramHover.svg)'
                                    : 'url(/src/assets/images/icon/footer/InstagramStatic.svg)'
                            }" @mouseover="hoverInstagram = true" @mouseleave="hoverInstagram = false"></button>

                            <button :style="{
                                backgroundImage: hoverTelegram
                                    ? 'url(/src/assets/images/icon/footer/TelegramHover.svg)'
                                    : 'url(/src/assets/images/icon/footer/TelegramStatic.svg)'
                            }" @mouseover="hoverTelegram = true" @mouseleave="hoverTelegram = false"></button>
                            <img src="/src/assets/images/icon/footer/qr.svg" alt="">
                        </div>
                        <p>Узнавайте о новинках в наших соцсетях</p>
                    </div>
                    <div class="bottom-l-content">
                        <div class="link-pages">
                            <h3>Полезные ссылки</h3>
                            <p>Туры</p>
                            <p>Вакансии</p>
                            <p>О проекте</p>
                        </div>
                        <div id="legal-info">
                            <p>© 2025, EasyTrip. пр. Аль-Фараби 77/8, Алматы, Казахстан</p><br>
                            <div class="payCards">
                                <img src="/src/assets/images/icon/footer/Visa.svg" alt="">
                                <img src="/src/assets/images/icon/footer/KaspiLogo.svg" alt="">
                                <img src="/src/assets/images/icon/footer/MasterCard.svg" alt="">
                                <img src="/src/assets/images/icon/footer/HalykBankLogo.svg" alt="">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="r-content">
                    <div class="l-block">
                        <div class="travelers">
                            <h3>Путешествинникам</h3>
                            <p>Частые вопросы</p>
                            <p>Условия пользования</p>
                            <p>Политика конфиденциальности</p>
                            <p>Политика возврата</p>
                            <p>Безопасность платежей</p>
                        </div>
                        <div class="partners">
                            <h3>Партнерам</h3>
                            <p>Стать партнером</p>
                            <p>Правила партнерства</p>
                        </div>
                    </div>
                    <div class="r-block">
                        <h3>Поддержка</h3>
                        <p>Telegram</p>
                        <p>WhatsApp</p>
                        <p>+7 706 666 66 66</p>
                        <p>+7 728 654 66 66</p>
                    </div>
                </div>

            </div>
        </div>
    </footer>
</template>

<script setup>
import { ref } from 'vue';

const hoverInstagram = ref(false);
const hoverTelegram = ref(false);
</script>

<style scoped>
footer {
    margin-bottom: 20px;
}

.content {
    display: flex;
}

h3 {
    margin: 20px 0 20px 0;
}

.line {
    margin: 50px 0;
    height: 0.1px;
    border: 1px solid rgba(0, 0, 0, 0.144);
}

.button-link {
    display: flex;
    gap: 20px;
}

.button-link img {
    width: 60px;
    height: 60px;
}

.payCards {
    display: flex;
    gap: 20px;
}

.payCards img {
    width: 40px;
}

.l-content {
    width: 50%;
    display: flex;
    flex-direction: column;
    gap: 100px;
}

.l-content button {
    width: 60px;
    height: 60px;
    background-color: transparent;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    border: none;
    cursor: pointer;
    outline: none;
}

.bottom-l-content p {
    cursor: pointer;
}

.r-content {
    display: flex;
    justify-content: center;
    gap: 30px;
    width: 50%;
}

#legal-info {
    font-size: 13px;
}

.l-block {
    width: 50%;
    display: flex;
    flex-direction: column;
    gap: 40px;
    display: flex;
    flex-direction: column;
}

.r-block {
    display: flex;
    flex-direction: column;
}

.l-block p {
    cursor: pointer;
}

.r-block p {
    cursor: pointer;
}
</style>
