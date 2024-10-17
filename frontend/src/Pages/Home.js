import React, { useEffect } from 'react';
import TxtSobreMindU from "../Components/TxtApresentMindU";
import CardSobreMindU from "../Components/CardSobreMindU";
import QualidadesMindU from "../Components/QualidadesEmpresa";
import Avaliacoes from '../Components/SliderAvaliacoes';
import FAQ from "../Components/faq";
import Resultados from "../Components/ResultadosTratamento";
import BAPO from "../Components/WidgetBAPO";
import "../css/WidgetBAPO.css";

const sectionsConfig = [
  { id: 'section1', delay: '0.2s' },
  { id: 'section2', delay: '0.2s' },
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
            section.style.transitionDelay = '0s';
          }
        }
      });
    };

    const debouncedHandleScroll = () => {
      window.requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', debouncedHandleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', debouncedHandleScroll);
  }, []);

  return (
    <div>
      <BAPO />
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

