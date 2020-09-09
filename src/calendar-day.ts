import { CalendarEvent, isEventMatch, EventSets } from './event';
import { isWorkDay, isWeekend, addTimeDuration, isDefined } from './helpers';
import { CalendarRepeatTypes } from './core';
import { isNumbers } from './type';

export class CalendarDay {
    readonly date: Date;
    readonly events = new EventSets();
    constructor();
    constructor(date: Date);
    constructor(year: number, month: number, day: number);
    constructor(a?: Date | number, b?: number, c?: number) {
        const list = [a, b, c];
        if (a instanceof Date) {
            this.date = a;
        } else if (isNumbers(list)) {
            this.date = new Date(list[0], list[1] - 1, list[2]);
        } else {
            this.date = new Date();
        }
    }

    get year() {
        return this.date.getFullYear();
    }

    get month() {
        return this.date.getMonth() + 1;
    }

    get day() {
        return this.date.getDate();
    }

    get weekDay() {
        return this.date.getDay();
    }

    get isWorkDay() {
        return isWorkDay(this.date);
    }

    get isWeekend() {
        return isWeekend(this.date);
    }
}

export function addEvent(date: CalendarDay, event: CalendarEvent) {
    if (date.date < event.start) return;
    if (event.end && date.date > event.end) return;
    if (event.duration) {
        const end = addTimeDuration(event.start, event.duration);
        if (date.date > end) {
            return;
        }
    }
    if (
        !isDefined<CalendarRepeatTypes>(event.repeat) &&
        event.start.toDateString() !== date.date.toDateString()
    ) {
        return;
    }

    if (
        isDefined<CalendarRepeatTypes>(event.repeat) &&
        !isEventMatch(date.date, event.start, event.repeat)
    ) {
        return;
    }

    date.events.add(event);
}

export function addEvents(date: CalendarDay, events: CalendarEvent[]) {
    events.forEach((event) => addEvent(date, event));
}
