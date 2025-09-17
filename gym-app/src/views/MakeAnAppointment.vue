<script setup>

import { db } from "../firebase";
import { auth } from "../firebase"; 
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";




import { ref, computed } from 'vue'

const coaches = ["Maria (Yoga)", "Jane (HIIT)", "Alex (Strength)", "Tom (Mobility)","Cristina (Nutrition)","Marko (Conditioning)"]


const today = new Date()
const currentMonth = ref(today.getMonth())
const currentYear = ref(today.getFullYear())
const selectedDay = ref(null)
const weekDays = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]


function firstDayOfMonth(month, year) {
  return new Date(year, month, 1).getDay()
}


function getDaysInMonth(month, year) {
  return new Date(year, month + 1, 0).getDate()
}


const daysInMonth = computed(() => {
  return Array.from({length: getDaysInMonth(currentMonth.value, currentYear.value)}, (_, i) => i+1)
})

const blankDays = computed(() => firstDayOfMonth(currentMonth.value, currentYear.value))

const monthName = computed(() => new Date(currentYear.value, currentMonth.value).toLocaleString('default', { month: 'long' }))


function prevMonth() {
  if(currentMonth.value === 0) {
    currentMonth.value = 11
    currentYear.value--
  } else currentMonth.value--
}

function nextMonth() {
  if(currentMonth.value === 11) {
    currentMonth.value = 0
    currentYear.value++
  } else currentMonth.value++
}




const baseSlots = [
  { hour: "08:00", capacity: 5, coach: "" },
  { hour: "10:00", capacity: 3, coach: "" },
  { hour: "12:00", capacity: 5, coach: "" },
  { hour: "16:00", capacity: 2, coach: "" },
  { hour: "18:00", capacity: 4, coach: "" },
]

const timeslots = ref([])

async function bookSlot(slot) {
  if (slot.capacity > 0) {
    if (!slot.coach) {
      alert("Please select a coach!");
      return;
    }

    try {
      await addDoc(collection(db, "appointments"), {
        date: `${selectedDay.value}-${currentMonth.value + 1}-${currentYear.value}`,
        hour: slot.hour,
        coach: slot.coach,
        createdAt: new Date()
      });

      slot.capacity--;
      alert(`Booked ${slot.hour} with ${slot.coach}`);
    } catch (e) {
      console.error("Error saving appointment: ", e);
      alert("Could not save appointment. Try again.");
    }
    try {
  const userId = auth.currentUser ? auth.currentUser.uid : null;

  await addDoc(collection(db, "appointments"), {
    userId,
    date: `${selectedDay.value}-${currentMonth.value + 1}-${currentYear.value}`,
    hour: slot.hour,
    coach: slot.coach,
    createdAt: new Date()
  });

  // then update UI
} catch (e) {
  console.error("Error saving appointment: ", e);
}
  }
}


async function selectDay(day) {
  selectedDay.value = day;
  timeslots.value = baseSlots.map(s => ({ ...s }));

  const q = query(
    collection(db, "appointments"),
    where("date", "==", `${day}-${currentMonth.value + 1}-${currentYear.value}`)
  );
  const snapshot = await getDocs(q);

  snapshot.forEach(doc => {
    const booked = doc.data();
    const slot = timeslots.value.find(s => s.hour === booked.hour);
    if (slot) {
      slot.capacity = Math.max(0, slot.capacity - 1);
    }
  });
}


</script>



<template>
  <div class="container my-5">
    <h2 class="mb-4 text-center">Book Your Gym Appointment</h2>


    <div class="d-flex justify-content-between align-items-center mb-3">
      <button class="btn btn-light" @click="prevMonth">&lt;</button>
      <h4 class="mb-0">{{ monthName }} {{ currentYear }}</h4>
      <button class="btn btn-light" @click="nextMonth">&gt;</button>
    </div>

    <div class="calendar-grid">
      <div class="calendar-day-name" v-for="day in weekDays" :key="day">{{ day }}</div>

      <div 
        v-for="blank in blankDays" 
        :key="'b'+blank" 
        class="calendar-day empty"
      ></div>

      <div 
        v-for="day in daysInMonth" 
        :key="day" 
        class="calendar-day" 
        :class="{ selected: selectedDay === day }"
        @click="selectDay(day)"
      >
        {{ day }}
      </div>
    </div>

    <!-- Time slots -->
    <div v-if="selectedDay" class="mt-4">
      <h4 class="mb-3">Available Slots for {{ selectedDay }} {{ monthName }}</h4>
      <div class="row g-3">
        <div 
          v-for="slot in timeslots" 
          :key="slot.hour" 
          class="col-md-4"
        >
          <div 
            class="slot-card p-3 d-flex flex-column justify-content-between"
            :class="{ full: slot.capacity === 0 }"
          >
            <div>
              <strong>{{ slot.hour }}</strong>
            </div>
            <div class="my-2">
              <label class="form-label mb-1">Coach:</label>
              <select v-model="slot.coach" class="form-select">
                <option disabled value="">Select</option>
                <option v-for="c in coaches" :key="c" :value="c">{{ c }}</option>
              </select>
            </div>
            <div class="d-flex justify-content-between align-items-center">
              <span v-if="slot.capacity === 0" class="text-danger fw-bold">Full</span>
              <button 
                v-else 
                class="btn btn-success btn-sm"
                @click="bookSlot(slot)"
              >
                Book ({{ slot.capacity }} left)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<style scoped>
.container {
  max-width: 900px;
}


.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
}

.calendar-day-name {
  text-align: center;
  font-weight: 600;
  padding: 5px 0;
  background: #f0f0f0;
}

.calendar-day {
  background: #ffffff;
  border: 1px solid #ddd;
  height: 60px;
  text-align: center;
  line-height: 60px;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 500;
}

.calendar-day:hover {
  background: #f8f9fa;
}

.calendar-day.selected {
  background: #fd7e14;
  color: white;
}

.calendar-day.empty {
  background: transparent;
  border: none;
  cursor: default;
}


.slot-card {
  background: #f8f9fa;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: all 0.2s;
}

.slot-card.full {
  opacity: 0.6;
  pointer-events: none;
}
</style>
