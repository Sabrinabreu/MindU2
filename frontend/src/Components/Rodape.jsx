import React from 'react';
import { Container, Row, Col } from "react-bootstrap";
import '../css/Rodape.css';
import Certificado from "../img/certificado.png"; 
import Logo from "../img/logo.png";


const Footer = () => {
    return (
      <footer class="site-footer">
          <Container>
            <Row>
            <Col sm={12} md={2} className='logoContainer'>
                <img src={Logo} alt="Logo da empresa." className='logoFooter'/>
              </Col>

              <Col sm={12} md={4}>
                <h6>Sobre nós</h6>
                <p class="text-justify">A MindU é uma iniciativa dedicada a promover o bem-estar psicológico no ambiente de trabalho. Nossa missão é criar ambientes de trabalho mais saudáveis e produtivos, através de um atendimento psicológico de qualidade e acessível.</p>
              </Col>

              <Col xs={6} md={2}>
                <h6>Saiba mais</h6>
                <ul class="footer-links">
                  <li><a href="/sobre">Sobre Nós</a></li>
                  <li><a href="/termosdeuso">Termos de Uso</a></li>
                  <li><a href="/privacidade">Política de Privacidade</a></li>
                  <li><a href="/contato">FAQ</a></li>
                </ul>
              </Col>

              <Col xs={6} md={2}>
                <h6>Links de atalho</h6>
                <ul class="footer-links">
                  <li><a href="/contato">Ouvidoria</a></li>
                  <li><a href="/cadastroPsicologos">Trabalhe Conosco</a></li>
                  <li><a href="/contato">Fale Conosco</a></li>
                  <li><a href="https://site.cfp.org.br/">Conselho Federal de Psicologia</a></li>
                </ul>
              </Col>
              <Col xs={6} md={2}>
              <img className='certificado' src={Certificado} width={100} alt="Imagem de certificado de boa empresa para trabalhar." />
              </Col>
            </Row>
            <hr/>
          </Container>
          <Container>
            <Row>
              <Col sm={6} md={8} xs={12}>
                <p class="copyright-text">Copyright &copy; {new Date().getFullYear()} MindU - Todos os direitos reservados.</p>
              </Col>

              <Col sm={6} md={4} xs={12}>
                <ul class="social-icons">
                  <li><a class="facebook" href="https://pt-br.facebook.com/"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0,0,256,256"><g fill="#ffffff" fill-rule="nonzero"><g transform="scale(8.53333,8.53333)"><path d="M12,27v-12h-4v-4h4v-2.148c0,-4.067 1.981,-5.852 5.361,-5.852c1.619,0 2.475,0.12 2.88,0.175v3.825h-2.305c-1.435,0 -1.936,0.757 -1.936,2.291v1.709h4.205l-0.571,4h-3.634v12z"></path></g></g></svg></a></li>
                  <li><a class="twitter" href="https://x.com/?lang=pt-br"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0,0,256,256"><g fill="#ffffff" fill-rule="nonzero"><g transform="scale(5.12,5.12)"><path d="M5.91992,6l14.66211,21.375l-14.35156,16.625h3.17969l12.57617,-14.57812l10,14.57813h12.01367l-15.31836,-22.33008l13.51758,-15.66992h-3.16992l-11.75391,13.61719l-9.3418,-13.61719zM9.7168,8h7.16406l23.32227,34h-7.16406z"></path></g></g></svg></a></li>
                  <li><a class="instagram" href="https://www.instagram.com/"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0,0,256,256"><g fill="#ffffff" fill-rule="nonzero"><g transform="scale(8,8)"><path d="M11.46875,5c-3.55078,0 -6.46875,2.91406 -6.46875,6.46875v9.0625c0,3.55078 2.91406,6.46875 6.46875,6.46875h9.0625c3.55078,0 6.46875,-2.91406 6.46875,-6.46875v-9.0625c0,-3.55078 -2.91406,-6.46875 -6.46875,-6.46875zM11.46875,7h9.0625c2.47266,0 4.46875,1.99609 4.46875,4.46875v9.0625c0,2.47266 -1.99609,4.46875 -4.46875,4.46875h-9.0625c-2.47266,0 -4.46875,-1.99609 -4.46875,-4.46875v-9.0625c0,-2.47266 1.99609,-4.46875 4.46875,-4.46875zM21.90625,9.1875c-0.50391,0 -0.90625,0.40234 -0.90625,0.90625c0,0.50391 0.40234,0.90625 0.90625,0.90625c0.50391,0 0.90625,-0.40234 0.90625,-0.90625c0,-0.50391 -0.40234,-0.90625 -0.90625,-0.90625zM16,10c-3.30078,0 -6,2.69922 -6,6c0,3.30078 2.69922,6 6,6c3.30078,0 6,-2.69922 6,-6c0,-3.30078 -2.69922,-6 -6,-6zM16,12c2.22266,0 4,1.77734 4,4c0,2.22266 -1.77734,4 -4,4c-2.22266,0 -4,-1.77734 -4,-4c0,-2.22266 1.77734,-4 4,-4z"></path></g></g></svg></a></li>
                  <li><a class="linkedin" href="https://br.linkedin.com/"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0,0,256,256"><g fill="#ffffff" fill-rule="nonzero"><g transform="scale(8,8)"><path d="M8.64258,4c-1.459,0 -2.64258,1.18163 -2.64258,2.64063c0,1.459 1.18262,2.66797 2.64063,2.66797c1.458,0 2.64258,-1.20897 2.64258,-2.66797c0,-1.458 -1.18163,-2.64062 -2.64062,-2.64062zM21.53516,11c-2.219,0 -3.48866,1.16045 -4.09766,2.31445h-0.06445v-2.00391h-4.37305v14.68945h4.55664v-7.27148c0,-1.916 0.14463,-3.76758 2.51563,-3.76758c2.337,0 2.37109,2.18467 2.37109,3.88867v7.15039h4.55078h0.00586v-8.06836c0,-3.948 -0.84884,-6.93164 -5.46484,-6.93164zM6.36328,11.31055v14.68945h4.56055v-14.68945z"></path></g></g></svg></a></li>   
                </ul>
              </Col>
            </Row>
          </Container>
      </footer>

    );
}

export default Footer;
