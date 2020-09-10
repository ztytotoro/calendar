import { EventSets, CalendarEvent } from './event';
import { CalendarDay, addEvents } from './calendar-day';
import { CalendarMonth } from './calendar-month';
import { CalendarViewTypes, TimeUnits } from './core';

export class Calendar {
    readonly events = new EventSets();
    readonly today = new CalendarDay();
    readonly monthView = new CalendarMonth(this.today.year, this.today.month);
    viewType: CalendarViewTypes = TimeUnits.Month;

    get view(): CalendarDay[] {
        const days = this.monthView.days;
        days.forEach((day) => addEvents(day, this.events.events));
        return days;
    }

    nextMonth() {
        this.monthView.month++;
    }

    prevMonth() {
        this.monthView.month--;
    }

    addEvent(event: CalendarEvent) {
        this.events.add(event);
    }
}
