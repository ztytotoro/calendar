import { isWorkDay, isWeekend, daysOf, weeksOf } from './helpers';
import { CalendarEvent } from './event';

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
    value: number;
}

export type CalendarRepeatTypes = Exclude<
    TimeUnits,
    TimeUnits.Hour | TimeUnits.Minute | TimeUnits.Second
>;

export interface CalendarRepeat {
    type: CalendarRepeatTypes;
    value: number;
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

    getWeeks() {
        return weeksOf(this.span);
    }

    getMonths() {
        const { year, month } = this.diff();
        return Math.abs(year * 12 + month);
    }

    get span() {
        return Math.abs(this.end.valueOf() - this.start.valueOf());
    }

    diff() {
        return {
            year: this.end.getFullYear() - this.start.getFullYear(),
            month: this.end.getMonth() - this.start.getMonth(),
            weekDay: this.end.getDay() - this.start.getDay(),
            day: this.end.getDate() - this.start.getDate(),
        };
    }
}
