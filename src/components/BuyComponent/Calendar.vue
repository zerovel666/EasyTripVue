<template>
    <div class="calendar-container">
        <div class="header">
            <p @click="backMonth">&#9665;</p>
            <span>{{ currentMonth }}</span>
            <p @click="nextMonth">&#9655;</p>

        </div>
        <div class="weekdays">
            <span v-for="day in weekdays" :key="day">{{ day }}</span>
        </div>
        <div class="calendar">
            <span v-for="day in paddedDays" :key="day.date" :class="{
                'selected': isSelected(day.date),
                'in-range': isInRange(day.date),
                'last-selected': isLastSelected(day.date),
                'current': day.isToday,
                'occupied': day.isOccupied  
            }" @click="selectDate(day)">
                {{ day.display }}
            </span>

        </div>
    </div>
    <div v-if="loading.active" class="loader">
        <a-spin size="large" />
    </div>
    <Notification :message="notificationMessage" />

</template>

<script setup>
import { ref, computed } from 'vue';
import axios from 'axios';
import dayjs from 'dayjs';
import { API_URL } from '@/config';
import { useRoute } from 'vue-router';
import Notification from '../Layouts/Notification.vue';
import { inject, watch } from 'vue';

const loading = inject('loading');

const route = useRoute();
const occupiedDates = ref(new Set());
const selectedRange = ref([]);
const currentDate = ref(dayjs());
const notificationMessage = ref('');
const emit = defineEmits(['updateCountDays']);

const weekdays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
const currentMonth = computed(() => currentDate.value.format('MMMM YYYY'));

async function fetchOccupiedDates() {
    try {
        const { data } = await axios.get(`${API_URL}/booking/${route.params.trip_name}`);
        data.forEach(({ check_in, check_out }) => {
            let current = dayjs(check_in);
            const end = dayjs(check_out);
            while (current.isBefore(end) || current.isSame(end, 'day')) {
                occupiedDates.value.add(current.format('YYYY-MM-DD'));
                current = current.add(1, 'day');
            }
        });
    } catch (error) {
        console.error('Ошибка загрузки занятых дат:', error);
    }
}

watch(() => loading.active, (newVal) => {
    if (newVal) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});

const firstDayOffset = computed(() => dayjs(currentDate.value).startOf('month').day() || 7);
const paddedDays = computed(() => {
    const days = [];
    for (let i = 1 - firstDayOffset.value; i <= dayjs(currentDate.value).daysInMonth(); i++) {
        const date = dayjs(currentDate.value).date(i).format('YYYY-MM-DD');
        days.push({
            date,
            display: i > 0 ? i : '',
            isOccupied: occupiedDates.value.has(date),
            isToday: dayjs().isSame(date, 'day')
        });
    }
    return days;
});
function isLastSelected(date) {
    return selectedRange.value.length === 2 && dayjs(date).isSame(selectedRange.value[1], 'day');
}



function selectDate(day) {
    if (!day.display || day.isOccupied) return;

    if (dayjs().isAfter(day.date, 'day')) {
        notificationMessage.value = "Нельзя выбирать прошедшие даты";
        setTimeout(() => {
            notificationMessage.value = '';
        }, 3000);
        return;
    }

    if (selectedRange.value.length === 2) selectedRange.value = [];
    selectedRange.value.push(day.date);
    selectedRange.value.sort();

    if (selectedRange.value.length === 2) {
        const [start, end] = selectedRange.value;
        let current = dayjs(start).add(1, 'day');

        while (current.isBefore(end, 'day')) {
            if (occupiedDates.value.has(current.format('YYYY-MM-DD'))) {
                selectedRange.value = [];
                notificationMessage.value = "Нельзя выбирать занятые даты";
                setTimeout(() => {
                    notificationMessage.value = '';
                }, 3000);
                return;
            }
            current = current.add(1, 'day');
        }
        const countDays = dayjs(end).diff(dayjs(start), 'day') + 1;
        emit('updateCountDays', countDays);
    }
}

function getSelectedDates() {
    return selectedRange.value;
}

defineExpose({ getSelectedDates });


function isSelected(date) {
    return selectedRange.value.includes(date);
}

function isInRange(date) {
    if (selectedRange.value.length === 2) {
        return dayjs(date).isAfter(selectedRange.value[0], 'day') &&
            dayjs(date).isBefore(selectedRange.value[1], 'day') ||
            date === selectedRange.value[1];
    }
    return false;
}


function nextMonth() {
    currentDate.value = currentDate.value.add(1, 'month');
}
function backMonth() {
    currentDate.value = currentDate.value.add(-1, 'month');
}

fetchOccupiedDates();
</script>

<style scoped>
.calendar-container {
    max-width: 400px;
    width: 100%;
    background: #2d2d2d;
    color: white;
    border-radius: 8px;
    padding: 30px;
    max-height: 400px;
}

.header {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.header p {
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25px;
    height: 100%;
    margin: 0;
    cursor: pointer;
}

.header button {
    background: none;
}

.weekdays,
.calendar {
    display: grid;
    grid-template-columns: repeat(7, minmax(30px, 1fr));
    gap: 5px;
}

.calendar span {
    width: 100%;
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    cursor: pointer;
}

.occupied {
    background: rgb(99, 99, 99);
    pointer-events: none;
}

.selected,
.last-selected {
    background: #02BF8C !important;
}

.in-range {
    background: #01906a;
}

.current {
    border: 2px solid blue;
}
</style>