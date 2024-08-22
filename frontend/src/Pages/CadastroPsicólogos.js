// Home
import React from 'react';
import CadastroFormPsicologos from '../Components/CadastroFormPsicologos'
import '../css/CadastroPsicólogos.css'
import { Col } from 'react-bootstrap';



function Home() {
    return (


        <div id="header" className="fundoFormsPsi centralizar">
            <div className='cadastro'>
                <p>Você está pronto para levar sua carreira a um novo patamar e ampliar o impacto positivo que pode ter na vida das pessoas? Na MindU, acreditamos que a saúde mental é fundamental para o bem-estar geral, e estamos em busca de profissionais dedicados como você para se juntar à nossa rede de excelência.</p>
            </div>
            <h2 lassName="m-4 centralizar">Por que ser MindU??</h2>
            <div className='d-flex containerporque'>
                <div className='cardporque'>
                    <h4>1. Flexibilidade de Horários</h4>
                    <p>
                        Horários Personalizáveis: Permite ajustar os horários de trabalho para melhor atender às necessidades pessoais e profissionais.
                    </p>
                    <p>   Opções de Trabalho Remoto: Oferece a possibilidade de realizar atendimentos online, facilitando a gestão do tempo.</p>
                </div>
                <div className='cardporque'>  <h4>2. Desenvolvimento profissional</h4>
                    <p>
                        Treinamentos Contínuos: Acesso a cursos, workshops e seminários para aprimorar habilidades e conhecimentos.
                    </p>
                    <p>Oportunidades de Especialização: Possibilidade de se especializar em áreas específicas da psicologia com suporte da empresa.</p></div>
                    
            </div>
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