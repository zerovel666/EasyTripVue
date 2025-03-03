<template>
    <div v-if="isOpen" class="child-modal-overlay" @click="$emit('close')">
        <div class="child-modal-content" @click.stop>
            <div class="calendar">
      <div class="calendar-header">
        <button @click="prevMonth">&#9664;</button>
        <span>{{ monthYear }}</span>
        <button @click="nextMonth">&#9654;</button>
      </div>
      <div class="calendar-grid">
        <div v-for="day in days" :key="day" class="calendar-day day-name">{{ day }}</div>
        <div v-for="n in firstDayOffset" :key="'empty' + n" class="calendar-day empty"></div>
        <div v-for="date in daysInMonth" :key="date" 
             class="calendar-day" 
             :class="{ 'today': isToday(date), 'selected': date === selectedDate }" 
             @click="selectDate(date)">
          {{ date }}
        </div>
      </div>
    </div>
        </div>
    </div>
</template>


<script setup>
import { watch, onUnmounted,ref ,computed } from 'vue';

const props = defineProps({
    isOpen: Boolean, selectedTrip: Object
});

const now = new Date();
const currentYear = ref(now.getFullYear());
const currentMonth = ref(now.getMonth());
const selectedDate = ref(now.getDate());

const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

const daysInMonth = computed(() => {
  return new Date(currentYear.value, currentMonth.value + 1, 0).getDate();
});

const firstDayOffset = computed(() => {
  const firstDay = new Date(currentYear.value, currentMonth.value, 1).getDay();
  return (firstDay === 0 ? 6 : firstDay - 1);
});

const monthYear = computed(() => {
  return `${monthNames[currentMonth.value]} ${currentYear.value}`;
});

const isToday = (date) => {
  const today = new Date();
  return date === today.getDate() &&
         currentMonth.value === today.getMonth() &&
         currentYear.value === today.getFullYear();
};

const selectDate = (date) => {
  selectedDate.value = date;
};

const prevMonth = () => {
  if (currentMonth.value === 0) {
    currentMonth.value = 11;
    currentYear.value--;
  } else {
    currentMonth.value--;
  }
};

const nextMonth = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0;
    currentYear.value++;
  } else {
    currentMonth.value++;
  }
};

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
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    text-align: center;
}
.calendar {
  width: 100%;
  background: #222;
  color: white;
  border-radius: 10px;
  padding: 10px;
  text-align: center;
  font-family: Arial, sans-serif;
}
.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  padding: 5px;
}
.calendar-header button {
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
}
.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
}
.calendar-day {
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
}
.day-name {
  font-weight: bold;
}
.today {
  background: #0078d7;
}
.selected {
  background: #444;
}
.empty {
  visibility: hidden;
}
</style>