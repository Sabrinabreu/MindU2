import React, { useState } from 'react';
import '../css/Acessibilidade.css';
import { PersonStanding } from 'lucide-react';
import Button from 'react-bootstrap/Button';
import { X } from 'lucide-react';

const AccessibilityPanel = () => {
    const [fontSize, setFontSize] = useState(16); // Tamanho inicial da fonte em pixels
    const [isPanelOpen, setIsPanelOpen] = useState(false);

    const handleTogglePanel = () => {
        setIsPanelOpen(!isPanelOpen);
    };

    const increaseFontSizePanel = () => {
        document.body.style.fontSize = '1.2em';
    };

    const decreaseFontSizePanel = () => {
        document.body.style.fontSize = '1em'; // Ajuste conforme necessário
    };

    const increaseCursor = () => {
        document.body.style.cursor = 'zoom-in';
    };

    const toggleDarkMode = () => {
        document.body.classList.toggle('dark-mode');
    };

    const toggleHighContrast = () => {
        document.body.classList.toggle('high-contrast');
    };

    const increaseLetterSpacing = () => {
        document.body.style.letterSpacing = '1px';
    };

    const increaseLineHeight = () => {
        document.body.style.lineHeight = '1.6';
    };

    const increaseImageSize = () => {
        document.querySelectorAll('img').forEach(img => {
            img.style.width = '150%';
        });
    };

    const changeFont = () => {
        document.body.classList.toggle('font-arial');
    };

    const toggleTextMagnifier = () => {
        document.body.classList.toggle('text-magnifier');
    };

    const increaseFontSize = () => {
        setFontSize(prevSize => Math.min(prevSize + 2, 24)); // Ajuste máximo de 24px
    };

    const decreaseFontSize = () => {
        setFontSize(prevSize => Math.max(prevSize - 2, 12)); // Ajuste mínimo de 12px
    };

    return (
        <>
            <button className="acessibilidade" onClick={handleTogglePanel}>
                <PersonStanding />
            </button>
            
            {isPanelOpen && (
                <div className="acessibilidade-panel">
                    <h2>Opções de Acessibilidade</h2>
                    <button className="btn" onClick={increaseFontSizePanel}>Aumentar Fonte (Global)</button>
                    <button className="btn" onClick={decreaseFontSizePanel}>Diminuir Fonte (Global)</button>
                    <button className="btn" onClick={increaseCursor}>Aumentar Cursor</button>
                    <button className="btn" onClick={toggleDarkMode}>Modo Noturno</button>
                    <button className="btn" onClick={toggleHighContrast}>Modo Alto Contraste</button>
                    <button className="btn" onClick={increaseLetterSpacing}>Aumentar Espaço Entre Letras</button>
                    <button className="btn" onClick={increaseLineHeight}>Aumentar Espaço Entre Linhas</button>
                    <button className="btn" onClick={increaseImageSize}>Aumentar Imagens</button>
                    <button className="btn" onClick={changeFont}>Mudar Fonte (Arial)</button>
                    <button className="btn" onClick={toggleTextMagnifier}>Lupa de Texto</button>
                    <button className="btn" onClick={handleTogglePanel}><X /></button>

                    <div className='font-size-controls'>
                        <Button onClick={decreaseFontSize}>Diminuir Fonte</Button>
                        <Button onClick={increaseFontSize}>Aumentar Fonte</Button>
                    </div>
                </div>
            )}
        </>
    );
};

export default AccessibilityPanel;
