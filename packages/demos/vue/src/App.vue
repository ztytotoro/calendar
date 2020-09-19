<script lang="ts" setup>
import { computed, reactive } from 'vue';
import { addMonths, getCalendarMonth } from '@kalender/core';
import { events } from './mockData';

const now = new Date();

export const current = reactive({
  year: now.getFullYear(),
  month: now.getMonth() + 1,
});

export const view = computed(() =>
  getCalendarMonth(current.year, current.month, events)
);

export function prevMonth() {
  const { year, month } = addMonths(current, -1);
  current.year = year;
  current.month = month;
}

export function nextMonth() {
  const { year, month } = addMonths(current, 1);
  current.year = year;
  current.month = month;
}
</script>

<template>
  <div>
    <div>
      <input type="number" v-model.number="current.year" />
      <input type="number" v-model.number="current.month" />
    </div>
    <button @click="prevMonth">
      Prev
    </button>
    <button @click="nextMonth">
      Next
    </button>
    <div class="calendar">
      <div v-for="(v, i) in view" :key="i">
        <p>{{ v.day }}</p>
        <p v-for="(e, i) in v.events" :key="i">{{ e.title }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.calendar {
  display: grid;
  grid-template-columns: repeat(7, 160px);
  grid-auto-rows: 130px;
}
</style>
