import React, { useState } from 'react';
import '../css/Acessibilidade.css';
import { PersonStanding, X, AArrowDown, AArrowUp, Pointer, Contrast, RefreshCw, Search, LetterText, Images, Space, ArrowDownAZ } from 'lucide-react';
import Button from 'react-bootstrap/Button';
import classNames from 'classnames';

const Acessibilidade = () => {
    const [fontSize, setFontSize] = useState(16);
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

    const resetAll = () => {
        document.body.classList.remove(
            'large-cursor',
            'dark-mode',
            'high-contrast',
            'espacamento',
            'espacoLinhas',
            'increase-images',
            'fonte-arial',
            'text-magnifier'
        );
        adjustFontSize('16px');
        setActiveButtons({});
    };

    return (
        <>
            <button className="accessibility-toggle" onClick={handleTogglePanel} aria-label="Abrir painel de acessibilidade">
                <PersonStanding />
            </button>

            {isPanelOpen && (
                <div className="accessibilidade-painel">

                    <button className="acessibilidade-reset" onClick={resetAll} aria-label="Resetar todas as configurações de acessibilidade">
                        <RefreshCw />
                    </button>
                    <button className="acessibilidade-close" onClick={handleTogglePanel} aria-label="Fechar painel de acessibilidade">
                        <X />
                    </button>
                    
                    <h3 className='acessibilidade-title'>Acessibilidade</h3>
                    <div className='fundoPainelA'>
                        <div className="accessibility-content">
                            {/* tamanho da Fonte */}
                            <div className="accessibility-section font-adjustment">
                                <h5>Ajustar Tamanho da Fonte</h5>
                                <div className="font-size-controls">
                                    <div className="font-size-btn" onClick={decreaseFontSize} aria-label="Diminuir tamanho da fonte"><AArrowDown /></div>
                                    <span className="font-size-display">{(fontSize / 16 * 100).toFixed(0)}%</span>
                                    <div className="font-size-btn" onClick={increaseFontSize} aria-label="Aumentar tamanho da fonte"><AArrowUp /></div>
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
                                    <Contrast /> Modo Alto Contraste
                                </Button>
                                <Button
                                    className={classNames('accessibility-button', { 'active': activeButtons['letterSpacing'] })}
                                    onClick={() => toggleClass('espacamento', 'letterSpacing')}
                                    aria-label="Espaço entre letras"
                                >
                                      <Space /> Espaço Entre Letras
                                </Button>
                                <Button
                                    className={classNames('accessibility-button', { 'active': activeButtons['lineHeight'] })}
                                    onClick={() => toggleClass('espacoLinhas', 'lineHeight')}
                                    aria-label="Espaço entre linhas"
                                >
                                       <ArrowDownAZ />Espaço Entre Linhas
                                </Button>
                                <Button
                                    className={classNames('accessibility-button', { 'active': activeButtons['increaseImages'] })}
                                    onClick={() => toggleClass('increase-images', 'increaseImages')}
                                    aria-label="Aumentar imagens"
                                >
                                     <Images />Aumentar Imagens
                                </Button>
                                <Button
                                    className={classNames('accessibility-button', { 'active': activeButtons['changeFont'] })}
                                    onClick={() => toggleClass('fonte-arial', 'changeFont')}
                                    aria-label="Fonte Arial"
                                >
                                    <LetterText />Fonte Arial
                                </Button>
                                <Button
                                    className={classNames('accessibility-button', { 'active': activeButtons['textMagnifier'] })}
                                    onClick={() => toggleClass('text-magnifier', 'textMagnifier')}
                                    aria-label="Lupa de texto"
                                >
                                    <Search /> Lupa de Texto
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Acessibilidade;
