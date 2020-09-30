import { Time, WeekDay } from 'date-tools';

export enum RepeatTypes {
  Interval = 'Interval',
  DayOfWeek = 'DayOfWeek',
  DayOfMonth = 'DayOfMonth',
  DayOfYear = 'DayOfYear',
  MonthDay = 'MonthDay',
  NthWeekDayOfIntervalMonth = 'NthWeekDayOfIntervalMonth',
  NthWeekDayOfSpecifiedMonth = 'NthWeekDayOfSpecifiedMonth',
}

export type CalendarRepeat<T = any> = (T extends RepeatTypes.Interval
  ? {
      // int, > 0 and default 1
      interval?: number;
    }
  : T extends RepeatTypes.DayOfWeek
  ? {
      // 1-7
      days?: WeekDay[];
      // week interval, default 1
      interval?: number;
      weeks?: number;
    }
  : T extends RepeatTypes.DayOfMonth
  ? {
      // 1-31
      days: number[];
      // default 1-12
      months?: number[];
    }
  : T extends RepeatTypes.DayOfYear
  ? {
      // 1-366
      days: number[];
      // default 1
      interval?: number;
      timesOfYear?: number;
    }
  : T extends RepeatTypes.MonthDay
  ? {
      month: number;
      day: number;
      interval?: number;
      timesOfYear?: number;
    }
  : T extends RepeatTypes.NthWeekDayOfIntervalMonth
  ? {
      interval?: number;
      // 0 is first and -1 is the last
      rank?: number;
      weekDay: WeekDay;
      // times is not supported
    }
  : T extends RepeatTypes.NthWeekDayOfSpecifiedMonth
  ? {
      month: number;
      // 0 is first and -1 is the last
      rank?: number;
      weekDay: WeekDay;
      interval?: number;
      // times is not supported
    }
  : {}) & {
  type: T;
  start: Date;
  // default: no ending
  end?: Date;
  times?: number;
};

export interface CalendarEvent<T extends RepeatTypes = any> {
  id: Symbol;
  title: string;
  description?: string;
  start: Time;
  end: Time;
  repeat: CalendarRepeat<T>;
  customData?: any;
}

export type CalendarRepeatFn<T extends RepeatTypes> = (
  date: Date,
  option: Omit<CalendarRepeat<T>, 'type'>
) => boolean;

export interface CalendarDate {
  year: number;
  month: number;
  day: number;
  weekDay: number;
  date: Date;
  events: Omit<CalendarEvent, 'id' | 'repeat'>[];
}
