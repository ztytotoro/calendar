import {
  eraseTime,
  extract,
  getWeekDay,
  isWeekend,
  isWorkDay,
  normalDate,
} from './date';
import { WeekDay } from './definition';
import { addDays, diffTime } from './timespan';
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

export function isNthWeekDay(date: Date, weekDay: WeekDay, rank = 0) {
  const { year, month } = extract(date);
  const diff = diffTime(date, theNthWeekDay(year, month, rank));

  return diff.year === 0 && diff.month === 0 && diff.day === 0;
}

export function nthWeekDay(year: number, month: number) {
  const result: {
    [K: number]: Date[];
  } = {
    [WeekDay.Monday]: [],
    [WeekDay.Tuesday]: [],
    [WeekDay.Wednesday]: [],
    [WeekDay.Thursday]: [],
    [WeekDay.Friday]: [],
    [WeekDay.Saturday]: [],
    [WeekDay.Sunday]: [],
    [WeekDay.WorkDay]: [],
    [WeekDay.Weekend]: [],
  };

  const days = daysOfMonth(year, month);

  for (let day = 1; day <= days; day++) {
    let date = normalDate(year, month, day);
    result[getWeekDay(date)].push(date);
    if (isWorkDay(date)) {
      result[WeekDay.WorkDay].push(date);
    } else {
      result[WeekDay.Weekend].push(date);
    }
  }

  return result;
}

export function theFirstWeekDay(year: number, month: number, weekDay: WeekDay) {
  let date = normalDate(year, month, 1);
  if (weekDay === WeekDay.WorkDay) {
    while (!isWorkDay(date)) {
      date = addDays(date, 1);
    }
  } else if (weekDay === WeekDay.Weekend) {
    while (!isWeekend(date)) {
      date = addDays(date, 1);
    }
  } else {
    while (getWeekDay(date) !== weekDay) {
      date = addDays(date, 1);
    }
  }

  return date;
}

export function theLastWeekDay(year: number, month: number, weekDay: WeekDay) {
  let date = normalDate(year, month + 1, 0);

  if (weekDay === WeekDay.WorkDay) {
    while (!isWorkDay(date)) {
      date = addDays(date, -1);
    }
  } else if (weekDay === WeekDay.Weekend) {
    while (!isWeekend(date)) {
      date = addDays(date, -1);
    }
  } else {
    while (getWeekDay(date) !== weekDay) {
      date = addDays(date, -1);
    }
  }

  return date;
}

export function theNthWeekDay(
  year: number,
  month: number,
  weekDay: WeekDay,
  rank = 0
) {
  if (rank === -1) {
    return theLastWeekDay(year, month, weekDay);
  }
  const weekDays = nthWeekDay(year, month);
  return weekDays[weekDay][rank];
}
