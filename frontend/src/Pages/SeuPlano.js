import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { parseJwt } from "../Components/jwtUtils";
import { Container, Row, Col, Card } from 'react-bootstrap';
import '../css/Planos.css';

const Compras = () => {
    const [compras, setCompras] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [empresaId, setEmpresaId] = useState(null);
    const [tipoUsuario, setTipoUsuario] = useState(null);
    const token = localStorage.getItem('token');

    const planoNomes = {
        1: "Bem-Estar",
        2: "Equilíbrio",
        3: "Transformação",
    };

    useEffect(() => {
        if (token) {
            const decodedToken = parseJwt(token);
            setTipoUsuario(decodedToken.tipo_usuario);
            setEmpresaId(decodedToken.id_referencia);
        }
    }, [token]);

    useEffect(() => {
        const fetchCompras = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/compras'); 
                setCompras(response.data);
            } catch (err) {
                setError('Erro ao carregar as compras');
            } finally {
                setLoading(false);
            }
        };

        fetchCompras();
    }, []);

    // Filtrar as compras pelo ID da empresa
    const comprasFiltradas = compras.filter(compra => compra.id_empresa === empresaId);

    return (
        <Container className='planCard'>
            <h2 className="">Planos Comprados</h2>
            <Row>
                {comprasFiltradas.length > 0 ? (
                    comprasFiltradas.map(compra => (
                        <Col md={4} key={compra.id} className="mb-4">
                            <Card>
                                <Card.Body>
                                    <Card.Title>{planoNomes[compra.id_plano] || "Desconhecido"}</Card.Title>
                                    <Card.Text>
                                        Quantidade de Funcionários: {compra.qtd_funcionarios}
                                    </Card.Text>
                                </Card.Body>
                                <div className='upgrade'>
                                    <button>Cancelar</button>
                                </div>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Text>Nenhum plano encontrado.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                )}

                {/* Cartão para adicionar novo plano */}
                <Col md={4} className="mb-4">
                    <Card className="add-plan-card">
                        <Card.Body className="text-center">
                            <Card.Title>Adicionar Novo Plano</Card.Title>
                            <Card.Text>
                                Clique no botão abaixo para adicionar um novo plano à sua empresa.
                            </Card.Text>
                            <button className="btn btn-primary">Adicionar Plano</button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Compras;