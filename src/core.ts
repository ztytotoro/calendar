import { daysOf, weeksOf, isEqual, toPositiveInt } from './helpers';

export enum TimeUnits {
    Year = 'Year',
    Month = 'Month',
    Week = 'Week',
    WorkDay = 'WorkDay',
    Weekend = 'Weekend',
    Day = 'Day',
    Hour = 'Hour',
    Minute = 'Minute',
    Second = 'Second',
}

export type CalendarViewTypes = TimeUnits.Week | TimeUnits.Month;

export interface CalendarMonth {
    year: number;
    month: number;
    days: any[];
}

export type DurationTypes = Exclude<
    TimeUnits,
    TimeUnits.Weekend | TimeUnits.WorkDay
>;

export interface CalendarDuration {
    type: DurationTypes;
    count: number;
}

export type CalendarRepeatTypes = Exclude<
    TimeUnits,
    TimeUnits.Hour | TimeUnits.Minute | TimeUnits.Second
>;

export interface CalendarRepeat {
    type: CalendarRepeatTypes;
    interval: number;
    times: number;
}

export class TimeSpan {
    constructor(
        public start: Date,
        public end: Date,
        public readonly ignoreTime = false
    ) {
        if (ignoreTime) {
            this.start = new Date(
                this.start.getFullYear(),
                this.start.getMonth(),
                this.start.getDate()
            );
            this.end = new Date(
                this.end.getFullYear(),
                this.end.getMonth(),
                this.end.getDate()
            );
        }
    }

    getDays() {
        return daysOf(this.span);
    }

    getWorkDays() {}

    getWeekendDays() {}

    getWeeks() {
        return weeksOf(this.span);
    }

    getMonths() {
        const { year, month, day } = this.diff();
        return Math.abs(year * 12 + month) + (day < 0 ? -1 : 0);
    }

    get span() {
        return Math.abs(this.end.valueOf() - this.start.valueOf());
    }

    diff() {
        const endWithSunday = (value: number) => (value === 0 ? 7 : value);
        return {
            year: this.end.getFullYear() - this.start.getFullYear(),
            month: this.end.getMonth() - this.start.getMonth(),
            weekDay:
                endWithSunday(this.end.getDay()) -
                endWithSunday(this.start.getDay()),
            day: this.end.getDate() - this.start.getDate(),
        };
    }
}

export function isRepeated(
    timeSpan: TimeSpan,
    type: TimeUnits.Year | TimeUnits.Month | TimeUnits.Week | TimeUnits.Day,
    times: number,
    interval: number = 1
) {
    const diff = timeSpan.diff();
    const isValid = (v: number, i: number, t: number) => {
        if (t === -1) return v % i === 0;
        return v <= t * i;
    };
    switch (type) {
        case TimeUnits.Year:
            return (
                diff.day === 0 &&
                diff.month === 0 &&
                isValid(diff.year, interval, times)
            );
        case TimeUnits.Month:
            return (
                diff.day === 0 && isValid(timeSpan.getMonths(), interval, times)
            );
        case TimeUnits.Week:
            return (
                diff.weekDay === 0 &&
                isValid(timeSpan.getWeeks(), interval, times)
            );
        case TimeUnits.Day:
            return isValid(timeSpan.getDays(), interval, times);
        default:
            return false;
    }
}

export function repeat(
    type: CalendarRepeatTypes,
    times: number = -1,
    interval: number = 1
): CalendarRepeat {
    if (times < 0 && times !== -1) {
        times = -1;
    }
    return {
        type,
        times: times,
        interval: toPositiveInt(interval),
    };
}
