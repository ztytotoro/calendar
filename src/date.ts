import { isNumbers } from './type';

export function getMonthDays(year: number, month: number) {
    return new Date(year, month, 0).getDate();
}

export function getWeekDay(date: Date): number;
export function getWeekDay(year: number, month: number, day: number): number;
export function getWeekDay(a: number | Date, b?: number, c?: number) {
    const list = [a, b, c];
    if (isNumbers(list)) {
        return new Date(list[0], list[1] - 1, list[2]).getDay();
    } else if (a instanceof Date) {
        return a.getDay();
    }

    throw new Error('UnSupported params');
}

export interface CalendarMonth {
    year: number;
    month: number;
    days: any[];
}

export class CalendarDay {
    events: CalendarEvent[] = [];
    constructor(public readonly date: Date) {}

    get year() {
        return this.date.getFullYear();
    }

    get month() {
        return this.date.getMonth() + 1;
    }

    get day() {
        return this.date.getDate();
    }

    get weekDay() {
        return this.date.getDay();
    }

    get isWorkDay() {
        return isWorkDay(this.date);
    }

    get isWeekend() {
        return isWeekend(this.date);
    }
}

export interface CalendarEvent {
    start: CalendarDay;
    end?: CalendarDay;
    duration?: CalendarDuration;
    repeat?: CalendarRepeat;
}

export interface CalendarDuration {
    type: Exclude<TimeUnits, TimeUnits.Weekend | TimeUnits.WorkDay>;
    value: number;
}

export type CalendarRepeat = Exclude<
    TimeUnits,
    TimeUnits.Hour | TimeUnits.Minute | TimeUnits.Second
>;

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

export function addTimeDuration(time: Date, duration: CalendarDuration) {
    const newTime = new Date(time);
    switch (duration.type) {
        case TimeUnits.Year:
            newTime.setFullYear(newTime.getFullYear() + duration.value);
            break;
        case TimeUnits.Month:
            newTime.setMonth(newTime.getMonth() + duration.value);
            break;
        case TimeUnits.Week:
            newTime.setDate(newTime.getDate() + 7 * duration.value);
            break;
        case TimeUnits.Day:
            newTime.setDate(newTime.getDate() + duration.value);
            break;
        case TimeUnits.Hour:
            newTime.setHours(newTime.getHours() + duration.value);
            break;
        case TimeUnits.Minute:
            newTime.setMinutes(newTime.getMinutes() + duration.value);
            break;
        case TimeUnits.Second:
            newTime.setSeconds(newTime.getSeconds() + duration.value);
            break;
    }

    return newTime;
}

export function addEvent(date: CalendarDay, event: CalendarEvent) {
    if (date.date < event.start.date) return;
    if (event.end && date.date > event.end.date) return;
    if (event.duration) {
        const end = addTimeDuration(event.start.date, event.duration);
        if (date.date > end) {
            return;
        }
    }
    if (
        !isDefined<CalendarRepeat>(event.repeat) &&
        event.start.date.toDateString() !== date.date.toDateString()
    ) {
        return;
    }

    if (
        isDefined<CalendarRepeat>(event.repeat) &&
        !isEventMatch(date, event.start, event.repeat)
    ) {
        return;
    }

    date.events.push(event);
}

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

export function isEventMatch(
    date: CalendarDay,
    eventStart: CalendarDay,
    repeat: CalendarRepeat
) {
    if (repeat === TimeUnits.Day) {
        return true;
    }
    if (repeat === TimeUnits.WorkDay) {
        return date.isWorkDay;
    }
    if (repeat === TimeUnits.Weekend) {
        return date.isWeekend;
    }
    if (repeat === TimeUnits.Week) {
        return date.weekDay === eventStart.weekDay;
    }
    if (repeat === TimeUnits.Month) {
        return date.day === eventStart.day;
    }
    if (repeat === TimeUnits.Year) {
        return date.month === eventStart.month && date.day === eventStart.day;
    }
    return false;
}

export function isWorkDay(date: Date) {
    const day = date.getDay();
    return day >= 1 && day <= 5;
}

export function isWeekend(date: Date) {
    const day = date.getDay();
    return day >= 6 && day <= 7;
}

export function isDefined<T>(val: unknown): val is T {
    return val !== undefined && val !== null;
}
