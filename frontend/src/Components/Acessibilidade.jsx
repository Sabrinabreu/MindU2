import React, { useState } from 'react';
import '../css/Acessibilidade.css';
import { PersonStanding, X, AArrowDown, AArrowUp, Pointer, Contrast, Undo2 } from 'lucide-react';
import Button from 'react-bootstrap/Button';
import classNames from 'classnames';

const AccessibilityPanel = () => {
    const [fontSize, setFontSize] = useState(16);  // Tamanho da fonte inicial em pixels
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [activeButtons, setActiveButtons] = useState({});

    const handleTogglePanel = () => setIsPanelOpen(!isPanelOpen);

    const adjustFontSize = (size) => {
        document.body.style.fontSize = size;
        setFontSize(parseFloat(size));
    };

    const increaseFontSize = () => adjustFontSize(`${Math.min(fontSize + 2, 24)}px`);
    const decreaseFontSize = () => adjustFontSize(`${Math.max(fontSize - 2, 12)}px`);

    const toggleClass = (className, buttonKey) => {
        document.body.classList.toggle(className);
        setActiveButtons(prevState => ({
            ...prevState,
            [buttonKey]: !prevState[buttonKey]
        }));
    };

    return (
        <>
            <button className="accessibility-toggle" onClick={handleTogglePanel} aria-label="Abrir painel de acessibilidade">
                <PersonStanding />
            </button>

            {isPanelOpen && (
                <div className="accessibility-panel">
                    <button className="accessibility-close" onClick={handleTogglePanel} aria-label="Fechar painel de acessibilidade"><X /></button>
                    <h3 className='accessibility-title'>Acessibilidade</h3>
                    <div className="accessibility-content">
                        {/* Ajuste de Tamanho da Fonte */}
                        <div className="accessibility-section font-adjustment">
                            <h5>Ajustar Tamanho da Fonte</h5>
                            <div className="font-size-controls">
                                <Button className="font-size-btn" onClick={decreaseFontSize} aria-label="Diminuir tamanho da fonte"><AArrowDown /></Button>
                                <span className="font-size-display">{(fontSize / 16 * 100).toFixed(0)}%</span>
                                <Button className="font-size-btn" onClick={increaseFontSize} aria-label="Aumentar tamanho da fonte"><AArrowUp /></Button>
                            </div>
                        </div>
                        {/* Outros Botões */}
                        <div className="accessibility-buttons">
                            <Button 
                                className={classNames('accessibility-button', { 'active': activeButtons['increaseCursor'] })} 
                                onClick={() => toggleClass('large-cursor', 'increaseCursor')}
                                aria-label="Aumentar cursor"
                            >
                                <Pointer /> Aumentar Cursor
                            </Button>
                            <Button 
                                className={classNames('accessibility-button', { 'active': activeButtons['darkMode'] })} 
                                onClick={() => toggleClass('dark-mode', 'darkMode')}
                                aria-label="Modo escuro"
                            >
                                <Contrast /> Modo Escuro
                            </Button>
                            <Button 
                                className={classNames('accessibility-button', { 'active': activeButtons['highContrast'] })} 
                                onClick={() => toggleClass('high-contrast', 'highContrast')}
                                aria-label="Modo alto contraste"
                            >
                                Modo Alto Contraste
                            </Button>
                            <Button 
                                className={classNames('accessibility-button', { 'active': activeButtons['letterSpacing'] })} 
                                onClick={() => toggleClass('increase-letter-spacing', 'letterSpacing')}
                                aria-label="Espaço entre letras"
                            >
                                Espaço Entre Letras
                            </Button>
                            <Button 
                                className={classNames('accessibility-button', { 'active': activeButtons['lineHeight'] })} 
                                onClick={() => toggleClass('increase-line-height', 'lineHeight')}
                                aria-label="Espaço entre linhas"
                            >
                                Espaço Entre Linhas
                            </Button>
                            <Button 
                                className={classNames('accessibility-button', { 'active': activeButtons['increaseImages'] })} 
                                onClick={() => toggleClass('increase-images', 'increaseImages')}
                                aria-label="Aumentar imagens"
                            >
                                Aumentar Imagens
                            </Button>
                            <Button 
                                className={classNames('accessibility-button', { 'active': activeButtons['changeFont'] })} 
                                onClick={() => toggleClass('font-arial', 'changeFont')}
                                aria-label="Fonte Arial"
                            >
                                Fonte Arial
                            </Button>
                            <Button 
                                className={classNames('accessibility-button', { 'active': activeButtons['textMagnifier'] })} 
                                onClick={() => toggleClass('text-magnifier', 'textMagnifier')}
                                aria-label="Lupa de texto"
                            >
                                Lupa de Texto
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AccessibilityPanel;
