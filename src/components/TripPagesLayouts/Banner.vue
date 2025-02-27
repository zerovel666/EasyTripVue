<template>
    <div 
        class="banner" 
        v-if="tripInfo"
        :style="{ backgroundImage: `url(${tripInfo.image_path})` }"
    >
        <div class="overlay">
            <div class="container">
                <h1>{{ tripInfo.description_country.description }}</h1>
                <p>{{ tripInfo.description_country.preview}}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({ tripInfo: Object });
</script>

<style scoped>
.banner {
    color:white;
    position: relative;
    height: 500px;
    background-size: cover;
    background-position: center;
}

.overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5); 
    transition: background 0.3s ease;
    padding: 30px;
    box-sizing: border-box;
}
.container{
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: 100%;
}

</style>
