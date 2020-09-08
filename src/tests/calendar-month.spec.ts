import { CalendarMonth } from '../calendar-month';
import { range } from '../helpers';

test('CalendarMonth', () => {
    const month = new CalendarMonth(2020, 9);

    expect(month.days.map((day) => day.day)).toEqual([
        31,
        ...range(1, 30),
        1,
        2,
        3,
        4,
    ]);

    month.month++;

    expect(month.days.map((day) => day.day)).toEqual([
        28,
        29,
        30,
        ...range(1, 31),
        1,
    ]);
});
