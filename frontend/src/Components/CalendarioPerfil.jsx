import React, { useState } from 'react';
import "../css/CalendarioPerfil.css";

const CalendarioEDetalhes = ({
    currentMonth,
    handlePrevMonth,
    handleNextMonth,
    consultationDetails,
    tipoUsuario
}) => {
    const [hoveredConsultation, setHoveredConsultation] = useState(null);

    const generateCalendar = () => {
        const startDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
        const endDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
        const days = [];

        for (let i = startDate.getDate(); i <= endDate.getDate(); i++) {
            const currentDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i);
            const dataFormatada = currentDay.getDate();

            const consultasDoDia = consultationDetails.filter(detail => {
                const detailDate = new Date(detail.data);
                return detailDate.getDate() === dataFormatada &&
                       detailDate.getMonth() === currentDay.getMonth() &&
                       detailDate.getFullYear() === currentDay.getFullYear();
            });

            days.push(
                <div key={i} className="calendario-dia">
                    <div>{dataFormatada}</div>
                    {consultasDoDia.length > 0 && (
                        <div
                            className="dot"
                            onMouseEnter={() => setHoveredConsultation(consultasDoDia)}
                            onMouseLeave={() => setHoveredConsultation(null)}
                        ></div>
                    )}
                    {hoveredConsultation && hoveredConsultation[0].data === currentDay.toISOString() && (
                        <div className="tooltip">
                            {hoveredConsultation.map((consulta, index) => (
                                <div key={index}>
                                    <p>{consulta.horario} - {consulta.assunto} ({consulta.tipo})</p>
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
                                    <p><strong>Data:</strong> {new Date(detail.data).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }) || 'Data não disponível'}</p>
                                    <p><strong>Hora:</strong> {detail.horario || 'Hora não disponível'}</p>
                                    <p><strong>Tipo de consulta:</strong> {detail.tipo || 'Tipo não disponível'}</p>
                                    <p><strong>Assunto:</strong> {detail.assunto || 'Assunto não disponível' }</p>
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