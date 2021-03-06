import { dayOfYear, eraseTime, addWeekDays, normalDate } from '../date';

describe('date.ts', () => {
  test('normalDate', () => {
    expect(normalDate(2020, 1, 30)).toEqual(new Date('2020-1-30'));
  });

  test('dayOfYear', () => {
    expect(dayOfYear(normalDate(2020, 1, 30))).toBe(30);
    expect(dayOfYear(normalDate(2020, 2, 5))).toBe(36);
  });

  test('eraseTime', () => {
    expect(eraseTime(new Date('2020-10-1 10:00:00'))).toEqual(
      new Date('2020-10-1 00:00:00')
    );
    expect(dayOfYear(normalDate(2020, 2, 5))).toBe(36);
  });

  test('nextWeekDay', () => {
    expect(addWeekDays(7, 1)).toBe(1);
    expect(addWeekDays(7, -1)).toBe(6);
    expect(addWeekDays(7, -7)).toBe(7);
    expect(addWeekDays(7, 8)).toBe(1);
  });
});
