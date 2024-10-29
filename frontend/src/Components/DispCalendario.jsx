import React, { useState } from 'react';
import "../css/Calendario.css";

const DatePicker = ({ onDateSelect, updatedDays }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
        onDateSelect(date);
    };

    const handlePrevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    };

    const handleNextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    };

    const handleDateClick = (day) => {
        const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        setSelectedDate(newDate);
        onDateSelect(newDate);
    };

    const generateDays = () => {
        const startDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
        const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
        const dates = [];

        // Dias vazios antes do início do mês
        for (let i = 0; i < startDay; i++) {
            dates.push(<span key={`empty-${i}`} className="date faded"></span>);
        }

        // Dias do mês
        for (let i = 1; i <= daysInMonth; i++) {
            const dateToCheck = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i);
            const isUpdated = updatedDays[dateToCheck.toISOString().split('T')[0]];
            const isToday = i === new Date().getDate() && currentMonth.getMonth() === new Date().getMonth() && currentMonth.getFullYear() === new Date().getFullYear();
            const isSelected = selectedDate && i === selectedDate.getDate() && currentMonth.getMonth() === selectedDate.getMonth() && currentMonth.getFullYear() === selectedDate.getFullYear();

            dates.push(
                <button
                    key={`date-${i}`}
                    className={`date ${isToday ? 'current-day' : (isSelected ? 'selected-day' : '')} ${isUpdated ? 'updated-day' : ''}`}
                    onClick={() => handleDateClick(i)}
                >
                    {i}
                </button>
            );
        }

        return dates;
    };

    return (
        <div className="datepicker">
            <div className="datepicker-top">
                <div className="month-selector">
                    <button className="arrow" onClick={handlePrevMonth}>←</button>
                    <span className="month-name">{currentMonth.toLocaleString('default', { month: 'long' })} {currentMonth.getFullYear()}</span>
                    <button className="arrow" onClick={handleNextMonth}>→</button>
                </div>
            </div>
            <div className="datepicker-calendar">
                {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'].map((day, i) => (
                    <span key={`day-${i}`} className="day">{day}</span>
                ))}
                {generateDays()}
            </div>
        </div>
    );
};

export default DatePicker;