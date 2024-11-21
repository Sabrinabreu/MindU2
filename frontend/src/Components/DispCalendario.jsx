import React, { useState } from 'react';
import "../css/Calendario.css";

const DatePicker = ({ onDateSelect, events = [], updatedDays = {} }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);

    const hasEventForDay = (day) => {
        if (!events || events.length === 0) return false;
    
        const dateToCheck = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        const eventDate = dateToCheck.toISOString().split('T')[0];
    
        const isPast = dateToCheck < new Date();
        if (isPast) return false;
    
        return events.some(event => {
            const eventDateFormatted = new Date(event.data).toISOString().split('T')[0];
            return eventDate === eventDateFormatted;
        });
    };
    

    const hasAvailabilityForDay = (day) => {
        const dateToCheck = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        const formattedDate = dateToCheck.toISOString().split('T')[0];
        return updatedDays[formattedDate];
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
    
        for (let i = 0; i < startDay; i++) {
            dates.push(<span key={`empty-${i}`} className="date faded"></span>);
        }
    
        for (let i = 1; i <= daysInMonth; i++) {
            const dateToCheck = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i);
            const formattedDate = dateToCheck.toISOString().split('T')[0];
            const isUpdated = updatedDays[formattedDate];
            const isToday = i === new Date().getDate() && currentMonth.getMonth() === new Date().getMonth();
            const isSelected = selectedDate && i === selectedDate.getDate();
            const hasEvent = hasEventForDay(i);
            const hasAvailability = hasAvailabilityForDay(i);
            const isPast = dateToCheck < new Date();
    
            const dayStyle = isUpdated && !isPast ? { backgroundColor: 'pink' } : {};
    
            dates.push(
                <button
                    key={`date-${i}`}
                    className={`date ${isToday ? 'current-day' : ''} ${isSelected ? 'selected-day' : ''} ${hasEvent ? 'has-event' : ''} ${hasAvailability ? 'has-availability' : ''} ${isPast ? 'past-day' : ''}`}
                    onClick={() => !isPast && handleDateClick(i)}
                    style={dayStyle}
                    disabled={isPast}
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
                    <button className="arrow" onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}>←</button>
                    <span className="month-name">{currentMonth.toLocaleString('default', { month: 'long' })} {currentMonth.getFullYear()}</span>
                    <button className="arrow" onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}>→</button>
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