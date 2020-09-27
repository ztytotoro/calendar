import { WeekDay } from '../definition';
import { nthWeekDay } from '../month';

describe('month module', () => {
    test('nthWeekDay', () => {
        expect(nthWeekDay(2020, 9)).toEqual({
            [WeekDay.Monday]: [7, 14, 21, 28],
            [WeekDay.Tuesday]: [1, 8, 15, 22, 29],
            [WeekDay.Wednesday]: [2, 9, 16, 23, 30],
            [WeekDay.Thursday]: [3, 10, 17, 24],
            [WeekDay.Friday]: [4, 11, 18, 25],
            [WeekDay.Saturday]: [5, 12, 19, 26],
            [WeekDay.Sunday]: [6, 13, 20, 27],
            [WeekDay.WorkDay]: [5, 6, 12, 13, 19, 20, 26, 27],
            [WeekDay.Weekend]: [
                1,
                2,
                3,
                4,
                7,
                8,
                9,
                10,
                11,
                14,
                15,
                16,
                17,
                18,
                21,
                22,
                23,
                24,
                25,
                28,
                29,
                30,
            ],
        });
    });
});
