import {
    CalendarRepeat,
    TimeUnits,
    CalendarDuration,
    DurationType,
} from './core';
import {
    isWorkDay,
    isWeekend,
    getWeekDay,
    getMonthDay,
    getMonth,
} from './helpers';

export class CalendarEvent {
    #id = Symbol();
    #start: Date;
    #end?: Date;
    #duration?: CalendarDuration;
    #repeat?: CalendarRepeat;
    #title?: string;
    #description?: string;

    get id() {
        return this.#id;
    }

    get start() {
        return this.#start;
    }

    get end() {
        return this.#end;
    }

    get duration() {
        return this.#duration;
    }

    get repeat() {
        return this.#repeat;
    }

    get title() {
        return this.#title;
    }

    get description() {
        return this.#description;
    }

    constructor(start: Date) {
        this.#start = start;
    }

    startWhen(date: Date) {
        this.#start = date;
    }

    endWhen(date: Date) {
        this.#end = date;
        return this;
    }

    repeateEvery(duration: CalendarRepeat) {
        this.#repeat = duration;
        return this;
    }

    last(value: number, type: DurationType) {
        this.#duration = {
            value,
            type,
        };
        return this;
    }

    setTitle(text: string) {
        this.#title = text;
        return this;
    }

    setDescription(text: string) {
        this.#description = text;
    }
}

export function isEventMatch(
    date: Date,
    eventStart: Date,
    repeat: CalendarRepeat
) {
    if (repeat === TimeUnits.Day) {
        return true;
    }
    if (repeat === TimeUnits.WorkDay) {
        return isWorkDay(date);
    }
    if (repeat === TimeUnits.Weekend) {
        return isWeekend(date);
    }
    if (repeat === TimeUnits.Week) {
        return getWeekDay(date) === getWeekDay(eventStart);
    }
    if (repeat === TimeUnits.Month) {
        return getMonthDay(date) === getMonthDay(eventStart);
    }
    if (repeat === TimeUnits.Year) {
        return (
            getMonth(date) === getMonth(eventStart) &&
            getMonthDay(date) === getMonthDay(eventStart)
        );
    }
    return false;
}

export function createEvent(start: Date) {
    return new CalendarEvent(start);
}

export class EventSets {
    #eventMap = new Map<Symbol, CalendarEvent>();

    add(event: CalendarEvent) {
        if (!this.#eventMap.has(event.id)) {
            this.#eventMap.set(event.id, event);
        }
    }

    get events() {
        return Array.from(this.#eventMap.values());
    }
}
