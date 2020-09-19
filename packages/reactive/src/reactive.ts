import { ref, computed, Ref, ComputedRef } from 'vue';
import { addMonths, extract, getCalendarMonth } from '@kalender/core';
import { CalendarDate, CalendarEvent } from '@kalender/core/lib/event';

export function useYearMonth(
    year: number = new Date().getFullYear(),
    month: number = new Date().getMonth() + 1
) {
    const _year = ref(year);
    const _month = ref(month);

    const add = (val: number) => {
        const { year: y, month: m } = addMonths(
            { year: _year.value, month: _month.value },
            val
        );
        _year.value = y;
        _month.value = m;
    };

    const next = () => add(1);
    const prev = () => add(-1);

    return {
        year: _year,
        month: _month,
        prev,
        next,
    };
}

interface ICalendar {
    year: Ref<number>;
    month: Ref<number>;
    prev: () => void;
    next: () => void;
    view: ComputedRef<CalendarDate[]>;
    events: Ref<CalendarEvent[]>;
}

export function useCalendar(events: CalendarEvent[]): ICalendar;
export function useCalendar(
    year: number,
    month: number,
    events: CalendarEvent[]
): ICalendar;
export function useCalendar(
    a: number | CalendarEvent[],
    b?: number,
    c?: CalendarEvent[]
) {
    let year: number;
    let month: number;
    let events: CalendarEvent[];

    const now = extract(new Date());

    if (Array.isArray(a)) {
        year = now.year;
        month = now.month;
        events = a;
    } else {
        year = a || now.year;
        month = b || now.month;
        events = c || [];
    }
    const yearMonth = useYearMonth(year, month);

    const _events = ref(events);

    const view = computed(() =>
        getCalendarMonth(
            yearMonth.year.value,
            yearMonth.month.value,
            _events.value
        )
    );

    return {
        ...yearMonth,
        view,
        events: _events,
    };
}
