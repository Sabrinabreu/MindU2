import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import '../css/Calendario.css'; // Seu arquivo CSS
import ptBrLocale from '@fullcalendar/core/locales/pt-br';

const DispCalendario = ({ psicologoId }) => {
  const [eventos, setEventos] = useState([]);
  const [nomePsicologo, setNomePsicologo] = useState('');

  // Função para buscar a disponibilidade do psicólogo
  const fetchDisponibilidade = async () => {
    try {
      const response = await fetch(`/api/disponibilidade/${psicologoId}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar disponibilidade');
      }

      const contentType = response.headers.get('Content-Type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        setEventos(data);
      } else {
        throw new Error('Resposta não é JSON');
      }
    } catch (error) {
      console.error('Erro ao buscar disponibilidade:', error);
    }
  };

  // Função para buscar o nome do psicólogo diretamente do banco de dados
  const fetchPsicologo = async () => {
    try {
      const response = await fetch(`/api/psicologos/${psicologoId}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar psicólogo');
      }

      const contentType = response.headers.get('Content-Type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        setNomePsicologo(data.nome);
      } else {
        throw new Error('Resposta não é JSON');
      }
    } catch (error) {
      console.error('Erro ao buscar psicólogo:', error);
    }
  };

  useEffect(() => {
    if (psicologoId) {
      fetchDisponibilidade();
      fetchPsicologo();
    }
  }, [psicologoId]);

  return (
    <div>
      <h1 className='work'>{nomePsicologo || 'Psicólogo'}</h1> {/* Nome do psicólogo */}
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={eventos}
        locale={ptBrLocale}
        dayCellContent={(info) => (
          <div className={`dia-${info.date.getDate()}`}>
            {info.dayNumberText}
          </div>
        )}
        eventClassNames="evento-disponivel"
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