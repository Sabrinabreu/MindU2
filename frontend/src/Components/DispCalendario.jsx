import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import '../css/Acessibilidade.css'; // Importa o arquivo CSS

const DispCalendario = ({ psicologoId }) => {
  const [eventos, setEventos] = useState([]);

  const fetchDisponibilidade = async () => {
    try {
      const response = await fetch(`/api/disponibilidade/${psicologoId}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar disponibilidade');
      }
      const data = await response.json();
      setEventos(data);
    } catch (error) {
      console.error('Erro ao buscar disponibilidade:', error);
    }
  };

  useEffect(() => {
    if (psicologoId) {
      fetchDisponibilidade();
    }
  }, [psicologoId]);

  return (
    <div>
      <h1>Calendário de Disponibilidade</h1>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={eventos}
        eventClassNames="evento-disponivel" // Adiciona uma classe CSS para os eventos
        eventTimeFormat={{
          hour: '2-digit',
          minute: '2-digit',
          meridiem: false
        }}
      />
    </div>
  );
};

export default DispCalendario;