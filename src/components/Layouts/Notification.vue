<template>
    <div v-if="message" class="notification">
        {{ message }}
    </div>
</template>

<script setup>
defineProps({
    message: String,
});
</script>

<style scoped>
.notification {
    position: fixed;
    top: 10px;
    right: 10px;
    background: #02BF8C;
    color: white;
    padding: 10px 30px 10px 30px;
    border-radius: 10px;
    border: 1px solid black;
    z-index: 100000;
    min-height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
