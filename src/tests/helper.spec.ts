import { TimeUnits } from '../core';
import {
    getMonth,
    getMonthDay,
    getMonthDays,
    increaseSign,
    getWeekDay,
    isDefined,
    isWeekend,
    isWorkDay,
    lastOf,
    range,
    daysOf,
    weeksOf,
    toPositiveInt,
    isEqual,
    addTimeDuration,
} from '../helpers';
import { Fn } from './helper';

test(Fn`isWorkDay`, () => {
    expect(isWorkDay(new Date('2020-9-9'))).toBeTruthy();
    expect(isWorkDay(new Date('2020-9-12'))).toBeFalsy();
});

test(Fn`isWorkDay`, () => {
    expect(isWeekend(new Date('2020-9-9'))).toBeFalsy();
    expect(isWeekend(new Date('2020-9-12'))).toBeTruthy();
    expect(isWeekend(new Date('2020-9-13'))).toBeTruthy();
});

test(Fn`isDefined`, () => {
    expect(isDefined(null)).toBeFalsy();
    expect(isDefined(undefined)).toBeFalsy();
    expect(isDefined('')).toBeTruthy();
});

test(Fn`getMonthDays`, () => {
    expect(getMonthDays(2020, 9)).toBe(30);
    expect(getMonthDays(2020, 2)).toBe(29);
    expect(getMonthDays(2020, 10)).toBe(31);
});

test(Fn`getWeekDay`, () => {
    expect(getWeekDay(new Date('2020-9-9'))).toBe(3);
    expect(getWeekDay(2020, 9, 9)).toBe(3);
    expect(getWeekDay(2020, 9, 13)).toBe(0);
});

test(Fn`getMonthDay`, () => {
    expect(getMonthDay(new Date('2020-9-9'))).toBe(9);
    expect(getMonthDay(new Date('2020-10-1'))).toBe(1);
});

test(Fn`getMonth`, () => {
    expect(getMonth(new Date('2020-9-9'))).toBe(9);
    expect(getMonth(new Date('2020-10-1'))).toBe(10);
});

test(Fn`lastOf`, () => {
    expect(lastOf([])).toBe(undefined);
    expect(lastOf([1, 2, 3, 4])).toBe(4);
    expect(lastOf([1, 2, 3, ''])).toBe('');
});

test(Fn`range`, () => {
    expect(range(5)).toEqual([0, 1, 2, 3, 4]);
    expect(range(10, 14)).toEqual([10, 11, 12, 13, 14]);
});

test(Fn`increaseSign`, () => {
    expect(increaseSign(10, 5)).toBe(-1);
    expect(increaseSign(10, 20)).toBe(1);
    expect(increaseSign(10, 10)).toBe(0);
});

test(Fn`daysOf`, () => {
    expect(
        daysOf(
            new Date('2020-9-15 14:00:00').valueOf() -
                new Date('2020-9-11 12:00:00').valueOf()
        )
    ).toBe(4);
    expect(
        daysOf(
            new Date('2020-9-15 14:00:00').valueOf() -
                new Date('2020-9-11 16:00:00').valueOf()
        )
    ).toBe(3);
});

test(Fn`weeksOf`, () => {
    expect(
        weeksOf(
            new Date('2020-9-15 14:00:00').valueOf() -
                new Date('2020-9-11 12:00:00').valueOf()
        )
    ).toBe(0);
    expect(
        weeksOf(
            new Date('2020-9-15 14:00:00').valueOf() -
                new Date('2020-9-1 16:00:00').valueOf()
        )
    ).toBe(1);
    expect(
        weeksOf(
            new Date('2020-9-15 14:00:00').valueOf() -
                new Date('2020-9-1 14:00:00').valueOf()
        )
    ).toBe(2);
});

test(Fn`toPositiveInt`, () => {
    expect(toPositiveInt(0)).toBe(1);
    expect(toPositiveInt(-9)).toBe(1);
    expect(toPositiveInt(10.5)).toBe(11);
    expect(toPositiveInt(9.2)).toBe(9);
});

test(Fn`isEqual`, () => {
    expect(isEqual(0.1 + 0.2, 0.3)).toBeTruthy();
    expect(isEqual(10 / 3, (1 / 3) * 10)).toBeTruthy();
    expect(isEqual(10 / 3, 0.333333)).toBeFalsy();
});

test(Fn`addTimeDuration`, () => {
    const time = new Date('2020-9-9 10:39');
    expect(
        addTimeDuration(time, {
            count: 5,
            type: TimeUnits.Day,
        })
    ).toEqual(new Date('2020-9-14 10:39'));
    expect(
        addTimeDuration(time, {
            count: 2,
            type: TimeUnits.Month,
        })
    ).toEqual(new Date('2020-11-9 10:39'));
    expect(
        addTimeDuration(time, {
            count: 2,
            type: TimeUnits.Week,
        })
    ).toEqual(new Date('2020-9-23 10:39'));
    expect(
        addTimeDuration(time, {
            count: 2,
            type: TimeUnits.Year,
        })
    ).toEqual(new Date('2022-9-9 10:39'));
});
