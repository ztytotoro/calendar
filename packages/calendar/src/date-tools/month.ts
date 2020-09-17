import { extract, getWeekDay, normalDate } from './date';
import { lastOf } from './utils';

export function daysOfMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

export function getMonthDates(year: number, month: number): Date[] {
  const days: Date[] = [];
  for (let i = 0; i < daysOfMonth(year, month); i++) {
    days.push(normalDate(year, month, i + 1));
  }
  return days;
}

export function getCalendarMonthDates(year: number, month: number): Date[] {
  const days = getMonthDates(year, month);

  while (getWeekDay(days[0]) > 1) {
    const day = extract(days[0]);
    days.unshift(normalDate(day.year, day.month, day.day - 1));
  }

  while (getWeekDay(lastOf(days)) !== 7) {
    const day = extract(lastOf(days));
    days.push(normalDate(day.year, day.month, day.day + 1));
  }

  return days;
}

export function addMonths(
  {
    year,
    month,
  }: {
    year: number;
    month: number;
  },
  count: number
) {
  const { year: y, month: m } = extract(new Date(year, month + count - 1));
  return {
    year: y,
    month: m,
  };
}