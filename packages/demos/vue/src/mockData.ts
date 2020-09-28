import { createEvent, RepeatTypes } from '@kalender/core';

export const events = [
  createEvent(
    {
      title: '吔💩',
      description: '真香',
      start: {
        hour: 12,
        minute: 0,
        second: 0
      },
      end: {
        hour: 12,
        minute: 0,
        second: 0
      }
    },
    {
      type: RepeatTypes.Interval,
      start: new Date(),
      times: 4,
      interval: 4
    }
  ),
  createEvent(
    {
      title: '开🚗',
      description: '真xuan',
      start: {
        hour: 12,
        minute: 0,
        second: 0
      },
      end: {
        hour: 12,
        minute: 0,
        second: 0
      }
    },
    {
      type: RepeatTypes.DayOfWeek,
      start: new Date(),
      days: [1, 2, 3],
      times: 5,
      weeks: 5,
      interval: 3
    }
  ),
  createEvent(
    {
      title: '看😎',
      description: 'Happy',
      start: {
        hour: 12,
        minute: 0,
        second: 0
      },
      end: {
        hour: 12,
        minute: 0,
        second: 0
      }
    },
    {
      type: RepeatTypes.DayOfMonth,
      start: new Date('2020-1-1'),
      days: [1, 2, 3, 31],
      months: [1, 2, 3, 10],
      times: 11
    }
  ),
  createEvent(
    {
      title: '🎂每年',
      description: 'Haha',
      start: {
        hour: 12,
        minute: 0,
        second: 0
      },
      end: {
        hour: 12,
        minute: 0,
        second: 0
      }
    },
    {
      type: RepeatTypes.MonthDay,
      start: new Date('2020-6-6'),
      month: 6,
      day: 5,
      interval: 2,
      times: 1
    }
  ),
  createEvent(
    {
      title: '🎂每两个月的最后一个周一',
      description: 'Haha',
      start: {
        hour: 12,
        minute: 0,
        second: 0
      },
      end: {
        hour: 12,
        minute: 0,
        second: 0
      }
    },
    {
      type: RepeatTypes.NthWeekDayOfIntervalMonth,
      start: new Date('2020-6-6'),
      interval: 2,
      weekDay: 1,
      rank: -1
    }
  ),
  createEvent(
    {
      title: '🎂每两年的7月的最后一个周一',
      description: 'Haha',
      start: {
        hour: 12,
        minute: 0,
        second: 0
      },
      end: {
        hour: 12,
        minute: 0,
        second: 0
      }
    },
    {
      type: RepeatTypes.NthWeekDayOfSpecifiedMonth,
      start: new Date('2020-6-6'),
      interval: 2,
      month: 7,
      weekDay: 1,
      rank: -1
    }
  ),
  createEvent(
    {
      title: '🎂每年的7月的第三个工作日',
      description: 'Haha',
      start: {
        hour: 12,
        minute: 0,
        second: 0
      },
      end: {
        hour: 12,
        minute: 0,
        second: 0
      }
    },
    {
      type: RepeatTypes.NthWeekDayOfSpecifiedMonth,
      start: new Date('2020-6-6'),
      month: 7,
      weekDay: -1,
      rank: 2
    }
  ),
  createEvent(
    {
      title: '🎂每年的7月的第2个周末',
      description: 'Haha',
      start: {
        hour: 12,
        minute: 0,
        second: 0
      },
      end: {
        hour: 12,
        minute: 0,
        second: 0
      }
    },
    {
      type: RepeatTypes.NthWeekDayOfSpecifiedMonth,
      start: new Date('2020-6-6'),
      month: 7,
      weekDay: 0,
      rank: 1
    }
  ),
  createEvent(
    {
      title: '🎂每月的最后一个周一',
      description: 'Haha',
      start: {
        hour: 12,
        minute: 0,
        second: 0
      },
      end: {
        hour: 12,
        minute: 0,
        second: 0
      }
    },
    {
      type: RepeatTypes.NthWeekDayOfIntervalMonth,
      start: new Date('2020-6-6'),
      weekDay: 0,
      rank: -1
    }
  )
];
