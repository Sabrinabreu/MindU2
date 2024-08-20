import { Container, Row, Col } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';

function FAQ() {
    return (
        <Container><Row><Col md='12'>


            <Accordion className='faqaccordion'>
                <h1 className='text-center'> FAQ: Perguntas frequentes </h1>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Quais são os tipos de planos disponíveis?</Accordion.Header>
                    <Accordion.Body>
                        Oferecemos três planos principais:
                        <br />
                        Plano Bem-Estar (Básico): Ideal para suporte psicológico básico.
                        <br />
                        Plano Equilíbrio (Intermediário): Para um suporte mais abrangente e contínuo.
                        <br />
                        Plano Transformação (Premium): Para um acompanhamento intensivo e personalizado.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header> Quais são as vantagens dos diferentes planos?</Accordion.Header>
                    <Accordion.Body>


                        Cada plano oferece uma combinação de consultas com psicólogos, sessões de terapia em grupo, workshops e suporte online. A principal diferença entre eles é a frequência das sessões e a acessibilidade aos recursos, como material educativo e coaching personalizado.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header> Como a MindU garante a confidencialidade?
                    </Accordion.Header>
                    <Accordion.Body>

                        A MindU mantém um compromisso rigoroso com a ética e a confidencialidade. Todos os atendimentos e informações dos usuários são tratados com o mais alto nível de sigilo.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                    <Accordion.Header>  Como posso escolher o plano certo para mim?</Accordion.Header>
                    <Accordion.Body>


                        Recomendamos avaliar suas necessidades de suporte psicológico e considerar a frequência das consultas e a importância dos workshops e do suporte online para escolher o plano que melhor se adapta a você.
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion></Col></Row></Container >

    );
}

export default FAQ;
