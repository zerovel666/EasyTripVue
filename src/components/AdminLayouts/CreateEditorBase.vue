<template>
    <div class="content-overlay" v-if="showModal" @click="closeModal">
        <div class="content" @click.stop>
            
        </div>
    </div>
</template>

<script>
import { defineProps, defineEmits } from 'vue';
defineProps({
    showModal: Boolean
});
</script>

<style scoped>
.content-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
}

.content {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    height: 650px;
    width: 800px;
    z-index: 1000;
    overflow-y: auto;
}
</style>