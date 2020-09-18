import { getCalendarMonthDates } from 'date-tools';
import { CalendarDate, CalendarEvent, isEventMatch } from 'event';

export function getCalendarMonth(
  year: number,
  month: number,
  events: CalendarEvent[] = []
) {
  const days = getCalendarMonthDates(year, month);
  return days.map((day) => {
    return {
      date: day,
      day: day.getDate(),
      events: events.filter((e) => isEventMatch(day, e)),
    } as CalendarDate;
  });
}
