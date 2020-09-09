import { repeat, TimeUnits } from '../core';
import { isEventMatch } from '../event';
import { Fn } from './helper';

test(Fn`isEventMatch`, () => {
    const eventStart = new Date('2020-7-25 15:30');
    const date = new Date('2020-9-9 10:50');
    expect(
        isEventMatch(date, eventStart, repeat(TimeUnits.WorkDay))
    ).toBeTruthy();
    expect(
        isEventMatch(
            new Date('2020-9-14 15:30'),
            new Date('2020-9-9 10:50'),
            repeat(TimeUnits.WorkDay, -1, 2)
        )
    ).toBeFalsy();
    expect(
        isEventMatch(
            new Date('2020-9-15 15:30'),
            new Date('2020-9-9 10:50'),
            repeat(TimeUnits.WorkDay, -1, 2)
        )
    ).toBeTruthy();
    expect(
        isEventMatch(
            new Date('2020-9-12 15:30'),
            new Date('2020-9-9 10:50'),
            repeat(TimeUnits.Weekend)
        )
    ).toBeTruthy();
    expect(
        isEventMatch(
            new Date('2020-9-12 15:30'),
            new Date('2020-9-9 10:50'),
            repeat(TimeUnits.Weekend, 0)
        )
    ).toBeFalsy();
    expect(
        isEventMatch(
            new Date('2020-9-12 15:30'),
            new Date('2020-9-9 10:50'),
            repeat(TimeUnits.Weekend, 2, 2)
        )
    ).toBeFalsy();
    expect(
        isEventMatch(
            new Date('2020-9-11 15:30'),
            new Date('2020-9-9 10:50'),
            repeat(TimeUnits.Weekend)
        )
    ).toBeFalsy();
});
