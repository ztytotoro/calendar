import { defineComponent } from 'vue';
import './App.css';
import { useCalendar } from '@kalender/reactive';
import { events } from './mockData';

const App = defineComponent(() => {
  const calendar = useCalendar(events);
  return () => (
    <div>
      <div>
        <input type="number" v-model={[calendar.year, ['number']]} />
        <input type="number" v-model={[calendar.month, ['number']]} />
      </div>
      <button onClick={calendar.prev}>Prev</button>
      <button onClick={calendar.next}>Next</button>
      <div class="calendar">
        {calendar.view.value.map((v) => (
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
