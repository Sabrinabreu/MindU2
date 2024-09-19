import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DispCalendario from "../Components/DispCalendario";
import { Container } from 'react-bootstrap';

const SobrePsicologo = () => {
    const { psicologo_id } = useParams(); 
    const [psicologoId, setPsicologoId] = useState(null);
    const [psicologoNome, setPsicologoNome] = useState(''); 
    const [loading, setLoading] = useState(true); // Adicione um estado de carregamento

    useEffect(() => {
        if (psicologo_id) {
            setPsicologoId(psicologo_id);

            // Função para buscar o nome do psicólogo
            const fetchPsicologo = async () => {
                try {
                    const response = await fetch(`/api/psicologos/${psicologo_id}`);
                    const data = await response.json();
                    if (data.nome) {
                        setPsicologoNome(data.nome);  // Define o nome do psicólogo
                    } else {
                        console.error('Nome do psicólogo não encontrado');
                    }
                } catch (error) {
                    console.error('Erro ao buscar dados do psicólogo:', error);
                } finally {
                    setLoading(false); // Defina o estado de carregamento como falso
                }
            };

            fetchPsicologo();
        }
    }, [psicologo_id]);

    if (loading) {
        return <div>Carregando...</div>;
    }

    return (
        <div>
            <Container>
                <h1 className='mt-4'>Calendário de Disponibilidade de {psicologoNome || 'Psicólogo'}</h1>
               
            </Container>
        </div>
    );
};

export default SobrePsicologo;