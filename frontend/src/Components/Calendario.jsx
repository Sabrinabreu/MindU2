import { useState } from 'react';
import "../css/AgendarConsulta.css";
import '../css/Calendario.css';

const DatePicker = ({ onDateSelect, availableDates = [] }) => {  // Valor padrão definido
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);

    const handlePrevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    };

    const handleNextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    };

    const handleDateClick = (day) => {
        const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        setSelectedDate(newDate);
        onDateSelect(newDate); // Notifica o componente pai sobre a data selecionada
    };

    const generateDays = () => {
        const startDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
        const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
        const dates = [];

        // Dias vazios antes do início do mês
        for (let i = 0; i < startDay; i++) {
            dates.push(<button key={`empty-${i}`} className="date faded" disabled></button>);
        }

        // Dias do mês
        for (let i = 1; i <= daysInMonth; i++) {
            const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i);
            const formattedDate = date.toISOString().split('T')[0]; // Formato YYYY-MM-DD
            const isAvailable = availableDates.includes(formattedDate);
            const isToday = i === new Date().getDate() && currentMonth.getMonth() === new Date().getMonth() && currentMonth.getFullYear() === new Date().getFullYear();
            const isSelected = selectedDate && i === selectedDate.getDate() && currentMonth.getMonth() === selectedDate.getMonth() && currentMonth.getFullYear() === selectedDate.getFullYear();

            dates.push(
                <button
                    key={`date-${i}`}
                    className={`date ${isAvailable ? (isToday ? 'current-day' : (isSelected ? 'selected-day' : '')) : 'inactive'}`}
                    onClick={isAvailable ? () => handleDateClick(i) : undefined}
                >
                    {i}
                </button>
            );
        }

        // Dias vazios após o fim do mês
        const totalDays = startDay + daysInMonth;
        for (let i = totalDays; i < 42; i++) {
            dates.push(<button key={`empty-end-${i}`} className="date faded" disabled></button>);
        }

        return dates;
    };

    return (
        <div className="datepicker">
            <div className="datepicker-top">
                <div className="month-selector">
                    <button className="arrow" onClick={handlePrevMonth}>
                        <i className="material-icons">
                            <span className="material-symbols-outlined p-3">chevron_left</span>
                        </i>
                    </button>
                    <span className="month-name">{currentMonth.toLocaleString('default', { month: 'long' })} {currentMonth.getFullYear()}</span>
                    <button className="arrow" onClick={handleNextMonth}>
                        <i className="material-icons">
                            <span className="material-symbols-outlined p-3">chevron_right</span>
                        </i>
                    </button>
                </div>
            </div>
            <div className="datepicker-calendar">
                {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'].map((day, i) => (
                    <span key={`day-${i}`} className="day">{day}</span>
                ))}
                {generateDays()}
            </div>
        </div>
    );
};

export default DatePicker;
