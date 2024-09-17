import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import '../css/Acessibilidade.css';

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

  const getEventClassNames = (event) => {
    switch (event.tipo) {
      case 'consulta':
        return 'evento-consulta';
      case 'reuniao':
        return 'evento-reuniao';
      case 'disponivel':
        return 'evento-disponivel';
      default:
        return 'evento-geral';
    }
  };

  return (
    <div>
         <h1 className='work'>wok</h1>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={eventos.map(evento => ({
          ...evento,
          classNames: getEventClassNames(evento) // Adiciona a classe CSS para cada evento
        }))}
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
