import React, { useState } from 'react';
import "../css/CalendarioPerfil.css";

const CalendarioEDetalhes = ({
    currentMonth,
    setCurrentMonth,
    consultationDetails,
    tipoUsuario
}) => {
    const goToNextMonth = () => {
        const nextMonth = new Date(currentMonth);
        nextMonth.setMonth(currentMonth.getMonth() + 1);
        setCurrentMonth(nextMonth);
    };

    const goToPreviousMonth = () => {
        const previousMonth = new Date(currentMonth);
        previousMonth.setMonth(currentMonth.getMonth() - 1);
        setCurrentMonth(previousMonth);
    };

    const generateCalendar = () => {
        const startDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
        const endDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
        const days = [];

        const firstDayOfWeek = startDate.getDay();

        for (let i = 0; i < firstDayOfWeek; i++) {
            days.push(<div key={`empty-${i}`} className="calendar-cell empty"></div>);
        }

        // Adicionar os dias do mês
        for (let i = 1; i <= endDate.getDate(); i++) {
            const currentDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i);
            const dataFormatada = currentDay.getDate();

            const consultasDoDia = consultationDetails.filter(detail => {
                const detailDate = new Date(detail.data);
                return detailDate.getDate() === dataFormatada &&
                    detailDate.getMonth() === currentDay.getMonth() &&
                    detailDate.getFullYear() === currentDay.getFullYear();
            });

            days.push(
                <div key={i} className="calendar-cell">
                    <div className="calendario-dia">
                        {dataFormatada}
                        {consultasDoDia.length > 0 && <span className="bolinha"></span>}
                    </div>
                    {consultasDoDia.length > 0 && (
                        <div className="consultas">
                            {consultasDoDia.map((consulta, index) => (
                                <div key={index} className="consulta">
                                    {/* Exibindo o horário com o campo correto */}
                                    <p><strong>Horário:</strong> {consulta.horario_inicio || 'Hora não disponível'}</p>
                                    <p><strong>Assunto:</strong> {consulta.assunto || 'Assunto não disponível'}</p>
                                    <p><strong>Psicólogo:</strong> {consulta.nomePsico || 'Psicólogo não disponível'}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            );
        }
        return days;
    };

    return (
        <div className="calendarioEDetalhes">
            <div className="calendarioPerfil p-4 text-center">
                <div className="calendario-topo">
                    <button className="calendario-mes" onClick={goToPreviousMonth}>◀</button>
                    <h5 className="calendar-title">
                        {currentMonth.toLocaleString('default', { month: 'long' })} {currentMonth.getFullYear()}
                    </h5>
                    <button className="calendario-mes" onClick={goToNextMonth}>▶</button>
                </div>
                <br />
                <div className="calendar-dias">
                    <div className="calendar-header-day">Dom</div>
                    <div className="calendar-header-day">Seg</div>
                    <div className="calendar-header-day">Ter</div>
                    <div className="calendar-header-day">Qua</div>
                    <div className="calendar-header-day">Qui</div>
                    <div className="calendar-header-day">Sex</div>
                    <div className="calendar-header-day">Sab</div>
                    {generateCalendar()}
                </div>
            </div>

            {tipoUsuario === 'funcionario' && (
                <div className="calendar-container">
                    <div className='containeraviso'>
                        <h5 className='mt-4'>Detalhes da Consulta</h5>
                        {Array.isArray(consultationDetails) && consultationDetails.length > 0 ? (
                            consultationDetails.map((detail, index) => (
                                <div className='avisoSemData' key={index}>
                                    <p><strong>Data:</strong> {new Date(detail.data).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }) || 'Data não disponível'}</p>
                                    <p><strong>Hora:</strong> {(detail.horario_inicio) || 'Hora não disponível'}</p>
                                    <p><strong>Tipo de consulta:</strong> {detail.tipo || 'Tipo não disponível'}</p>
                                    <p><strong>Assunto:</strong> {detail.assunto || 'Assunto não disponível'}</p>
                                    <p><strong>Psicólogo:</strong> {detail.nomePsico || 'Psicólogo não disponível'}</p>
                                    <hr />
                                </div>
                            ))
                        ) : (
                            <p>Nenhuma consulta agendada.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CalendarioEDetalhes;
