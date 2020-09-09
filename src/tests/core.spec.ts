import { isRepeated, repeat, TimeSpan, TimeUnits } from '../core';
import { Class, Fn, Member } from './helper';

describe(Class`TimeSpan`, () => {
    const start1 = new Date('2020-9-1 15:30');
    const end1 = new Date('2020-9-9 10:50');
    const span1 = new TimeSpan(start1, end1);

    const start2 = new Date('2020-7-25 15:30');
    const end2 = new Date('2020-9-9 10:50');
    const span2 = new TimeSpan(start2, end2);

    test(Member`span`, () => {
        expect(span1.span).toBe(Math.abs(start1.valueOf() - end1.valueOf()));
    });
    test(Member`getDays`, () => {
        expect(span1.getDays()).toBe(7);
        expect(span2.getDays()).toBe(45);
    });
    test(Member`getWeeks`, () => {
        expect(span1.getWeeks()).toBe(1);
        expect(span2.getWeeks()).toBe(6);
    });
    test(Member`getMonths`, () => {
        expect(span1.getMonths()).toBe(0);
        expect(span2.getMonths()).toBe(1);
    });
    test(Member`getWorkDays`, () => {
        expect(span1.getWorkDays()).toBe(6);
    });
    test(Member`getWeekendDays`, () => {
        expect(span1.getWeekendDays()).toBe(2);
    });
    test(Member`diff`, () => {
        expect(span1.diff()).toEqual({
            year: 0,
            month: 0,
            weekDay: 1,
            day: 8,
        });
        expect(span2.diff()).toEqual({
            year: 0,
            month: 2,
            weekDay: -3,
            day: -16,
        });
    });
});

test(Fn`isRepeated`, () => {
    const start = new Date('2020-7-25 15:30');
    const end = new Date('2020-9-9 10:50');
    const span = new TimeSpan(start, end);
    expect(isRepeated(span, TimeUnits.Day, 46)).toBeTruthy();
    expect(isRepeated(span, TimeUnits.Day, 45)).toBeFalsy;
    expect(isRepeated(span, TimeUnits.Day, 48, 3)).toBeFalsy;
    expect(isRepeated(span, TimeUnits.Week, 6)).toBeFalsy();
    expect(isRepeated(span, TimeUnits.Week, 100)).toBeFalsy();
});

test(Fn`repeat`, () => {
    expect(repeat(TimeUnits.Day)).toEqual({
        type: TimeUnits.Day,
        interval: 1,
        times: -1,
    });
    expect(repeat(TimeUnits.Day, -50)).toEqual({
        type: TimeUnits.Day,
        interval: 1,
        times: -1,
    });
    expect(repeat(TimeUnits.Day, -50, 0)).toEqual({
        type: TimeUnits.Day,
        interval: 1,
        times: -1,
    });
    expect(repeat(TimeUnits.Day, 20, 5)).toEqual({
        type: TimeUnits.Day,
        interval: 5,
        times: 20,
    });
});
