import React from 'react';
import { Form, Button } from 'react-bootstrap';

const FiltroBusca = ({ filterType, setFilterType, selectedProfession, setSelectedProfession, professionOptions, searchTerm, setSearchTerm }) => {
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
                            console.log("Selected Profession: ", e.target.value); // Log do valor selecionado
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
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="buscaPor mr-2"
                    />
                )}

                <Button className="searchA">
                    Buscar
                </Button>
            </div>
        </div>
    );
};

export default FiltroBusca;