import { eraseTime } from 'date-tools';
import { CalendarEvent, CalendarRepeat, RepeatTypes } from './definition';

export function createEvent<T extends RepeatTypes>(
  option: Omit<CalendarEvent, 'repeat' | 'id'>,
  repeat: CalendarRepeat<T>
): CalendarEvent {
  Object.defineProperty(option, 'id', {
    value: Symbol(),
  });

  repeat.start = eraseTime(repeat.start);
  Object.defineProperty(option, 'repeat', {
    value: repeat,
  });

  return option as CalendarEvent;
}
