import React from 'react';
import "../css/CalendarioPerfil.css";

const CalendarioEDetalhes = ({
    currentMonth,
    handlePrevMonth,
    handleNextMonth,
    consultationDetails,
    tipoUsuario
}) => {
    const generateCalendar = () => {
        const startDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
        const endDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
        const days = [];

        // Adiciona os dias do mês ao array
        for (let i = startDate.getDate(); i <= endDate.getDate(); i++) {
            const currentDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i);
            const consultasDoDia = consultationDetails.filter(detail =>
                detail.date === currentDay.toISOString().split('T')[0]
            );

            days.push(
                <div key={i} className="calendario-dia">
                    <div>{currentDay.getDate()}</div>
                    {consultasDoDia.length > 0 && (
                        <div>
                            {consultasDoDia.map((consulta, index) => (
                                <div key={index}>
                                    <p>{consulta.time} - {consulta.assunto}</p>
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
                    <button className="calendario-mes" onClick={handlePrevMonth}>◀</button>
                    <h5 className="calendar-title">
                        {currentMonth.toLocaleString('default', { month: 'long' })} {currentMonth.getFullYear()}
                    </h5>
                    <button className="calendario-mes" onClick={handleNextMonth}>▶</button>
                </div>
                <br />
                <div className="calendar-dias">
                    <div className="calendario-dia">Dom</div>
                    <div className="calendario-dia">Seg</div>
                    <div className="calendario-dia">Ter</div>
                    <div className="calendario-dia">Qua</div>
                    <div className="calendario-dia">Qui</div>
                    <div className="calendario-dia">Sex</div>
                    <div className="calendario-dia">Sab</div>
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
                                    <p><strong>Data:</strong> {detail.date || 'Data não disponível'}</p>
                                    <p><strong>Horário:</strong> {detail.time || 'Horário não disponível'}</p>
                                    <p><strong>Tipo de consulta:</strong> {detail.tipo || 'Tipo não disponível'}</p>
                                    <p><strong>Assuntos:</strong> {detail.assunto || 'Assunto não disponível'}</p>
                                    <hr />
                                </div>
                            ))
                        ) : (
                            <p className='avisoSemData'>Nenhum agendamento encontrado.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CalendarioEDetalhes;