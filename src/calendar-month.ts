import { CalendarDay } from './calendar-day';
import { getMonthDays, lastOf } from './helpers';

export class CalendarMonth {
    private _year: number;
    private _month: number;
    private _days: CalendarDay[] = [];

    constructor(year: number, month: number) {
        this._year = year;
        this._month = month;
        this.genDays();
    }

    get days() {
        return [...this._days];
    }

    get year() {
        return this._year;
    }

    set year(val: number) {
        if (val !== this._year) {
            this._year = val;
            this.genDays();
        }
    }

    get month() {
        return this._month;
    }

    set month(val: number) {
        if (val !== this._month) {
            this._month = val;
            if (this._month < 1) {
                this._month = 12;
                this.year--;
                return;
            }
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

        this._days = days;
    }
}
