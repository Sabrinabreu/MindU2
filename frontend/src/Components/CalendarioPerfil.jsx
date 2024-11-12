import React, { useEffect, useState } from 'react';
import "../css/CalendarioPerfil.css";
import { parseJwt } from '../Components/jwtUtils';

const CalendarioEDetalhes = ({
    currentMonth,
    setCurrentMonth,
    tipoUsuario,
    consultationDetails
}) => {
    const [psicologos, setPsicologos] = useState({});
    const token = localStorage.getItem('token');
    const decodedToken = parseJwt(token);
    console.log('Decoded Token:', decodedToken);

    // Função para ir para o próximo mês
    const goToNextMonth = () => {
        const nextMonth = new Date(currentMonth);
        nextMonth.setMonth(currentMonth.getMonth() + 1);
        setCurrentMonth(nextMonth);
    };

    // Função para ir para o mês anterior
    const goToPreviousMonth = () => {
        const previousMonth = new Date(currentMonth);
        previousMonth.setMonth(currentMonth.getMonth() - 1);
        setCurrentMonth(previousMonth);
    };

    // Função para gerar o calendário
    const generateCalendar = () => {
        const startDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
        const endDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
        const days = [];

        const firstDayOfWeek = startDate.getDay();

        // Adiciona células vazias antes do primeiro dia do mês
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

            // Gerar células para os dias
            days.push(
                <div key={i} className="calendar-cell">
                    <div className="calendario-dia">
                        {dataFormatada}
                        {consultasDoDia.length > 0 && <span className="bolinha"></span>}
                    </div>
                    {consultasDoDia.length > 0 && (
                        <div className="consultas">
                            {consultasDoDia.map((consulta, index) => {
                                const psicologoNome = psicologos[consulta.psicologo_id]?.nome || 'Psicólogo não disponível';
                                return (
                                    <div key={index} className="consulta">
                                        <p><strong>Horário:</strong> {formatTime(consulta.horario_inicio)}</p>
                                        <p><strong>Assunto:</strong> {consulta.assunto || 'Assunto não disponível'}</p>
                                        <p><strong>Psicólogo:</strong> {psicologoNome}</p>
                                        <hr />
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            );
        }
        return days;
    };

    // Função para formatar o horário
    const formatTime = (time) => {
        if (!time) return 'Hora não disponível';
        return time.substring(0, 5);
    };

    // Carregar os psicólogos ao inicializar
    useEffect(() => {
        const loadPsicologos = async () => {
            try {
                const response = await fetch('http://localhost:3001/psicologos');
                const data = await response.json();
                console.log("Dados da API:", data); 
                const psicologosMap = data.reduce((acc, psicologo) => {
                    acc[psicologo.psicologo_id] = psicologo; 
                    return acc;
                }, {});

                setPsicologos(psicologosMap);
            } catch (error) {
                console.error("Erro ao carregar psicólogos:", error);
            }
        };

        loadPsicologos();
    }, []);

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
            </div><br></br>
        </div>
    );
};

export default CalendarioEDetalhes;