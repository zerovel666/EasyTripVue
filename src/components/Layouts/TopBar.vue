<template>
    <div class="container">
        <div class="content-logo">
            <img src="/src/assets/images/icon/Logo.svg" alt="" id="logo">
            <p>EasyTrip</p>
        </div>
        <div class="r-content">
            <div class="input-content">
                <input type="text" placeholder="Куда вы собираетесь поехать?">
                <button>
                    <img src="/src/assets/images/icon/Search.svg" alt="">
                </button>
            </div>
            <p>О проекте •</p>
            <P>Меню •</P>
            <p id="auth">Войти</p>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
.container {
    display: flex;
    justify-content: space-between;
    max-height: 70px;
    align-items: center;
}

.content-logo {
    display: flex;
    justify-content: left;
    align-items: center;
    width: 35%;
    height: 70px;
    cursor: pointer;
}

.content-logo p {
    font-size: 30px;
    margin-left: 5px;
}

#logo {
    height: 50px;
}

.r-content {
    display: flex;
    justify-content: left;
    align-items: center;
    height: 70px;
    width: 75%;
}

.r-content p {
    margin-left: 10px;
    cursor: pointer;
}

.input-content {
    width: 60%;
    display: flex;
    align-items: center;
    position: relative;
}

.input-content input {
    width: 100%;
    height: 35px;
    border-radius: 5px;
    padding-right: 45px;
    border: 1px solid #ccc;
    outline: none;
    padding-left: 10px;
    font-size: 18px;
}

.input-content button {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 40px;
    background-color: #02BF8C;
    border: none;
    cursor: pointer;
    border-radius: 0 5px 5px 0;
    display: flex;
    justify-content: center;
    align-items: center;
}

.input-content button img {
    width: 20px;
}

#auth {
    margin-left: 10%;
}
</style>