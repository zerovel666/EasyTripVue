<template>
    <div class="container">
        <div class="searchBanner">
            <div class="content">
                <h2>Если путешествовать — то с EasyTrip!</h2>
                <p>Бронируйте туры в пару кликов и отправляйтесь в путешествие мечты.</p>
                <button>Найти идеальный тур</button>
            </div>
        </div>
    </div>
    <div class="lineContainer">
        <div class="lineContent">
            <div class="textLineContent">
                <h3>Многообразный выбор</h3>
                <p>Сотни туров по всему миру — найдите тот, <br>что подходит именно вам!</p>
            </div>
            <div class="textLineContent">
                <h3>Необычные маршруты</h3>
                <p>Откройте новые места вместе с опытными <br>гидами и интересными попутчиками.</p>
            </div>
            <div class="textLineContent">
                <h3>Все включено</h3>
                <p>Мы позаботимся обо всём: питание, страховка <br>и комфорт во время поездки.</p>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
.lineContainer {
    padding: 0 10% 0 10%;
    margin: 60px 0 60px 0;
    height: 200px;
    background-color: #02BF8C;
    margin-bottom: 50px;
    color: white;
    position: relative;
    display: flex;
    align-items: center;
}

.lineContent {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between; 
    gap: 5%; 
}

.textLineContent {
    text-align: center;
    flex: 1; 
}


.container {
    margin: 60px 0 60px 0;
}

.searchBanner {
    position: relative;
    height: 300px;
    width: 100%;
    background-image: url('/src/assets/images/MainImages/viewBlock.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    border-radius: 10px;
    overflow: hidden;
}

.searchBanner::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 10px;
}

.content {
    position: relative;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
    cursor: pointer;
}

.content button {
    width: 18%;
    height: 50px;
    font-size: 16px;
    border-radius: 10px;
    color: white;
    background-color: rgba(255, 255, 255, 0.4);
    border: none;
    backdrop-filter: blur(5px);
    transition: transform 0.3s ease;
    cursor: pointer;
}

.content button:hover {
    transform: scale(1.05);
}


.text-content {
    text-align: center;
}

.lineContent h3{
    color: #00f2ff;
} 
</style>