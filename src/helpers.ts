import { isNumbers, isNumber } from './type';
import { TimeUnits, CalendarDuration, TimeSpan } from './core';

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

export function getMonthDay(date: Date) {
    return date.getDate();
}

export function getMonth(date: Date) {
    return date.getMonth() + 1;
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

export function lastOf<T>(list: T[]) {
    return list[list.length - 1];
}

export function range(count: number): number[];
export function range(from: number, end: number): number[];
export function range(a: number, b?: number) {
    if (isNumber(a) && isNumber(b)) {
        return Array(Math.abs(b - a) + 1)
            .fill(0)
            .map((_, i) => a + i * getSign(a, b));
    } else {
        return Array(a)
            .fill(0)
            .map((_, i) => i);
    }
}

function getSign(a: number, b: number) {
    return (b - a) / Math.abs(b - a);
}

export function daysOf(ms: number) {
    return Math.floor(ms / 1000 / 3600 / 24);
}

export function weeksOf(ms: number) {
    return Math.floor(ms / 1000 / 3600 / 24 / 7);
}

export function toPositiveInt(value: number) {
    if (value < 1) {
        value = 1;
    }
    return Math.round(value);
}

export function isEqual(a: number, b: number) {
    return (b - a) * Math.pow(10, 6) < 1;
}

export function isRepeated(
    timeSpan: TimeSpan,
    type: TimeUnits.Year | TimeUnits.Month | TimeUnits.Week | TimeUnits.Day,
    times: number
) {
    const diff = timeSpan.diff();
    const isValid = (a: number, b: number) => {
        if (b === -1) return true;
        return isEqual(a / b, b);
    };
    switch (type) {
        case TimeUnits.Year:
            return (
                diff.day === 0 && diff.month === 0 && isValid(diff.year, times)
            );
        case TimeUnits.Month:
            return diff.day === 0 && isValid(timeSpan.getMonths(), times);
        case TimeUnits.Week:
            return diff.weekDay === 0 && isValid(timeSpan.getWeeks(), times);
        case TimeUnits.Day:
            return isValid(timeSpan.getDays(), times);
        default:
            return false;
    }
}
