import { eraseTime, Time } from 'date-tools';
import { CalendarEvent, CalendarRepeat, RepeatTypes } from './definition';

export function createEvent<T extends RepeatTypes>(
  option: Omit<CalendarEvent, 'repeat' | 'id'>,
  repeat: CalendarRepeat<T>
): CalendarEvent {
  repeat.start = eraseTime(repeat.start);
  return {
    id: Symbol(),
    title: option.title,
    description: option.description,
    start: option.start,
    end: option.end,
    repeat: repeat,
    customData: option.customData || null,
  };
}

export function createEvents(
  options: {
    id?: Symbol;
    title: string;
    description?: string;
    start: Time;
    end: Time;
    repeat: {
      start: Date | string;
      end?: Date | string;
    };
    customData?: any;
  }[]
): CalendarEvent[] {
  return options.map((x) => {
    x.repeat.start = new Date(x.repeat.start);
    if (x.repeat.end) {
      x.repeat.end = new Date(x.repeat.end);
    }
    x.id = Symbol();
    return x as CalendarEvent;
  });
}

export function parseEvents(events: string): CalendarEvent[] {
  try {
    return createEvents(JSON.parse(events));
  } catch (error) {
    return [];
  }
}
