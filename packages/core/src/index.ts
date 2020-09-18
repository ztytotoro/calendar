import { setupHandlers } from 'event';

setupHandlers();

export { getCalendarMonth } from './calendar';
export { createEvent, RepeatTypes, createEvents, parseEvents } from 'event';
export * from 'date-tools';
