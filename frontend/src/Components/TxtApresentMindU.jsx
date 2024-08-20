import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../css/HomeMindU.css'

function TxtSobreMindU() {
    return (
        <Container>
            <Row >
                <Col md="10" sm='6'>
                    <div className='txtSobre'>
                        <h1> Quem somos nós: </h1>
                        <br />
                        <p> Bem-vindo a MindU! Somos um convênio que oferece serviços de psicologia para empresas e seus colaboradores, com foco em promover o bem-estar e a saúde mental. <br />

                            Para as empresas, fornecemos programas de bem-estar e consultoria para ambientes de trabalho saudáveis. Para os funcionários, oferecemos terapia híbrida (presencial e online) e workshops sobre manejo de estresse e desenvolvimento pessoal.

                            <br /> Nosso objetivo é apoiar a saúde mental dos colaboradores e melhorar o ambiente de trabalho. Conheça nossos planos e garanta uma boa saúde mental para você!!</p>
                        <br />
                        <button className='botaoSobre'>Veja os nossos planos aqui. </button>
                    </div>
                </Col>
            </Row>
        </Container>

    );
}

export default TxtSobreMindU;