import { Calendar } from '../calendar';
import { createEvent } from '../event';
import { TimeUnits } from '../core';

test('Calendar', () => {
    const calendar = new Calendar();
    calendar.addEvent(
        createEvent(new Date('2020-9-1'))
            .repeatEvery(TimeUnits.Week)
            .setTitle('Task1')
    );
    calendar.addEvent(
        createEvent(new Date('2020-9-5'))
            .repeatEvery(TimeUnits.WorkDay)
            .setTitle('Task2')
    );
    console.log(
        calendar.view
            .filter((d) => d.events.events.length > 0)
            .map((d) => ({
                time: d.date.toDateString(),
                events: d.events.events.map((e) => e.title),
            }))
    );
});
