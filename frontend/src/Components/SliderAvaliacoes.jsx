
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Colab1 from '../img/Mariana-Dias-CEO2-1024x576.jpg'
import Colab2 from '../img/andy_jassy_1.webp'
import Colab3 from '../img/CEO-negras1.jpg'
import Colab4 from '../img/mark-schneider-cv-2022.jpg'
import Colab5 from '../img/ceo mulher.jpg'
import Colab6 from '../img/images.jpg'
import Colab7 from '../img/mark-schneider-cv-2022.jpg'
import Colab8 from '../img/artur-grynbaum.jpg'
import { Container, Row, Col } from 'react-bootstrap';



function Avaliacoes() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true, // Habilita o modo de centralização
        centerPadding: '20px', // Ajusta a quantidade de espaço ao redor do slide central
        focusOnSelect: true, // Permite seleção ao clicar nos slides
        arrows: true, // Habilita os botões de navegação
    };

    return (
        <Container><Row> <Col md='12'>
            <h1 className='text-center'>O que os colaboradores falam de nós: </h1>

            <div className="carousel-container">
                <Slider {...settings}>
                    <div className="slide">
                        <img className='colabs' src={Colab1} alt="" />
                        <h3>Mariana Dias</h3>
                        <div className='rate'>
                            <span className='ratestar'>★★★★★</span>
                            <p>O convênio MindU tem sido excelente: fácil de usar, com profissionais qualificados e flexibilidade no atendimento. Observamos uma melhoria no bem-estar dos funcionários e no clima organizacional. Recomendo!</p>
                        </div>

                    </div>
                    <div className="slide">
                        <img className='colabs' src={Colab2} alt="" />
                        <h3>Renato Ribeiro</h3>
                        <div className='rate'>
                            <span className='ratestar'>★★★★★</span>
                            <p>Contratar a MindU foi uma ótima decisão. A plataforma é prática, os psicólogos são ótimos e a flexibilidade no atendimento é um grande diferencial. Já percebemos melhorias no clima da empresa. Vale a pena!</p>
                        </div>
                    </div>
                    <div className="slide">
                        <img className='colabs' src={Colab3} alt="" />
                        <h3>Laura Schneider</h3>
                        <div className='rate'>
                            <span className='ratestar'>★★★★★</span>
                            <p>A MindU superou nossas expectativas! A plataforma é simples e os psicólogos são excepcionais. A flexibilidade no atendimento fez toda a diferença para nossa equipe. Estamos vendo um impacto positivo no ambiente de trabalho. Super recomendada!</p>
                        </div>
                    </div>
                    <div className="slide">
                        <img className='colabs' src={Colab4} alt="" />
                        <h3>Humberto Gonçalvez</h3>
                        <div className='rate'>
                            <span className='ratestar'>★★★★★</span>
                            <p>Escolher a MindU foi um divisor de águas para nós. A plataforma é descomplicada, os profissionais são incríveis e o suporte é sempre ágil. O feedback da equipe tem sido muito positivo e já notamos uma diferença no clima da empresa. É um investimento que vale a pena!</p>
                        </div>
                    </div>
                    <div className="slide">
                        <img className='colabs' src={Colab5} alt="" />
                        <h3>Juliana Ferreira</h3>
                        <div className='rate'>
                            <span className='ratestar'>★★★★★</span>
                            <p>A MindU se destaca pelo rigor com o sigilo e a ética. Nossos colaboradores confiam plenamente na confidencialidade das informações, o que contribui para um ambiente de trabalho mais seguro e aberto. Recomendo fortemente.</p>
                        </div>
                    </div>
                    <div className="slide">
                        <img className='colabs' src={Colab6} alt="" />
                        <h3>João Paulo Campos</h3>
                        <div className='rate'>
                            <span className='ratestar'>★★★★★</span>
                            <p>A MindU oferece planos econômicos que são muito vantajosos para nossa empresa. Além disso, os workshops de bem-estar têm sido um sucesso, trazendo benefícios reais para a equipe. A combinação de custo acessível e suporte abrangente faz da MindU uma escolha excelente.</p>
                        </div>
                    </div>
                    <div className="slide">
                        <img className='colabs' src={Colab7} alt="" />
                        <h3>José Vieira</h3>
                        <div className='rate'>
                            <span className='ratestar'>★★★★★</span>
                            <p> MindU combina planos econômicos atraentes com workshops de bem-estar que realmente engajam nossa equipe. O compromisso com a confidencialidade é sólido, garantindo um ambiente de apoio e confiança. É um investimento que traz ótimos resultados.</p>
                        </div>
                    </div>
                    <div className="slide">
                        <img className='colabs' src={Colab8} alt="" />
                        <h3>Rafael Souza</h3>
                        <div className='rate'>
                            <span className='ratestar'>★★★★★</span>
                            <p>A MindU oferece planos econômicos e workshops de bem-estar que têm um grande impacto. A flexibilidade de horários e o atendimento híbrido são um diferencial, e o sigilo é impecável. Altamente recomendada.</p>
                        </div>
                    </div>
                    {/* Adicione mais slides conforme necessário */}
                </Slider>
            </div>
        </Col>
        </Row></Container>

    );
};
export default Avaliacoes