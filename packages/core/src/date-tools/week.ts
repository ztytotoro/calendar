import { addWeekDays, extract, getWeekDay, normalDate } from './date';
import { WeekDay } from './definition';
import { lastOf } from './utils';

export function getCalendarWeekDates(
  date: Date,
  startOfWeek: Exclude<
    WeekDay,
    WeekDay.WorkDay | WeekDay.Weekend
  > = WeekDay.Monday
): Date[] {
  const days = [date];
  while (getWeekDay(days[0]) !== startOfWeek) {
    const day = extract(days[0]);
    days.unshift(normalDate(day.year, day.month, day.day - 1));
  }

  while (getWeekDay(lastOf(days)) !== addWeekDays(startOfWeek, -1)) {
    const day = extract(lastOf(days));
    days.push(normalDate(day.year, day.month, day.day + 1));
  }

  return days;
}

export function addWeeks(date: Date, count: number) {
  const day = extract(date);
  return normalDate(day.year, day.month, day.day + count);
}
