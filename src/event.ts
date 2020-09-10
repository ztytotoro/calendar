import {
    CalendarRepeatTypes,
    TimeUnits,
    CalendarDuration,
    DurationTypes,
    CalendarRepeat,
    TimeSpan,
    isRepeated,
} from './core';
import {
    isWorkDay,
    isWeekend,
    isDefined,
    toPositiveInt,
    isEqual,
} from './helpers';
import { isNumber } from './type';

export interface ICalendarEvent {
    id: Symbol;
    start: Date;
    end?: Date;
    duration?: CalendarDuration;
    repeat?: CalendarRepeat;
    title?: string;
    description?: string;
}

export class CalendarEvent implements ICalendarEvent {
    private _id = Symbol();
    private _start: Date;
    private _end?: Date;
    private _duration?: CalendarDuration;
    private _repeat?: CalendarRepeat;
    private _title?: string;
    private _description?: string;

    get id() {
        return this._id;
    }

    get start() {
        return this._start;
    }

    get end() {
        return this._end;
    }

    get duration() {
        return this._duration;
    }

    get repeat() {
        return this._repeat;
    }

    get title() {
        return this._title;
    }

    get description() {
        return this._description;
    }

    constructor(start: Date) {
        this._start = start;
    }

    startWhen(date: Date) {
        this._start = date;
    }

    endWhen(date: Date) {
        this._end = date;
        return this;
    }

    repeatEvery(
        interval: number,
        duration: CalendarRepeatTypes,
        times?: number
    ): this;
    repeatEvery(duration: CalendarRepeatTypes, times?: number): this;
    repeatEvery(
        a: number | CalendarRepeatTypes,
        b?: CalendarRepeatTypes | number,
        c?: number
    ) {
        if (isNumber(a) && isDefined<CalendarRepeatTypes>(b)) {
            this._repeat = {
                interval: toPositiveInt(a),
                type: b,
                times: isNumber(c) ? c : -1,
            };
        } else if (isDefined<CalendarRepeatTypes>(a)) {
            this._repeat = {
                interval: 1,
                type: a,
                times: isNumber(c) ? c : -1,
            };
        } else {
            throw new Error('Unsupported arguments');
        }

        return this;
    }

    last(value: number, type: DurationTypes) {
        this._duration = {
            count: toPositiveInt(value),
            type,
        };
        return this;
    }

    setTitle(text: string) {
        this._title = text;
        return this;
    }

    setDescription(text: string) {
        this._description = text;
    }
}

export function isEventMatch(
    date: Date,
    eventStart: Date,
    repeat: CalendarRepeat
) {
    if (date < eventStart) {
        return false;
    }
    const span = new TimeSpan(eventStart, date, true);
    switch (repeat.type) {
        case TimeUnits.Day: {
            if (repeat.times === -1) {
                return span.getDays() % repeat.interval === 0;
            } else {
                return isEqual(span.getDays() / repeat.interval, repeat.times);
            }
        }
        case TimeUnits.WorkDay:
            return (
                isWorkDay(date) &&
                isRepeated(
                    span,
                    TimeUnits.WorkDay,
                    repeat.times,
                    repeat.interval
                )
            );
        case TimeUnits.Weekend:
            return (
                isWeekend(date) &&
                isRepeated(
                    span,
                    TimeUnits.Weekend,
                    repeat.times,
                    repeat.interval
                )
            );
        case TimeUnits.Week:
        case TimeUnits.Month:
        case TimeUnits.Year:
            return isRepeated(span, repeat.type, repeat.times, repeat.interval);
        default:
            return false;
    }
}

export function createEvent(start: Date) {
    return new CalendarEvent(start);
}

export class EventSets {
    _eventMap = new Map<Symbol, CalendarEvent>();

    add(event: CalendarEvent) {
        if (!this._eventMap.has(event.id)) {
            this._eventMap.set(event.id, event);
        }
    }

    get events() {
        return Array.from(this._eventMap.values());
    }
}

type EventOption = Omit<ICalendarEvent, 'id'>;

export function createEvents(options: EventOption[]) {
    return options.map((option) => {
        const event = createEvent(option.start);
        if (option.end) {
            event.endWhen(option.end);
        }
        if (option.duration) {
            event.last(option.duration.count, option.duration.type);
        }
        if (option.repeat) {
            event.repeatEvery(
                option.repeat.interval,
                option.repeat.type,
                option.repeat.times
            );
        }
        if (option.title) {
            event.setTitle(option.title);
        }
        if (option.description) {
            event.setDescription(option.description);
        }
        return event;
    });
}
