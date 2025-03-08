<template>
    <div class="content">
        <div class="bg-parallax"></div>
        <div class="panel">
            <h1>Таблицы</h1>
            <div class="tables">
                <button v-for="(table, index) in tables" :key="index" @click="getColumnTable(table)">{{ table}}</button>
            </div>
        </div>
        <div class="tableSection">
            <div class="filter" v-if="selectedTable == 'Booking'">
                <div class="input-content dropdown-wrapper">
                    <input type="text" placeholder="Выберите тур для просмотра брони" v-model="searchQuery"
                        @focus="showDropdown = true" @click="searchQuery = ''" />

                    <ul v-if="showDropdown" class="dropdown">
                        <li v-for="option in filteredOptions" :key="option.id" @click="selectOption(option)">
                            {{ option.trip_name }} ({{ option.country_name }})
                        </li>
                    </ul>
                </div>
            </div>
            <div class="tableData">
                <div class="scrollContainer">
                    <div class="columns">
                        <div class="column" v-for="(column, index) in columns" :key="index">
                            {{ column }}
                        </div>
                    </div>
                    <div class="rows" v-for="(rows, index) in dataRowColumn" :key="index">
                        <div class="rowColumn" v-for="(rowColumn, i) in rows" :key="i">
                            {{ rowColumn }}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>


<script setup>
import { API_URL } from '@/config';
import axios from 'axios';
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import Cookies from 'js-cookie';

const router = useRouter();
const tables = ref([]);
const columns = ref([]);
const selectedTable = ref('');
const countries = ref([]);
const showDropdown = ref(false);
const searchQuery = ref("");
const dataRowColumn = ref("")

const checkRole = () => {
    const role = Cookies.get('role');
    if (!role || role !== 'admin') {
        Object.keys(Cookies.get()).forEach(cookie => Cookies.remove(cookie));
        router.push('/login');
    }
};

const getTable = async () => {
    try {
        const response = await axios.get(`${API_URL}/admin/table`);
        tables.value = response.data['data'];
    } catch (error) {
        console.error('Ошибка при загрузке таблиц:', error);
    }
};

const getCountries = async () => {
    try {
        const response = await axios.get(API_URL + "/country/all");
        countries.value = response.data;
    } catch (error) {
        console.error("Ошибка загрузки данных:", error);
    }
};

const filteredOptions = computed(() => {
    if (!searchQuery.value) return countries.value;
    return countries.value.filter(item =>
        item.country_name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        item.city_name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        item.trip_name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
});

onMounted(() => {
    document.addEventListener('click', closeDropdown);
});

onBeforeUnmount(() => {
    document.removeEventListener('click', closeDropdown);
});


const closeDropdown = (event) => {
    if (!event.target.closest('.dropdown-wrapper')) {
        showDropdown.value = false;
    }
};

const getDataColumnForTripName = async (tripName) => {
    const tables = {
        Booking: 'booking',
        Country: 'country'
    };
    const response = await axios.get(`${API_URL}/${tables[selectedTable.value]}/${tripName}`);

    dataRowColumn.value = response.data;
}

const getDataColumn = async () => {
    const tables = {
        Booking: 'booking',
        Country: 'country'
    };
    const response = await axios.get(`${API_URL}/admin/${tables[selectedTable.value]}/data`);

    dataRowColumn.value = response.data;
}

const getColumnTable = async (table) => {
    selectedTable.value = table;
    const tables = {
        Booking: 'booking',
        Country: 'country'
    };
    dataRowColumn.value = '';
    if (table == 'Booking') {
        getCountries();
    } else if(table = 'Country'){
        getDataColumn();
    }

    const response = await axios.get(`${API_URL}/admin/${tables[table]}/column`);
    columns.value = response.data
};

const selectOption = (option) => {
    searchQuery.value = option.trip_name;
    showDropdown.value = false;
    getDataColumnForTripName(option.trip_name);
};

onMounted(() => {
    checkRole();
    getTable();
    window.addEventListener("scroll", () => {
        document.querySelector(".bg-parallax").style.transform = `translateY(${window.scrollY * 0.5}px)`;
    });
});
</script>

<style scoped>
.content {
    display: flex;
    max-height: 100vh;
    height: 100vh;
    width: 100vw;
    margin: auto;
    overflow-y: auto;
}

.panel {
    background-color: #02Bf8c;
    max-width: 30%;
    width: 100%;
    padding: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
    position: relative;
    z-index: 2;
    max-height: 100vh;
    overflow-y: auto;
}

.bg-parallax {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: url('https://source.unsplash.com/random') no-repeat center/cover;
    transform: translateY(0);
    z-index: -1;
}

.tables {
    display: flex;
    align-items: center;
    gap: 30px;
    flex-direction: column;
    width: 100%;
}

.tables button {
    width: 70%;
    height: 40px;
    border-radius: 10px;
    border: none;
    background-color: #008e68;
    color: white;
    transition: transform 0.3s ease;
    cursor: pointer;
}

.panel button:hover {
    transform: scale(1.1);
}

.tableSection {
    flex: 1;
    max-width: 100%;
    width: 100%;
    border: 1px solid black;
    padding: 20px 100px 0 100px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.filter {
    margin-bottom: 10px;
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

.dropdown-wrapper {
    position: relative;
}

.dropdown {
    position: absolute;
    top: 40px;
    left: 0;
    width: 100%;
    background: white;
    border: 1px solid #ccc;
    border-radius: 8px;
    max-height: 200px;
    overflow-y: auto;
    list-style: none;
    padding: 5px 0;
    z-index: 1000;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.dropdown li {
    padding: 10px;
    cursor: pointer;
    transition: background 0.2s ease-in-out;
}

.dropdown li:hover {
    background: #f5f5f5;
}

.tableData {
    max-width: 900px;
    max-height: 500px;
    border: 1px solid black;
    height: 100%;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
}

.scrollContainer {
    width: 100%;
    height: 100%;
    overflow: auto;
}

.columns {
    display: flex;
    width: max-content;
    position: sticky;
    top: 0;
    background: white;
    z-index: 10;
}

.column {
    flex: 1;
    width: 160px;
    text-align: center;
    padding: 10px;
    border: 1px solid black;

}

.rows {
    display: flex;
    width: max-content;
}

.rowColumn {
    width: 160px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 10px;
    border: 1px solid black;
    font-size: 13px;
    overflow: hidden;
}



/* 
    WEB KITS
*/
.panel::-webkit-scrollbar {
    width: 8px;
}

.panel::-webkit-scrollbar-track {
    background: #ffffff33;
    border-radius: 10px;
}

.panel::-webkit-scrollbar-thumb {
    background: #0d8767;
    border-radius: 10px;
}

.panel::-webkit-scrollbar-thumb:hover {
    background: #03c89d;
}

.scrollContainer::-webkit-scrollbar {
    width: 8px;
    height: 3px;
}

.scrollContainer::-webkit-scrollbar-track {
    background: #ffffff33;
}

.scrollContainer::-webkit-scrollbar-thumb {
    background: #0d8767;
}

.scrollContainer::-webkit-scrollbar-thumb:hover {
    background: #03c89d;
}

.dropdown::-webkit-scrollbar {
    width: 6px;
}

.dropdown::-webkit-scrollbar-thumb {
    background-color: #02BF8C;
    border-radius: 10px;
}

.dropdown::-webkit-scrollbar-track {
    background: #f0f0f0;
    border-radius: 10px;
}
</style>