import React from 'react';
import "../css/Perfil.css";
import perfilPsicologo from '../img/perfilPsicologo.jfif';
import { Container, Row, Col } from 'react-bootstrap';

function Perfil() {
    return (
        <Container>
            <h2>Meu Perfil</h2>
            <Row>
                <Col>
                    <div className="perfil-container">
                        <img className="meuPerfil" src={perfilPsicologo} alt="Perfil Psicólogo" />
                        <div className="perfil-overlay">
                            <p>BLABLANLA!</p>
                        </div>
                    </div>
                </Col>
            </Row>

            <div className="calendar-container">
                <div className="calendar">
                    <div className="timeline">
                        <div className="spacer"></div>
                        <div className="time-marker">9 AM</div>
                        <div className="time-marker">10 AM</div>
                        <div className="time-marker">11 AM</div>
                        <div className="time-marker">12 PM</div>
                        <div className="time-marker">1 PM</div>
                        <div className="time-marker">2 PM</div>
                        <div className="time-marker">3 PM</div>
                        <div className="time-marker">4 PM</div>
                        <div className="time-marker">5 PM</div>
                        <div className="time-marker">6 PM</div>
                    </div>
                    <div className="days">
                        <div className="day mon">
                            <div className="date">
                                <p className="date-num">9</p>
                                <p className="date-day">Mon</p>
                            </div>
                            <div className="events">
                                <div className="event start-2 end-5 securities">
                                    <p className="title">Securities Regulation</p>
                                    <p className="time">2 PM - 5 PM</p>
                                </div>
                            </div>
                        </div>
                        <div className="day tues">
                            <div className="date">
                                <p className="date-num">12</p>
                                <p className="date-day">Tues</p>
                            </div>
                            <div className="events">
                                <div className="event start-10 end-12 corp-fi">
                                    <p className="title">Corporate Finance</p>
                                    <p className="time">10 AM - 12 PM</p>
                                </div>
                                <div className="event start-1 end-4 ent-law">
                                    <p className="title">Entertainment Law</p>
                                    <p className="time">1 PM - 4 PM</p>
                                </div>
                            </div>
                        </div>
                        <div className="day wed">
                            <div className="date">
                                <p className="date-num">11</p>
                                <p className="date-day">Wed</p>
                            </div>
                            <div className="events">
                                <div className="event start-12 end-1 writing">
                                    <p className="title">Writing Seminar</p>
                                    <p className="time">11 AM - 12 PM</p>
                                </div>
                                <div className="event start-2 end-5 securities">
                                    <p className="title">Securities Regulation</p>
                                    <p className="time">2 PM - 5 PM</p>
                                </div>
                            </div>
                        </div>
                        <div className="day thurs">
                            <div className="date">
                                <p className="date-num">12</p>
                                <p className="date-day">Thurs</p>
                            </div>
                            <div className="events">
                                <div className="event start-10 end-12 corp-fi">
                                    <p className="title">Corporate Finance</p>
                                    <p className="time">10 AM - 12 PM</p>
                                </div>
                                <div className="event start-1 end-4 ent-law">
                                    <p className="title">Entertainment Law</p>
                                    <p className="time">1 PM - 4 PM</p>
                                </div>
                            </div>
                        </div>
                        <div className="day fri">
                            <div className="date">
                                <p className="date-num">13</p>
                                <p className="date-day">Fri</p>
                            </div>
                            <div className="events">
                                {/* You can add events here */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default Perfil;
