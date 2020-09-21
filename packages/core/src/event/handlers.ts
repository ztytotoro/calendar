import {
  addDays,
  daysBetween,
  diffTime,
  eraseTime,
  extract,
  getDefault,
  getWeekDay,
  isDefined,
  isNthWeekDay,
  normalDate,
  theFirstWeekDay,
  theLastWeekDay,
  theNthWeekDay,
  toPositiveInt,
  WeekDays,
  weekDaysBetween,
  weeksBetween,
} from 'date-tools';
import { RepeatTypes } from './definition';
import { registerHandler } from './repeat';

export function setupHandlers() {
  registerHandler(RepeatTypes.Interval, (date, option) => {
    const interval = toPositiveInt(getDefault(option.interval, 1));
    const days = daysBetween(eraseTime(option.start), eraseTime(date));
    if ((days - 1) % interval !== 0) {
      return false;
    }
    if (isDefined(option.times)) {
      return days <= interval * option.times;
    }
    return true;
  });

  registerHandler(RepeatTypes.DayOfWeek, (date, option) => {
    const interval = toPositiveInt(getDefault(option.interval, 1));
    const days = getDefault(option.days, WeekDays);
    if (!days.includes(getWeekDay(date))) {
      return false;
    }

    const weeks = weeksBetween(option.start, date);

    if ((weeks - 1) % interval !== 0) return false;

    if (isDefined(option.weeks) && weeks > option.weeks * interval)
      return false;

    if (isDefined(option.times)) {
      let weekDays = weekDaysBetween(
        eraseTime(option.start),
        eraseTime(date),
        days
      );

      weekDays -= ((weeks - 1) / interval) * (interval - 1) * days.length;

      return weekDays <= option.times;
    }

    return true;
  });

  registerHandler(RepeatTypes.DayOfMonth, (date, option) => {
    const { day, month } = extract(date);
    if (!option.days.includes(day)) return false;
    if (isDefined(option.months) && !option.months.includes(month))
      return false;
    if (isDefined(option.times)) {
      console.log('times option for [DayOfMonth] is not supported now');
    }

    return true;
  });

  registerHandler(RepeatTypes.DayOfYear, (date, option) => {
    throw new Error('Handler not implemented');
  });

  registerHandler(RepeatTypes.MonthDay, (date, option) => {
    const thatDay = normalDate(
      option.start.getFullYear(),
      option.month,
      option.day
    );
    const { year, month, day } = diffTime(thatDay, eraseTime(date));
    if (month !== 0 || day !== 0) return false;
    if (
      isDefined(option.interval) &&
      (year - (thatDay < eraseTime(option.start) ? 1 : 0)) % option.interval !==
        0
    )
      return false;
    if (
      isDefined(option.times) &&
      year + (thatDay < eraseTime(option.start) ? 0 : 1) >
        getDefault(option.interval, 1) * option.times
    )
      return false;
    return true;
  });

  registerHandler(RepeatTypes.NthWeekDayOfIntervalMonth, (date, option) => {
    if (isDefined(option.times)) {
      console.log(
        'times option for [NthWeekDayOfIntervalMonth] is not supported now'
      );
    }

    if (isDefined(option.rank) && option.rank > 3) {
      console.log('rank should be [0-3] or -1');
      return false;
    }

    const { year, month } = extract(option.start);

    const first = theFirstWeekDay(year, month, option.weekDay);

    const nth = addDays(first, getDefault(option.rank, 0) * 7);

    let start: Date;

    if (nth >= option.start) {
      start = nth;
    } else {
      start = addDays(
        theFirstWeekDay(year, month + 1, option.weekDay),
        getDefault(option.rank, 0) * 7
      );
    }

    const diff = diffTime(start, eraseTime(date));

    if (
      isDefined(option.interval) &&
      (diff.year * 12 + diff.month) % option.interval !== 0
    )
      return false;

    return isNthWeekDay(date, option.weekDay, getDefault(option.rank, 0));
  });

  registerHandler(RepeatTypes.NthWeekDayOfSpecifiedMonth, (date, option) => {
    if (isDefined(option.times)) {
      console.log(
        'times option for [NthWeekDayOfIntervalMonth] is not supported now'
      );
    }

    if (isDefined(option.rank) && option.rank > 3) {
      console.log('rank should be [0-3] or -1');
      return false;
    }

    if (!isNthWeekDay(date, option.weekDay, getDefault(option.rank, 0))) {
      return false;
    }

    const { year } = extract(option.start);

    let start = theNthWeekDay(
      year,
      option.month,
      option.weekDay,
      getDefault(option.rank, 0)
    );

    if (start.valueOf() < eraseTime(option.start).valueOf()) {
      start = theNthWeekDay(
        year + 1,
        option.month,
        option.weekDay,
        getDefault(option.rank, 0)
      );
    }

    const { month } = extract(date);

    const diff = diffTime(start, date);

    return diff.month === 0 && diff.year % getDefault(option.interval, 1) === 0;
  });
}
