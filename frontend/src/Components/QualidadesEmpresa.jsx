import { Container, Row, Col, Card } from 'react-bootstrap';
import '../css/HomeMindU.css'
import { CalendarCog, LockKeyhole } from 'lucide-react';
import { GiDiploma } from "react-icons/gi";

function QualidadesMindU() {

    return (
        <Container>
            <Row >
                <div className='qualidadesMindU'>
                    <h1 className='mb-5 text-center textresultados'>Porque escolher a MindU?</h1>
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
                                <svg className="transformacaoimg" width="80" height="80" version="1.1" id="Layer_1" viewBox="0 0 32 32"><path id="yoga--01" d="M19.697,30.64c0.411-0.425,0.665-1.003,0.665-1.64v-0.001v-14.64h2.521c0.021,0,0.04-0.001,0.059-0.005  c0.881-0.085,1.509-1.299,1.509-2.127c0-0.413-0.157-0.806-0.431-1.094c-0.011-0.013-1.138-1.307-2.204-2.414  c-0.931-0.992-2.219-1.747-3.624-2.139c0.752-0.629,1.207-1.569,1.207-2.578c0-1.853-1.524-3.361-3.398-3.361  c-1.873,0-3.396,1.508-3.396,3.361c0,1.009,0.454,1.949,1.206,2.578c-1.387,0.387-2.649,1.127-3.621,2.135  c-1.071,1.111-2.197,2.405-2.198,2.407c-0.284,0.3-0.44,0.692-0.44,1.105c0,0.828,0.627,2.042,1.508,2.127  c0.019,0.003,0.039,0.005,0.059,0.005h2.523v1.484l-3.528,3.319c-0.708,0.827-0.609,2.076,0.207,2.773l4.26,3.951  c0.755,0.646,2.25,0.621,3.058,0.016v3.097L15.642,29c0,0.637,0.253,1.215,0.665,1.64H1v0.721h30V30.64H19.697z M9.159,13.639  c-0.412,0-0.888-0.855-0.888-1.413c0-0.228,0.086-0.445,0.253-0.622c0.011-0.013,1.126-1.294,2.184-2.391  c1.057-1.097,2.497-1.847,4.058-2.113c0.062-0.004,0.123-0.023,0.176-0.059c0.102-0.066,0.164-0.181,0.164-0.303  c0-0.106-0.046-0.206-0.127-0.274c-0.037-0.032-0.08-0.055-0.125-0.069c-0.931-0.433-1.53-1.368-1.53-2.396  c0-1.456,1.2-2.641,2.676-2.641c1.477,0,2.678,1.185,2.678,2.641c0,1.03-0.602,1.967-1.537,2.398  c-0.043,0.015-0.083,0.037-0.118,0.067c-0.081,0.068-0.127,0.17-0.127,0.276c0,0.122,0.062,0.235,0.164,0.302  c0.056,0.036,0.118,0.055,0.182,0.058c1.57,0.269,3.045,1.036,4.054,2.112c1.057,1.097,2.171,2.377,2.192,2.402  c0.157,0.166,0.243,0.382,0.243,0.61c0,0.558-0.476,1.413-0.887,1.413h-6.482V10.36c0.289,0.104,0.603,0.3,0.892,0.484  c0.429,0.274,0.799,0.511,1.162,0.513h1.521c0.199,0,0.36-0.161,0.36-0.36s-0.162-0.36-0.36-0.36h-1.52  c-0.153-0.001-0.499-0.222-0.776-0.399c-0.495-0.316-1.055-0.674-1.648-0.674c-0.577,0-1.137,0.358-1.631,0.674  c-0.278,0.177-0.624,0.398-0.774,0.399h-1.521c-0.199,0-0.36,0.161-0.36,0.36s0.161,0.36,0.36,0.36h1.523  c0.362-0.002,0.732-0.239,1.16-0.513c0.287-0.183,0.599-0.378,0.892-0.482v3.275H9.159V13.639z M15.639,22.852l-2.256-2.238  c0.444-0.423,1.318-1.255,1.697-1.618l0.559,0.241V22.852z M19.642,28.999L19.642,28.999c0,0.905-0.735,1.641-1.64,1.641  s-1.64-0.735-1.64-1.64l-0.003-0.001v-4.474c0.007-0.096,0.007-0.191,0-0.287v-5.239c0-0.144-0.085-0.273-0.218-0.331l-0.997-0.429  c-0.135-0.058-0.293-0.027-0.397,0.077c-0.105,0.106-2.129,2.03-2.129,2.03c-0.07,0.067-0.111,0.159-0.112,0.257  s0.037,0.191,0.106,0.26l2.591,2.569c0.263,0.226,0.41,0.537,0.435,0.857v0.194c-0.02,0.256-0.118,0.508-0.296,0.717  c-0.437,0.509-1.765,0.589-2.283,0.148l-4.26-3.951c-0.525-0.45-0.588-1.243-0.166-1.74l3.615-3.397  c0.072-0.068,0.113-0.163,0.113-0.262v-1.64h7.28L19.642,28.999L19.642,28.999z"/></svg>
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