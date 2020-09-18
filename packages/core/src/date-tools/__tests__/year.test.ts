import { daysOfYear } from '../year';

describe('year.ts', () => {
  test('daysOfYear', () => {
    expect(daysOfYear(2020)).toBe(366);
  });
});
