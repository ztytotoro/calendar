import { isWorkDay, isWeekend } from './helpers';
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

export type DurationType = Exclude<
    TimeUnits,
    TimeUnits.Weekend | TimeUnits.WorkDay
>;

export interface CalendarDuration {
    type: DurationType;
    value: number;
}

export type CalendarRepeat = Exclude<
    TimeUnits,
    TimeUnits.Hour | TimeUnits.Minute | TimeUnits.Second
>;

export class TimeSpan {
    constructor(public start: Date, public end: Date) {}

    getDays() {
        return Math.round(this.span / 1000 / 3600 / 24);
    }

    get span() {
        return this.end.valueOf() - this.start.valueOf();
    }

    diff() {
        return {
            year: this.end.getFullYear() - this.start.getFullYear(),
            month: this.end.getMonth() - this.start.getMonth(),
            day: this.end.getDate() - this.start.getDate(),
        };
    }
}
