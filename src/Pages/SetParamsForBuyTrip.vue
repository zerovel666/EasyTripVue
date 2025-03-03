<template>
    <TopBar />
    <div class="calendar-container">
        <div class="header">
            <button @click="backMonth">&#9659;</button>
            <span>{{ currentMonth }}</span>
            <button @click="nextMonth">&#9660;</button>
        </div>
        <div class="weekdays">
            <span v-for="day in weekdays" :key="day">{{ day }}</span>
        </div>
        <div class="calendar">
            <span v-for="day in paddedDays" :key="day.date" :class="{
                'occupied': day.isOccupied,
                'selected': isSelected(day.date),
                'in-range': isInRange(day.date),
                'last-selected': isLastSelected(day.date), // Добавлено
                'current': day.isToday
            }" @click="selectDate(day)">
                {{ day.display }}
            </span>


        </div>
    </div>
    <Footer />
    <Notification :message="notificationMessage" />
</template>

<script setup>
import { ref, computed } from 'vue';
import axios from 'axios';
import dayjs from 'dayjs';
import { API_URL } from '@/config';
import { useRoute } from 'vue-router';
import TopBar from '@/components/Layouts/TopBar.vue';
import Footer from '@/components/Layouts/Footer.vue';
import Notification from '@/components/Layouts/Notification.vue';

const route = useRoute();
const occupiedDates = ref(new Set());
const selectedRange = ref([]);
const currentDate = ref(dayjs());
const notificationMessage = ref('');

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
    }
}


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
    width: 300px;
    background: #2d2d2d;
    color: white;
    padding: 15px;
    border-radius: 8px;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 18px;
    margin-bottom: 10px;
}

.weekdays {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    font-weight: bold;
}

.calendar {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 5px;
}

.calendar span {
    width: 36px;
    height: 36px;
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

.selected {
    background: green;
}

.selected,
.last-selected {
    background: green !important;
}



.in-range {
    background: rgba(0, 0, 255, 0.5);
}

.current {
    border: 2px solid blue;
}
</style>
