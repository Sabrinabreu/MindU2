import { useState } from 'react'; import "../css/AgendarConsulta.css";
import "../css/SobrePsicologo.css";
import perfilPsicologo from '../img/perfilPsicologo.jfif';
import fundoPsico from '../img/fundoPsico.webp';
import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function Agendar() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Container>
            <Row>
                <Col md={6}>
                    <div className='perfilPsico'>
                        <img className="fundoPsico" src={fundoPsico} alt="Fundo Psicólogo" />
                        <img className="psicologo" src={perfilPsicologo} alt="Perfil Psicólogo" />
                        <button className='valores'>
                            Duração da sessão <br />
                            <b>1 hora</b>
                        </button>
                        <h4 className='nomePsico container p-4'>Flávio Monteiro Lobato</h4>
                        <b className='infoPsico'>Psicólogo Cognitivo</b>
                        <h6 className='infoPsico'>
                            Cornélio Procópio - PR</h6>

                    </div>
                </Col>
                <Col md={6}>
                    <div className='agenda'><h5 className='nomePsico p-3'>Agende sua consulta...</h5>
                        <button onClick={handleShow}>Agendar consulta</button>

                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Agendar Consulta</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>Emai</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="name@example.com"
                                            autoFocus
                                        />
                                    </Form.Group>
                                    <Form.Group
                                        className="mb-3"
                                        controlId="exampleForm.ControlTextarea1"
                                    >
                                        <Form.Label>Assuntos que deseja tratar durante a sessão:</Form.Label>
                                        <Form.Control as="textarea" rows={3} />
                                    </Form.Group>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={handleClose}>
                                    Save Changes
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </Col>
                <Col md={6}>
                    <div className='biografia p-4'><h5 className='nomePsico p-3'>Um pouco sobre mim</h5>
                        <p>Olá, sou Flávio Monteiro Lobato, Psicólogo Cognitivo em Cornélio Procópio - PR. Com uma abordagem baseada em evidências, trabalho para ajudar meus clientes a entender e transformar padrões de pensamento e comportamento. Minha missão é oferecer suporte personalizado para superar desafios emocionais e promover uma vida mais equilibrada. Estou comprometido com a excelência no atendimento e com a busca contínua de conhecimento para proporcionar o melhor cuidado possível.</p>
                    </div>
                </Col>
                <Col md={12}>
                    <div className='contato p-4'><h5 className='nomePsico p-3'>Contato</h5>
                    </div>
                </Col>

            </Row>
        </Container>
    );
}

export default Agendar;