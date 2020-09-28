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
      events: events
        .filter((e) => isEventMatch(day, e))
        .sort((a, b) => {
          return (
            a.start.hour * 3600 +
            a.start.minute * 60 +
            a.start.second -
            (b.start.hour * 3600 + b.start.minute * 60 + b.start.second)
          );
        }),
    } as CalendarDate;
  });
}
