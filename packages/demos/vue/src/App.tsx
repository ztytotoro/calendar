import { computed, defineComponent, reactive } from 'vue';
import {
  addMonths,
  getCalendarMonth,
  createEvent,
  RepeatTypes,
} from '@kalender/core';
import './App.css';

const App = defineComponent(() => {
  const now = new Date();

  const current = reactive({
    year: now.getFullYear(),
    month: now.getMonth() + 1,
  });

  const events = [
    createEvent(
      {
        title: '吔💩',
        description: '真香',
        start: {
          hour: 12,
          minute: 0,
          second: 0,
        },
        end: {
          hour: 12,
          minute: 0,
          second: 0,
        },
      },
      {
        type: RepeatTypes.Interval,
        start: new Date(),
        times: 4,
        interval: 4,
      }
    ),
    createEvent(
      {
        title: '开🚗',
        description: '真xuan',
        start: {
          hour: 12,
          minute: 0,
          second: 0,
        },
        end: {
          hour: 12,
          minute: 0,
          second: 0,
        },
      },
      {
        type: RepeatTypes.DayOfWeek,
        start: new Date(),
        days: [1, 2, 3],
        times: 5,
        weeks: 5,
        interval: 3,
      }
    ),
    createEvent(
      {
        title: '看😎',
        description: 'Happy',
        start: {
          hour: 12,
          minute: 0,
          second: 0,
        },
        end: {
          hour: 12,
          minute: 0,
          second: 0,
        },
      },
      {
        type: RepeatTypes.DayOfMonth,
        start: new Date('2020-1-1'),
        days: [1, 2, 3, 31],
        months: [1, 2, 3, 10],
        times: 11,
      }
    ),
    createEvent(
      {
        title: '🎂每年',
        description: 'Haha',
        start: {
          hour: 12,
          minute: 0,
          second: 0,
        },
        end: {
          hour: 12,
          minute: 0,
          second: 0,
        },
      },
      {
        type: RepeatTypes.MonthDay,
        start: new Date('2020-6-6'),
        month: 6,
        day: 5,
        interval: 2,
        times: 1,
      }
    ),
  ];

  const view = computed(() =>
    getCalendarMonth(current.year, current.month, events)
  );

  return () => (
    <div>
      <div>
        <input type="number" v-model={[current.year, ['number']]} />
        <input type="number" v-model={[current.month, ['number']]} />
      </div>
      <button
        onClick={() => {
          const { year, month } = addMonths(current, -1);
          current.year = year;
          current.month = month;
        }}
      >
        Prev
      </button>
      <button
        onClick={() => {
          const { year, month } = addMonths(current, 1);
          current.year = year;
          current.month = month;
        }}
      >
        Next
      </button>
      <div class="calendar">
        {view.value.map((v) => (
          <div>
            <p>{v.day}</p>
            {v.events.map((e) => (
              <p>{e.title}</p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
});

export default App;
