import '../css/HomeMindU.css'
import { Link } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';

function TxtSobreMindU() {
    return (
        <Container>
            <Row >
                <Col md="10" sm='12'>
                    <div className='txtSobre'>
                        <h1> Quem somos nós: </h1>
                        <br />
                        <p> Bem-vindo a MindU! Somos um convênio que oferece serviços de psicologia para empresas e seus colaboradores, com foco em promover o bem-estar e a saúde mental. <br />

                            Para as empresas, fornecemos programas de bem-estar e consultoria para ambientes de trabalho saudáveis. Para os funcionários, oferecemos terapia híbrida (presencial e online) e workshops sobre manejo de estresse e desenvolvimento pessoal.

                            <br /> Conheça nossos planos e garanta uma boa saúde mental para você!!</p>
                        <br />
                    </div>
                    <div className="botaoContainer">
                        <Link to="/planos">
                            <Button className='botaoSobre'>
                                Veja os nossos planos aqui.
                            </Button>
                        </Link>
                    </div>
                </Col>
            </Row>
        </Container>

    );
}

export default TxtSobreMindU;