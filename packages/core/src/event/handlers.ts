import {
  daysBetween,
  diffTime,
  eraseTime,
  extract,
  getDefault,
  getWeekDay,
  isDefined,
  normalDate,
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
  
    if (isDefined(option.weeks) && weeks > option.weeks * interval) return false;
  
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
    if (isDefined(option.months) && !option.months.includes(month)) return false;
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
      (year - (thatDay < eraseTime(option.start) ? 1 : 0)) % option.interval !== 0
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
}