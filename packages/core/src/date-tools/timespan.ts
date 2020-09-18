import { extract, getWeekDay } from './date';
import { WeekDay, WeekDays, WeekendDays, WorkDays } from './definition';
import { diff } from './utils';

export function diffTime(d1: Date, d2: Date) {
  return diff(extract(d1), extract(d2));
}

export function daysOf(ms: number) {
  return Math.floor(ms / 1000 / 3600 / 24);
}

export function weeksOf(ms: number) {
  return Math.floor(ms / 1000 / 3600 / 24 / 7);
}

export function daysBetween(start: Date, end: Date) {
  return daysOf(end.valueOf() - start.valueOf()) + 1;
}

export function weeksBetween(start: Date, end: Date) {
  while (getWeekDay(start) !== 1) {
    start = addDays(start, -1);
  }
  while (getWeekDay(end) !== 7) {
    end = addDays(end, 1);
  }
  return Math.floor(daysBetween(start, end) / 7);
}

export function weekDaysBetween(start: Date, end: Date, days: WeekDay[]) {
  let count = 0;
  while (getWeekDay(start) !== 1) {
    if (days.includes(getWeekDay(start))) count++;
    start = addDays(start, 1);
  }
  while (getWeekDay(end) !== 7) {
    if (days.includes(getWeekDay(end))) count++;
    end = addDays(end, -1);
  }
  count += (daysBetween(start, end) / 7) * weekDayFilter(days).length;
  return count;
}

export function workDaysBetween(start: Date, end: Date) {
  return weekDaysBetween(start, end, WorkDays);
}

export function weekendDaysBetween(start: Date, end: Date) {
  return weekDaysBetween(start, end, WeekendDays);
}

export function addDays(date: Date, count: number) {
  const newDate = new Date(date.valueOf());
  newDate.setDate(newDate.getDate() + count);
  return newDate;
}

export function isWeekDay(number: number): number is WeekDay {
  return WeekDays.includes(number as WeekDay);
}

export function weekDayFilter(days: number[]) {
  const set = new Set<WeekDay>();
  for (const day of days) {
    if (isWeekDay(day)) {
      set.add(day);
    }
  }
  return Array.from(set);
}
