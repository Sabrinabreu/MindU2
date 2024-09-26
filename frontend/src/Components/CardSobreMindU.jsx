import { Container, Row, Col, Card } from 'react-bootstrap';
import '../css/HomeMindU.css'
import HappyFamily from '../img/family.png'
import HappyWork from '../img/imagem2.png'


function CardSobreMindU() {
    return (
        <Container className='container'>
            <Row className='align-items-start'>
                <Col md="4" sm='12'>
                    <Card className='cardBannerMaior'>
                        <img width={270} className='imagem2' src={HappyWork} alt="desenho de trabalhadores felizes" />
                    </Card>
                </Col>
            </Row>
            <Row className='align-items-start'>
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