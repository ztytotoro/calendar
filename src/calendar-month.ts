import { CalendarDay } from './calendar-day';
import { getMonthDays, lastOf } from './helpers';

export class CalendarMonth {
    #year: number;
    #month: number;
    #days: CalendarDay[] = [];

    constructor(year: number, month: number) {
        this.#year = year;
        this.#month = month;
        this.genDays();
    }

    get days() {
        return [...this.#days];
    }

    get year() {
        return this.#year;
    }

    set year(val: number) {
        if (val !== this.#year) {
            this.#year = val;
            this.genDays();
        }
    }

    get month() {
        return this.#month;
    }

    set month(val: number) {
        if (val !== this.#month) {
            this.#month = val;
            this.genDays();
        }
    }

    private genDays() {
        const days: CalendarDay[] = [];

        const monthDays = getMonthDays(this.year, this.month);

        for (let i = 0; i < monthDays; i++) {
            days.push(new CalendarDay(this.year, this.month, i + 1));
        }

        while (days[0].weekDay > 1) {
            days.unshift(
                new CalendarDay(days[0].year, days[0].month, days[0].day - 1)
            );
        }

        while (lastOf(days).weekDay !== 0) {
            days.push(
                new CalendarDay(
                    lastOf(days).year,
                    lastOf(days).month,
                    lastOf(days).day + 1
                )
            );
        }

        this.#days = days;
    }
}
