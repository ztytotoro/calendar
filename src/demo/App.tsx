import React, { useState } from 'react';
import { TimeUnits } from '../core';
import { createEvents } from '../event';
import { Calendar } from '../calendar';
import './App.css';

const calendar = new Calendar();
const events = createEvents([
    {
        start: new Date('2020-9-1'),
        end: new Date('2020-10-1'),
        duration: {
            type: TimeUnits.Day,
            count: 14,
        },
        repeat: {
            interval: 1,
            type: TimeUnits.Weekend,
            times: 5,
        },
        title: '吃💩',
    },
]);
events.forEach((e) => calendar.addEvent(e));

const App: React.FC = () => {
    const [view, setView] = useState({
        year: calendar.monthView.year,
        month: calendar.monthView.month,
        days: calendar.view,
    });

    return (
        <div>
            <p>
                {view.year} - {view.month}
            </p>
            <button
                onClick={() => {
                    calendar.prevMonth();
                    console.log(calendar.view);
                    setView({
                        year: calendar.monthView.year,
                        month: calendar.monthView.month,
                        days: calendar.view,
                    });
                }}
            >
                Prev
            </button>
            <button
                onClick={() => {
                    calendar.nextMonth();
                    setView({
                        year: calendar.monthView.year,
                        month: calendar.monthView.month,
                        days: calendar.view,
                    });
                }}
            >
                Next
            </button>
            <div className="calendar">
                {view.days.map((v) => (
                    <div>
                        <p>{v.day}</p>
                        {v.events.events.map((e) => (
                            <p>{e.title}</p>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};
export default App;
