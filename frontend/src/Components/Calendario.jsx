import { useState } from 'react';
import '../css/Calendario.css';

const DatePicker = ({ onDateSelect, diasDisponiveis }) => {
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
        if (!diasDisponiveis.has(newDate.toDateString())) return; // Não permite a seleção de datas não disponíveis
        console.log('Data selecionada:', newDate);
        setSelectedDate(newDate);
        onDateSelect(newDate);
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
            const isToday = date.toDateString() === new Date().toDateString();
            const isSelected = selectedDate && i === selectedDate.getDate() && currentMonth.getMonth() === selectedDate.getMonth() && currentMonth.getFullYear() === selectedDate.getFullYear();
            const isDisabled = date < new Date() || !diasDisponiveis.has(date.toDateString());
            dates.push(
                <button
                    key={`date-${i}`}
                    className={`date ${isToday ? 'current-day' : (isSelected ? 'selected-day' : '')}`}
                    onClick={() => !isDisabled && handleDateClick(i)} // Somente dias habilitados são clicáveis
                    disabled={isDisabled}
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
                        <span className="material-symbols-outlined p-3">chevron_left</span>
                    </button>
                    <span className="month-name">{currentMonth.toLocaleString('default', { month: 'long' })} {currentMonth.getFullYear()}</span>
                    <button className="arrow" onClick={handleNextMonth}>
                        <span className="material-symbols-outlined p-3">chevron_right</span>
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