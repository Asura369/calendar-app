import React, { useState } from 'react';

function Calendar() {
    const [accessDate, setAccessDate] = useState(new Date());

    const goToPreviousMonth = () => {
        const prevMonth = accessDate.getMonth() - 1;
        setAccessDate(new Date(accessDate.getFullYear(), prevMonth, accessDate.getDate()));
    };

    const goToNextMonth = () => {
        const nextMonth = accessDate.getMonth() + 1;
        setAccessDate(new Date(accessDate.getFullYear(), nextMonth, accessDate.getDate()));
    };

    // Get total days of that month, year
    const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    // Get the first day of the month (Monday, Tuesday, ...)
    const getFirstDayOfMonth = (year, month) => {
        return new Date(year, month, 1).getDay();
    };

    // return boolean for if it is the current date within the current month
    const isCurrentDate = (year, month, day) => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();
        const currentDay = currentDate.getDate();

        return year === currentYear && month === currentMonth && day === currentDay && month === currentMonth;
    };

    const renderCalendarGrid = () => {
        const year = accessDate.getFullYear();
        const month = accessDate.getMonth();
        const daysInMonth = getDaysInMonth(year, month);
        const firstDayOfMonth = getFirstDayOfMonth(year, month);

        const calendarDays = [];

        // Add row for days of the week
        const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        weekdays.map(day => {
            calendarDays.push(<div key={day} className="weekday">{day}</div>);
        });

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < firstDayOfMonth; i++) {
            calendarDays.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
        }

        // Add cells for each day of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const CurrentDate = isCurrentDate(year, month, day);
            const classNames = `calendar-day ${CurrentDate ? 'current-date' : ''}`;
            calendarDays.push(<div key={day} className={classNames}>{day}</div>);
        }

        return calendarDays;
    };

    return (
        <div className="calendar">
            <div className="calendar-header">
                <button className="button previous-month" onClick={goToPreviousMonth}>Previous Month</button>
                <div className="fixed-h2-container">
                    <h2>{accessDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
                </div>
                <button className="button next-month" onClick={goToNextMonth}>Next Month</button>
            </div>
            <div className="calendar-grid">
                {renderCalendarGrid()}
            </div>
        </div>

    );
      
}

export default Calendar;
