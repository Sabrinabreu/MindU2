
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import '../css/HomeMindU.css'
import { CalendarCog } from 'lucide-react';
import Transformação from '../img/icons8-butterfly-100.png'
import { GiDiploma } from "react-icons/gi";
import { LockKeyhole } from 'lucide-react';

function QualidadesMindU() {

    return (
        <Container>
            <Row >
                <div className='qualidadesMindU'>
                    <h1 className='text-center'>Porque escolher a MindU?</h1>
                    <div className='d-flex cards'>
                        <Col md='4' sm='12'>
                            <Card className="text-center cardQualidades">
                                <Card.Body>
                                    <CalendarCog className="calendarimg" size={80} strokeWidth={0.8} alt="Desenho de um calendário"/>

                                    <Card.Title className='titlecardQualidades'>Adaptabilidade</Card.Title>
                                    <Card.Text>
                                        Oferece sessões de terapia online e presenciais, permitindo acesso conveniente e adaptável ao suporte psicológico.
                                    </Card.Text>

                                </Card.Body>

                            </Card></Col>

                        <Col md='4' sm='12'>
                            <Card className="text-center cardQualidades">

                                <Card.Body>
                                <span class="material-symbols-outlined home">self_improvement</span>
                                    <Card.Title className='titlecardQualidades'>Transformação</Card.Title>
                                    <Card.Text>
                                        Inclui programas de bem-estar personalizados que promovem mudanças significativas na qualidade de vida.
                                    </Card.Text>

                                </Card.Body>

                            </Card></Col>
                        <Col md='4' sm='12'>
                            <Card className="text-center cardQualidades">

                                <Card.Body>
                                    <GiDiploma className='diplomaimg' size={80} strokeWidth={0.8} alt="Desenho de um diploma" />
                                    <Card.Title className='titlecardQualidades'>Competência</Card.Title>
                                    <Card.Text>
                                        Profissionais altamente qualificados e atualizados, garantindo atendimento eficaz e de alta qualidade.
                                    </Card.Text>

                                </Card.Body>

                            </Card></Col>
                        <Col md='4' sm='12'>
                            <Card className="text-center cardQualidades">

                                <Card.Body>
                                    <LockKeyhole className='cadeadoimg' size={80} strokeWidth={0.8} alt="Desenho de um cadeado" />
                                    <Card.Title className='titlecardQualidadesBig' >Confidencialidade</Card.Title>
                                    <Card.Text>
                                        Proteção rigorosa das informações dos pacientes colaboradores, mantendo um ambiente seguro e conforme as normas éticas e legais.
                                    </Card.Text>

                                </Card.Body>

                            </Card></Col>

                    </div>

                </div>
            </Row>
        </Container>

    );
}

export default QualidadesMindU;