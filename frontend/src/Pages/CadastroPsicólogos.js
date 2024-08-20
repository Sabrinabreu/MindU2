// Home
import React from 'react';
import CadastroFormPsicologos from '../Components/CadastroFormPsicologos'
import '../css/CadastroPsicólogos.css'
import { Col } from 'react-bootstrap';



function Home() {
    return (


        <div id="header" className="fundoFormsPsi centralizar">
            <h1></h1>
            <p>Você está pronto para levar sua carreira a um novo patamar e ampliar o impacto positivo que pode ter na vida das pessoas? Na MindU, acreditamos que a saúde mental é fundamental para o bem-estar geral, e estamos em busca de profissionais dedicados como você para se juntar à nossa rede de excelência.</p>
            <Col md={9} sm={12} className="blocoFormsPsi">
                <h2 className="m-4 centralizar"> Cadastre-se no nosso convênio!</h2>
                <div>
                    <CadastroFormPsicologos />
                </div>
            </Col>
        </div>


    );
}

export default Home;