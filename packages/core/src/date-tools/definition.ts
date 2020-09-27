export enum TimeUnits {
  Year = 'Year',
  Month = 'Month',
  Week = 'Week',
  WorkDay = 'WorkDay',
  Weekend = 'Weekend',
  Day = 'Day',
  Hour = 'Hour',
  Minute = 'Minute',
  Second = 'Second',
}

export interface Time {
  hour: number;
  minute: number;
  second: number;
}

export interface YearDate {
  month: number;
  day: number;
}

export type Defined<T> = Exclude<T, undefined | null>;

// 0 is weekend and -1 is weekday
export enum WeekDay {
  WorkDay = -1,
  Weekend = 0,
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
  Sunday = 7,
}

export const WeekDays: WeekDay[] = [1, 2, 3, 4, 5, 6, 7];
export const WorkDays: WeekDay[] = [1, 2, 3, 4, 5];
export const WeekendDays: WeekDay[] = [6, 7];

export type WorkDay = 1 | 2 | 3 | 4 | 5;
export type WeekendDay = 6 | 7;
