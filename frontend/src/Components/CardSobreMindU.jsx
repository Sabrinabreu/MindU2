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
            <Row >
                <Col md="4" sm='12'>
                    <Card className='cardBanner'>
                        <img className='imagem2' src={HappyWork} alt="" />
                    </Card></Col>
            </Row>
            <Row >
                <Col md='6' sm='12'> <Card className='cardProfs' >
                    <img className='imagem1' src={HappyFamily} alt="" />
                </Card></Col>
            </Row>
        </Container>

    );
}

export default CardSobreMindU;