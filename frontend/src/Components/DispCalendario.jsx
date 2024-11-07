import React, { useState, useEffect } from 'react';
import "../css/Calendario.css";

const DatePicker = ({ onDateSelect, events = [], updatedDays = {} }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);

    // Função para verificar se o dia tem evento ou disponibilidade
    const hasEventForDay = (day) => {
        if (!events || events.length === 0) return false;
        const dateToCheck = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        const eventDate = dateToCheck.toISOString().split('T')[0]; // Formato YYYY-MM-DD
        return events.some(event => event.data === eventDate);  // Verifica se há evento marcado para aquele dia
    };

    const handleDateClick = (day) => {
        const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        setSelectedDate(newDate);
        onDateSelect(newDate);
    };

    // Função para gerar os dias do mês
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
            const formattedDate = dateToCheck.toISOString().split('T')[0]; // Formato YYYY-MM-DD
            const isUpdated = updatedDays[formattedDate]; // Verifica se o dia foi atualizado (disponível)
            const isToday = i === new Date().getDate() && currentMonth.getMonth() === new Date().getMonth(); // Verifica se é o dia atual
            const isSelected = selectedDate && i === selectedDate.getDate(); // Verifica se o dia foi selecionado
            const hasEvent = hasEventForDay(i); // Verifica se o dia tem evento
    
            // Definir a cor de fundo para dias com disponibilidade
            const dayStyle = isUpdated ? { backgroundColor: '#4CAF50' } : {}; // Cor verde para dias com disponibilidade
    
            dates.push(
                <button
                    key={`date-${i}`}
                    className={`date ${isToday ? 'current-day' : ''} ${isSelected ? 'selected-day' : ''} ${hasEvent ? 'has-event' : ''}`}
                    onClick={() => handleDateClick(i)}
                    style={dayStyle} // Aplicando o estilo de fundo
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
