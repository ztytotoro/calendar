## @kanlender/core

### Usage

#### generate a calendar month:

```ts
const days = getCalendarMonth(year, month, events);

// returns

type CalendarDays = {
    day: number;
    date: Date;
    events: {
        title: string;
        description: string;
        start: {
            hour: number;
            minute: number;
            second: number;
        };
        end: {
            hour: number;
            minute: number;
            second: number;
        };
    };
}[];
```

#### create a calendar event:

```ts
const events = [createEvent(option, repeatOption)];

// example
createEvent(
    {
        title: 'A event repeat every {interval} days',
        description: 'some description',
        start: {
            hour: 12,
            minute: 0,
            second: 0,
        },
        end: {
            hour: 12,
            minute: 0,
            second: 0,
        },
    },
    {
        type: RepeatTypes.Interval,
        start: new Date(),
        times: 4,
        interval: 4,
    }
);
```

### See more details in [`/packages/demos/vue/src/App.vue`](https://github.com/ztytotoro/kalender/blob/master/packages/demos/vue/src/App.vue)
