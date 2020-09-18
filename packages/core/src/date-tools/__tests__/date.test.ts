import { dayOfYear, normalDate } from '../date';

describe('date.ts', () => {
  test('dayOfYear', () => {
    expect(dayOfYear(normalDate(2020, 1, 30))).toBe(30);
    expect(dayOfYear(normalDate(2020, 2, 5))).toBe(36);
  });
});
