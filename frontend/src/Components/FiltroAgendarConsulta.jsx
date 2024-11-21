import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler); 
        };
    }, [value, delay]);

    return debouncedValue;
};

const FiltroBusca = ({ filterType, setFilterType, selectedProfession, setSelectedProfession, professionOptions, searchTerm, setSearchTerm }) => {
    const [isTyping, setIsTyping] = useState(false); 
    const [animationDone, setAnimationDone] = useState(false); //
    const [isSearching, setIsSearching] = useState(false);

    const debouncedSearchTerm = useDebounce(searchTerm, 500); // Atraso de 500ms

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        setIsTyping(value.length > 0); // Se estiver digitando, ativa a animação
        setIsSearching(value.length > 0); // Indica que está buscando
    };

    // Efeito para controlar o tempo da animação
    useEffect(() => {
        if (isTyping) {
            setAnimationDone(false); 
            setTimeout(() => {
                setAnimationDone(true); 
            }, 1000); 
        } else {
            setIsSearching(false); 
        }
    }, [isTyping]);

    useEffect(() => {
        // Quando o campo de pesquisa estiver vazio ou o usuário parar de digitar
        if (debouncedSearchTerm === "") {
            setIsTyping(false); 
            setIsSearching(false); 
        }
    }, [debouncedSearchTerm]);

    return (
        <div className='fundoFiltro'>
            <div className="d-flex mb-4 containerfiltro">
                <Form.Control
                    as="select"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="dropFilter mr-2"
                >
                    <option value="">Selecionar <p className="setaSelecionar">↓</p></option>
                    <option value="nome" className={filterType === 'nome' ? 'selected-option' : ''}>Nome</option>
                    <option value="profissao" className={filterType === 'profissao' ? 'selected-option' : ''}>Profissão</option>
                    <option value="local" className={filterType === 'local' ? 'selected-option' : ''}>Localização</option>
                </Form.Control>

                {filterType === 'profissao' && (
                    <Form.Control
                        as="select"
                        value={selectedProfession}
                        onChange={(e) => {
                            console.log("Selected Profession: ", e.target.value); 
                            setSelectedProfession(e.target.value);
                        }}
                        className="buscaPor mr-2"
                    >
                        <option value="" className={selectedProfession === '' ? 'selected-option' : ''}>Todas as profissões...</option>
                        {professionOptions.map((profession, index) => (
                            <option key={index} value={profession} className={selectedProfession === profession ? 'selected-option' : ''}>{profession}</option>
                        ))}
                    </Form.Control>
                )}

                {filterType !== 'profissao' && (
                    <Form.Control
                        type="text"
                        placeholder={`Buscar por ${filterType || '...'}`}
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="buscaPor mr-2"
                    />
                )}

                <Button className={`searchA ${isTyping ? 'typing' : ''}`}>
                    {isSearching && !animationDone ? <span>...</span> : 'Buscar'} {/* Exibe '...' durante a animação, depois volta para 'Buscar' */}
                </Button>
            </div>
        </div>
    );
};

export default FiltroBusca;
