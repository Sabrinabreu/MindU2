import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../css/HomeMindU.css'
import HappyFamily from '../img/family.png'
import HappyWork from '../img/imagem2.png'


function CardSobreMindU() {
    return (
        <Container className='container'>
            <Row className='align-items-start'> {/* Adicione uma classe para flexbox */}
                <Col md="4" sm='12'>
                    <Card className='cardBannerMaior'>
                        <img width={270} className='imagem2' src={HappyWork} alt="desenho de trabalhadores felizes" />
                    </Card>
                </Col>
            </Row>
            <Row className='align-items-start'> {/* Adicione uma classe para flexbox */}
                <Col md='6' sm='12'>
                    <Card className='cardProfsMenor'>
                        <img width={170} className='imagem1' src={HappyFamily} alt="desenho de uma familia feliz e se abraçando" />
                    </Card>
                </Col>
            </Row>
        </Container>


    );
}

export default CardSobreMindU;