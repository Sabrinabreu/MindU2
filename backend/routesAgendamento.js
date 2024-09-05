const express = require('express');
const router = express.Router();

const handleSave = () => {
  if (!selectedDate || !selectedTime || !selectedTipo || !assunto) {
      alert('Por favor, preencha todos os campos antes de salvar.');
      return;
  }

  const data = {
      userId: 'someUserId',
      data: selectedDate.toISOString().split('T')[0],
      tipo: selectedTipo,
      time: selectedTime,
      assunto: assunto,
      nomePsico: nomePsico,  // Adicionado o nome do psicólogo
  };

  console.log('Dados enviados:', data); 

  fetch('http://localhost:3001/api/agendamento', { 
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
  })
  .then(response => {
      if (response.ok) {
          return response.json();
      } else if (response.status === 404) {
          throw new Error('Erro ao salvar: 404 - Endpoint não encontrado');
      } else {
          throw new Error(`Erro ao salvar: ${response.status}`);
      }
  })
  .then(data => {
      console.log('Dados recebidos:', data);
      if (data.error) {
          console.error('Erro ao salvar:', data.error);
          alert('Erro ao salvar o agendamento.');
      } else {
          console.log('Sucesso:', data);
          alert('Agendamento criado com sucesso.');

          localStorage.setItem('consultationDetails', JSON.stringify({
              date: selectedDate.toLocaleDateString('pt-BR'),
              time: selectedTime,
              tipo: selectedTipo,
              assunto: assunto,
              nomePsico: nomePsico, // Adicionado ao localStorage
          }));

          handleClose();
      }
  })
  .catch(error => {
      console.error('Erro:', error);
      alert('Erro ao salvar o agendamento.');
  });
};

module.exports = router;