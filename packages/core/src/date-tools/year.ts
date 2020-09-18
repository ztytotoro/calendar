import { normalDate } from './date';

export function daysOfYear(year: number) {
  const start = normalDate(year, 1, 1);
  const end = normalDate(year + 1, 1, 1);

  return (end.valueOf() - start.valueOf()) / 1000 / 3600 / 24;
}
