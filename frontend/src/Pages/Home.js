// Home
import TxtSobreMindU from "../Components/TxtApresentMindU";
import CardSobreMindU from "../Components/CardSobreMindU";
import QualidadesMindU from "../Components/QualidadesEmpresa";
import Avaliacoes from "../Components/SliderAvaliacoes";
import FAQ from "../Components/faq";
import Resultados from "../Components/ResultadosTratamento";
import React, { useEffect } from 'react';

const sectionsConfig = [
  { id: 'section1', delay: '0s' },
  { id: 'section2', delay: '0s' },
  { id: 'section3', delay: '0.4s' },
  { id: 'section4', delay: '0.4s' },
  { id: 'section5', delay: '0.8s' },
];

function Home() {
  useEffect(() => {
    const handleScroll = () => {
      sectionsConfig.forEach(({ id, delay }) => {
        const section = document.getElementById(id);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            section.classList.add('visible');
            section.style.transitionDelay = delay;
          } else {
            section.classList.remove('visible');
            section.style.transitionDelay = '0s'; // Remove o atraso quando a seção não estiver visível
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Verifica visibilidade ao carregar

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      <div className="scroll-section" id="section1">
        <TxtSobreMindU />
        <CardSobreMindU />
      </div>
      <div className="scroll-section" id="section2">
        <QualidadesMindU />
      </div>
      <div className="scroll-section" id="section3">
        <Avaliacoes />
      </div>
      <div className="scroll-section" id="section4">
        <Resultados />
      </div>
      <div className="scroll-section" id="section5">
        <FAQ />
      </div>
    </div>
  );
}

export default Home;

