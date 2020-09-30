import { extractDate, getCalendarMonthDates, WeekDay } from 'date-tools';
import { CalendarDate, CalendarEvent, isEventMatch } from 'event';
import { getCalendarWeekDates } from './date-tools/week';

export function getCalendarMonth(
  year: number,
  month: number,
  events: CalendarEvent[] = [],
  startOfWeek: Exclude<
    WeekDay,
    WeekDay.WorkDay | WeekDay.Weekend
  > = WeekDay.Monday
) {
  const days = getCalendarMonthDates(year, month, startOfWeek);
  return days.map((day) => {
    return {
      date: day,
      ...extractDate(day),
      events: events
        .filter((e) => isEventMatch(day, e))
        .sort((a, b) => {
          return (
            a.start.hour * 3600 +
            a.start.minute * 60 +
            a.start.second -
            (b.start.hour * 3600 + b.start.minute * 60 + b.start.second)
          );
        }),
    } as CalendarDate;
  });
}

export function getCalendarWeek(
  date: Date,
  events: CalendarEvent[] = [],
  startOfWeek: Exclude<
    WeekDay,
    WeekDay.WorkDay | WeekDay.Weekend
  > = WeekDay.Monday
) {
  const days = getCalendarWeekDates(date, startOfWeek);
  return days.map((day) => {
    return {
      date: day,
      ...extractDate(day),
      events: events
        .filter((e) => isEventMatch(day, e))
        .sort((a, b) => {
          return (
            a.start.hour * 3600 +
            a.start.minute * 60 +
            a.start.second -
            (b.start.hour * 3600 + b.start.minute * 60 + b.start.second)
          );
        }),
    } as CalendarDate;
  });
}

export function getCalendarDay(date: Date, events: CalendarEvent[] = []) {
  return {
    date: date,
    ...extractDate(date),
    events: events
      .filter((e) => isEventMatch(date, e))
      .sort((a, b) => {
        return (
          a.start.hour * 3600 +
          a.start.minute * 60 +
          a.start.second -
          (b.start.hour * 3600 + b.start.minute * 60 + b.start.second)
        );
      }),
  } as CalendarDate;
}
