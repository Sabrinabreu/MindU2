import React from 'react';
import "../css/CalendarioPerfil.css"

const CalendarioEDetalhes = ({ 
    currentMonth, 
    handlePrevMonth, 
    handleNextMonth, 
    generateCalendar, 
    consultationDetails, 
    tipoUsuario 
}) => {

    return (
        <div className="calendarioEDetalhes">
            {/* Calendário */}
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

            {/* Detalhes da consulta */}
            {tipoUsuario === 'funcionario' && (
                <div className="calendar-container">
                    <div className='containeraviso'>
                        <h5 className='mt-4'>Detalhes da Consulta</h5>
                        {Array.isArray(consultationDetails) ? (
                            consultationDetails.length > 0 ? (
                                consultationDetails.map((detail, index) => (
                                    <div className='avisoSemData' key={index}>
                                        <p><strong>Data:</strong> {detail.date}</p>
                                        <p><strong>Horário:</strong> {detail.time}</p>
                                        <p><strong>Tipo de consulta:</strong> {detail.tipo}</p>
                                        <p><strong>Assuntos:</strong> {detail.assunto}</p>
                                        <hr />
                                    </div>
                                ))
                            ) : (
                                <p className='avisoSemData'>Nenhum agendamento encontrado.</p>
                            )
                        ) : (
                            <p className='avisoSemData'>Erro ao carregar os detalhes da consulta.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CalendarioEDetalhes;