import { WeekDay } from './definition';

export function isWorkDay(date: Date) {
  const day = date.getDay();
  return day >= 1 && day <= 5;
}

export function isWeekend(date: Date) {
  const day = date.getDay();
  return day === 6 || day === 0;
}

export function getWeekDay(date: Date) {
  const day = date.getDay();
  return day === 0 ? 7 : (day as WeekDay);
}

export function getMonth(date: Date) {
  return date.getMonth() + 1;
}

export function eraseTime(date: Date) {
  const { year, month, day } = extract(date);
  return normalDate(year, month, day);
}

export function extract(date: Date) {
  return {
    year: date.getFullYear(),
    month: getMonth(date),
    day: date.getDate(),
    weekDay: getWeekDay(date),
    dayOfYear: dayOfYear(date),
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds(),
  };
}

export function normalDate(year: number, month: number, day: number = 1) {
  return new Date(year, month - 1, day);
}

export function dayOfYear(date: Date) {
  const firstDay = normalDate(date.getFullYear(), 1, 1);

  return (date.valueOf() - firstDay.valueOf()) / 1000 / 3600 / 24 + 1;
}
