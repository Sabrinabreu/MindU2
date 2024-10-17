import React from 'react';
import { Form } from 'react-bootstrap';
import "../css/AgendarConsulta.css";

const FiltroBusca = ({ filterType, setFilterType, selectedProfession, setSelectedProfession, professionOptions, searchTerm, setSearchTerm }) => {
    return (
        <div className='fundoFiltro'>
            <div className="d-flex mb-4 align-items-center">
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
                        onChange={(e) => setSelectedProfession(e.target.value)}
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

                <div className="searchA">
                    Buscar
                </div>
            </div>
        </div>
    );
};

export default FiltroBusca;