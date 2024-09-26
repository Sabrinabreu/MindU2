import { Container, Row, Col, Card } from 'react-bootstrap'
import { TrendingDown, TrendingUp } from 'lucide-react';

function Resultados() {
    return (
        <Container className='results-container'> <Row>
            <h1 className='mb-4 text-center textresultados'> Resultados mensuráveis: </h1>
            <div className="d-flex container resultados">
                <Col md='6' sm='10'>
                    <Card className="results cardmaior">
                        <Card.Body>
                            <Card.Text>
                                <div className="d-flex resultado">
                                    <h1>80%</h1>
                                    <p className='textresults'>de <span className='palavrachave'> melhora clínica</span> dos colaboradores após de contratar o nosso convênio</p>
                                </div>
                                <div className="d-flex resultado">
                                    <h1>50%</h1>
                                    <p className='textresults'>de <span className='palavrachave'>redução</span>  nos níveis de transtornos mentais</p>
                                </div>
                                <div className="d-flex resultado">
                                    <div className="d-flex">  <span className='numeromenor cifrao'>R$</span><h1>18,</h1><span className='numeromenor'>50</span></div>
                                    <p className='textresults invest'> É o <span className='palavrachave'>retorno</span> que sua empresa terá para cada 1,00 investido em saúde mental </p>
                                </div>

                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <div>  <Col md='6' sm='10'>
                    <Card className="results cardmenor">
                        <Card.Body>
                            <div className="d-flex resultados">
                                <div> <TrendingDown className='trending' size={120} color='#7766C6' alt="desenho de uma seta descendo"/></div>
                                <div className='conteudocardmenor'>
                                    <Card.Title className='titulocardmenor'>Diminua</Card.Title>
                                    <Card.Text className='textcardmenor' >
                                        <li>Custo anual com plano de saúde</li>
                                        <li>Custo de reposição e recrutamento</li>
                                        <li>Número de afastamentos</li>
                                    </Card.Text>
                                </div>

                            </div>


                        </Card.Body>
                    </Card>
                </Col>
                    <Col md='6' sm='10'>
                        <Card className="results cardmenor">
                            <Card.Body>
                                <div className="d-flex resultados">
                                    <div> <TrendingUp  className='trending' size={120} color='#7766C6' alt="desenho de uma seta subindo"/></div>
                                    <div className='conteudocardmenor'>
                                        <Card.Title className='titulocardmenor'>Promova</Card.Title>
                                        <Card.Text className='textcardmenor' >
                                            <li>Alivio do sintomas dos colaboradores</li>
                                            <li>Motivação e qualidade de vida</li>
                                            <li>Aumento da produtividade em até 40%</li>
                                        </Card.Text>
                                    </div>

                                </div>
                            </Card.Body>
                        </Card>
                    </Col></div>
            </div>
        </Row></Container >

    );
}

export default Resultados;
