<template>
    <div class="container">
        <h2>Все включено!</h2>
        <div class="content">
            <p>
                Откройте для себя лучшие <b>отели</b> с системой «всё включено» вместе с EasyTrip! Мы подбираем комфортные и
                современные курорты, где вас ждут удобные номера, разнообразные развлечения и высокий уровень сервиса.
                Расслабьтесь и наслаждайтесь отдыхом, пока отель заботится о вашем комфорте. EasyTrip делает выбор
                идеального отеля простым и удобным!
            </p>
            <img src="/src/assets/images/MainImages/hotel.png" alt="">
        </div>
        <div class="content">
            <img src="/src/assets/images/MainImages/eat.png" alt="">
            <p>
                Отправляйтесь в <b>мир вкусов</b> вместе с EasyTrip! Мы подбираем отели с лучшими ресторанными сервисами, где
                вас ждут изысканные блюда, свежие продукты и разнообразие кухонь мира. Наслаждайтесь завтраками с видом
                на океан, ужинами при свечах и гастрономическими открытиями без лишних забот. EasyTrip делает ваш отдых
                вкусным!
            </p>
        </div>
        <div class="content">
            <p>
                Путешествуйте без тревог вместе с EasyTrip! Мы подбираем надежные <b>страховые программы</b>, которые защитят
                вас от неожиданных ситуаций в поездке. Медицинская помощь, отмена рейса, потеря багажа — мы поможем вам
                чувствовать себя уверенно в любой точке мира. Отдыхайте спокойно, зная, что EasyTrip всегда на вашей
                стороне!
            </p>
            <img src="/src/assets/images/MainImages/insurance.png" alt="">
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
.container {
    margin-top: 60px;
}

h2 {
    text-align: center;
}

.content {
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 30px;
    margin-top: 30px;
    background: linear-gradient(45deg, blue, #02BF8C 60%);
    box-sizing: border-box;
    border-radius: 10px;
    color: white;
    padding: 30px;
}

@keyframes gradientAnimation {
    0% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%;
    }
}

.content {
    background: linear-gradient(45deg, rgb(56, 56, 255), #02BF8C 60%);
    background-size: 200% 200%;
    animation: gradientAnimation 6s ease infinite;
}

.content img {
    width: 40%;
    border-radius: 10px;
}

.content p {
    line-height: 30px;
}
</style>