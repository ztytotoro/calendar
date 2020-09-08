import { getMonthDays, getWeekDay } from './date';

test('test getMonthDays', () => {
    expect(getMonthDays(2020, 2)).toBe(29);
    expect(getMonthDays(2020, 9)).toBe(30);
});

test('test getWeekDay', () => {
    expect(() => getWeekDay(2020, 9, 7)).toBe(1);
    expect(() => getWeekDay(new Date('2020-9-7'))).toBe(1);
    expect(() => getWeekDay(2020, 7, null as any)).toThrow();
});
