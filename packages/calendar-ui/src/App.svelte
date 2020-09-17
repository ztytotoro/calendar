<script lang="ts">
  import { addMonths, getCalendarMonth } from "calendar-core";

  import { events as mockData } from "./mockData";

  export const height: number | string = "100vh";
  export const width: number | string = "100vw";
  export let events = mockData;

  const now = new Date();

  let year = now.getFullYear();
  let month = now.getMonth() + 1;

  let calendarDateWidth = "160px";

  $: view = getCalendarMonth(year, month, events);

  function prevMonth() {
    const { year: y, month: m } = addMonths({ year, month }, -1);
    year = y;
    month = m;
  }

  function nextMonth() {
    const { year: y, month: m } = addMonths({ year, month }, 1);
    year = y;
    month = m;
  }

  function pad(val: number, len: number, padStr: string) {
    let str = "" + val;
    while (str.length < len) {
      str = padStr + str;
    }
    return str;
  }
</script>

<style>
  .calendar {
    display: grid;
    width: calc((var(--calendar-date-width) + 1px) * 7);
    grid-template-columns: repeat(7, var(--calendar-date-width));
    grid-auto-rows: 130px;
    grid-gap: 1px;
    box-shadow: 0 6.4px 14.4px 0 rgba(0, 0, 0, 0.132),
      0 1.2px 3.6px 0 rgba(0, 0, 0, 0.108);
  }

  .calendar-date {
    box-shadow: 0 0 0 1px rgb(236, 236, 236);
    display: flex;
    flex-direction: column;
    padding: 0;
    transition: ease-in 0.13s;
  }

  .calendar-date:hover {
    background-color: rgba(128, 128, 128, 0.17);
  }
  .calendar-date-text {
    padding: 0 10px;
  }

  .calendar-event {
    color: black;
    background-color: rgb(0, 0, 255, 0.3);
    font-weight: normal;
    display: flex;
    justify-content: space-between;
    position: relative;
    padding: 0 6px;
    align-items: center;
    height: 30px;
    line-height: 30px;
  }

  .calendar-event::before {
    content: "";
    display: block;
    width: 4px;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    background-color: rgb(0, 0, 255, 0.7);
  }

  .grey {
    color: #9a9a9a;
    box-shadow: 0 0 0 1px rgb(230, 230, 230);
    background-color: rgb(243 243 243);
  }

  .grey:hover {
    background-color: rgb(243 243 243);
  }

  .today {
    font-weight: bold;
  }
</style>

<svelte:options tag={null} />
<div>
  <div>
    <input type="number" bind:value={year} />
    <input type="number" bind:value={month} />
  </div>
  <div style="margin: 20px 0">
    <button on:click={prevMonth}> Prev </button>
    <button on:click={nextMonth}> Next </button>
  </div>

  <div class="calendar" style="--calendar-date-width:{calendarDateWidth}">
    {#each view as v}
      <div
        class="calendar-date"
        class:grey={v.date.getMonth() !== now.getMonth()}
        class:today={v.date.getMonth() === now.getMonth() && v.date.getFullYear() === now.getFullYear() && v.date.getDate() === now.getDate()}>
        <p class="calendar-date-text">
          {v.day}&nbsp;日{#if v.date.getMonth() === now.getMonth() && v.date.getFullYear() === now.getFullYear() && v.date.getDate() === now.getDate()}
            &nbsp;📅
          {/if}
        </p>
        {#each v.events as e}
          <div class="calendar-event">
            <span>{pad(e.start.hour, 2, '0')}:{pad(e.start.minute, 2, '0')}:{pad(e.start.second, 2, '0')}</span>
            <span>{e.title}</span>
          </div>
        {/each}
      </div>
    {/each}
  </div>
</div>
