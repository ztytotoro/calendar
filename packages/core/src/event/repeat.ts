import { eraseTime, isDefined } from 'date-tools';
import { CalendarEvent, CalendarRepeatFn, RepeatTypes } from './definition';

const handlers = new Map<RepeatTypes, CalendarRepeatFn<any>>();

export function isEventMatch(date: Date, event: CalendarEvent) {
  date = eraseTime(date);
  const { repeat } = event;
  const start = eraseTime(repeat.start);

  if (date < start) {
    return false;
  }
  if (isDefined(repeat.end)) {
    const end = eraseTime(repeat.end);
    if (date > end) {
      return false;
    }
  }

  const handler = handlers.get(repeat.type);

  if (handler && handler(date, repeat)) return true;
  return false;
}

export function registerHandler<T extends RepeatTypes>(
  type: T,
  handler: CalendarRepeatFn<T>
) {
  handlers.set(type, handler);
}
