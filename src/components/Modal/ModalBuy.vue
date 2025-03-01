<template>
    <div v-if="isOpen" class="child-modal-overlay" @click="$emit('close')">
        <div class="child-modal-content" @click.stop>
            <h2>Дочерняя модалка</h2>
            <p>Тут контент...</p>
            <button @click="$emit('close')">Закрыть</button>
        </div>
    </div>
</template>


<script setup>
import { watch, onUnmounted } from 'vue';

const props = defineProps({ isOpen: Boolean });

watch(
    () => props.isOpen,
    (newValue) => {
        document.body.style.overflow = newValue ? 'hidden' : 'auto';
    },
    { immediate: true }
);

onUnmounted(() => {
    document.body.style.overflow = 'auto';
});
</script>



<style scoped>
.child-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1100;
}

.child-modal-content {
    width: 600px;
    height: 300px;
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    text-align: center;
}
</style>