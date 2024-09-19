import React, { useState, useEffect, useRef } from 'react';
import '../css/Acessibilidade.css';
import { PersonStanding, X, AArrowDown, AArrowUp, Pointer, Contrast, RefreshCw, Search, LetterText, Images, Space, ArrowDownAZ, Focus, MousePointerClick } from 'lucide-react';
import Button from 'react-bootstrap/Button';
import classNames from 'classnames';

const Acessibilidade = ({ toggleTheme }) => {
    const [fontSize, setFontSize] = useState(16);
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [activeButtons, setActiveButtons] = useState({});
    const [isHighlightActive, setIsHighlightActive] = useState(false);
    const [isTDHAFriendly, setIsTDHAFriendly] = useState(false);

    const [magnifiedText, setMagnifiedText] = useState('');
    const [isMagnifierVisible, setIsMagnifierVisible] = useState(false);
    const magnifierRef = useRef(null);

    const highlightBackground = useRef(null);
    const highlightOverlay = useRef(null);

    const handleTogglePanel = () => setIsPanelOpen(prevState => !prevState);

    const adjustFontSize = (size) => {
        document.body.style.fontSize = size;
        setFontSize(parseFloat(size));
    };

    const increaseFontSize = () => adjustFontSize(`${Math.min(fontSize + 2, 24)}px`);
    const decreaseFontSize = () => adjustFontSize(`${Math.max(fontSize - 2, 12)}px`);

    const toggleClass = (className, buttonKey) => {
        const bodyClassList = document.body.classList;
        if (bodyClassList.contains(className)) {
            bodyClassList.remove(className);
        } else {
            bodyClassList.add(className);
        }
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
            'text-magnifier',
            'highlight-line',
            'perfil-tdah'
        );
        adjustFontSize('16px');
        setActiveButtons({});
        setIsHighlightActive(false);
        setIsTDHAFriendly(false);
        if (highlightBackground.current) {
            highlightBackground.current.style.display = 'none';
        }
        if (highlightOverlay.current) {
            highlightOverlay.current.style.display = 'none';
        }
    };

    const toggleHighlight = () => {
        setIsHighlightActive(prevState => !prevState);
        if (highlightBackground.current) {
            highlightBackground.current.style.display = isHighlightActive ? 'none' : 'block';
        }
        if (highlightOverlay.current) {
            highlightOverlay.current.style.display = isHighlightActive ? 'block' : 'none';
        }
    };

    const updateHighlightPosition = (e) => {
        if (highlightBackground.current && isHighlightActive) {
            const { clientY } = e;
            const offset = 50; // Ajuste para centralizar a faixa ao redor do cursor

            // Ajusta a posição da faixa para cobrir o mouse
            highlightBackground.current.style.top = `${clientY - offset}px`;
        }
    };

    const toggleTDHAFriendly = () => {
        setIsTDHAFriendly(prevState => !prevState);
        document.body.classList.toggle('perfil-tdah');
    };

    useEffect(() => {
        if (isHighlightActive) {
            document.body.classList.add('highlight-line');
            window.addEventListener('mousemove', updateHighlightPosition);
        } else {
            document.body.classList.remove('highlight-line');
            window.removeEventListener('mousemove', updateHighlightPosition);
            if (highlightBackground.current) {
                highlightBackground.current.style.display = 'none';
            }
            if (highlightOverlay.current) {
                highlightOverlay.current.style.display = 'none';
            }
        }

        return () => {
            window.removeEventListener('mousemove', updateHighlightPosition);
        };
    }, [isHighlightActive]);

    // Funções para a lupa de texto
    const handleMouseEnter = (e) => {
        const target = e.target;
        let textToMagnify = '';

        if (target.tagName === 'IMG' && target.alt) {
            textToMagnify = target.alt;
        } else {
            textToMagnify = target.innerText || target.textContent;
        }

        if (textToMagnify) {
            setMagnifiedText(textToMagnify);
            setIsMagnifierVisible(true);
        }
    };

    const handleMouseLeave = () => {
        setIsMagnifierVisible(false);
    };

    const handleMouseMove = (e) => {
        if (magnifierRef.current) {
            magnifierRef.current.style.top = `${e.clientY + 20}px`;
            magnifierRef.current.style.left = `${e.clientX + 20}px`;
        }
    };


    useEffect(() => {
        const handleMouseEnter = (e) => {
            const target = e.target;
            let textToMagnify = '';
    
            if (target.tagName === 'IMG' && target.alt) {
                textToMagnify = target.alt;
            } else if (target.nodeType === Node.TEXT_NODE || target.tagName === 'P' || target.tagName === 'SPAN') {
                textToMagnify = target.textContent;
            }
    
            if (textToMagnify) {
                setMagnifiedText(textToMagnify);
                setIsMagnifierVisible(true);
            }
        };
    
        const handleMouseLeave = () => {
            setIsMagnifierVisible(false);
        };
    
        const handleMouseMove = (e) => {
            if (magnifierRef.current) {
                magnifierRef.current.style.top = `${e.clientY + 20}px`;
                magnifierRef.current.style.left = `${e.clientX + 20}px`;
            }
        };
    
        const allTextAndImages = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, img, div, a, b, button, input');
    
        allTextAndImages.forEach((element) => {
            element.addEventListener('mouseenter', handleMouseEnter);
            element.addEventListener('mouseleave', handleMouseLeave);
            element.addEventListener('mousemove', handleMouseMove);
        });
    
        return () => {
            allTextAndImages.forEach((element) => {
                element.removeEventListener('mouseenter', handleMouseEnter);
                element.removeEventListener('mouseleave', handleMouseLeave);
                element.removeEventListener('mousemove', handleMouseMove);
            });
        };
    }, []);
    

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
                            {/* Tamanho da Fonte */}
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
                                {/* Botões de Acessibilidade */}
                                <Button
                                    className={classNames('accessibility-button', { 'active': activeButtons['increaseCursor'] })}
                                    onClick={() => toggleClass('large-cursor', 'increaseCursor')}
                                    aria-label="Aumentar cursor"
                                >
                                    <Pointer /> Aumentar Cursor
                                </Button>

                                <Button
                                    className={classNames('accessibility-button', { 'active': activeButtons['darkMode'] })}
                                    onClick={() => {
                                    toggleClass('dark-mode', 'darkMode');
                                    toggleTheme(); // Chamando a função para alternar o tema
                                    }}
                                    aria-label="Modo escuro"
                                >
                                    <Contrast /> Modo Escuro
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
                                       <ArrowDownAZ /> Espaço Entre Linhas
                                </Button>

                                <Button
                                    className={classNames('accessibility-button', { 'active': activeButtons['increaseImages'] })}
                                    onClick={() => toggleClass('increase-images', 'increaseImages')}
                                    aria-label="Aumentar imagens"
                                >
                                     <Images /> Aumentar Imagens
                                </Button>

                                <Button
                                    className={classNames('accessibility-button', { 'active': activeButtons['fontArial'] })}
                                    onClick={() => toggleClass('fonte-arial', 'fontArial')}
                                    aria-label="Fonte Arial"
                                >
                                    <LetterText /> Fonte Arial
                                </Button>

                                <Button
                                className={classNames('accessibility-button', { 'active': activeButtons['textMagnifier'] })}
                                onClick={() => toggleClass('text-magnifier', 'textMagnifier')}
                                aria-label="Lupa no Texto"
                            >
                                <Search /> Lupa no Texto
                            </Button>

                                <Button
                                    className={classNames('accessibility-button', { 'active': activeButtons['highlight'] })}
                                    onClick={toggleHighlight}
                                    aria-label="Destacar linha"
                                >
                                     <Focus /> Destacar Linha
                                </Button>

                                <Button
                                    className={classNames('accessibility-button', { 'active': activeButtons['tdahFriendly'] })}
                                    onClick={toggleTDHAFriendly}
                                    aria-label="Perfil TDAH"
                                >
                                    <MousePointerClick /> Perfil TDAH
                                </Button>
                                <Button
                                    className={classNames('accessibility-button', { 'active': activeButtons['tdahFriendly'] })}
                                    onClick={toggleTDHAFriendly}
                                    aria-label="Perfil TDAH"
                                >
                                    <MousePointerClick /> Foco dinamico
                                </Button>
                                <Button
                                    className={classNames('accessibility-button', { 'active': activeButtons['tdahFriendly'] })}
                                    onClick={toggleTDHAFriendly}
                                    aria-label="Perfil TDAH"
                                >
                                    <MousePointerClick /> Teclado digital
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Caixa da lupa de texto */}
            {isMagnifierVisible && (
                <div ref={magnifierRef} className="magnifier-box">
                {magnifiedText}
                </div>
            )}
            
            <div className={classNames('highlight-background', { 'show': isHighlightActive })} ref={highlightBackground}></div>
            <div className={classNames('highlight-overlay', { 'show': isHighlightActive })} ref={highlightOverlay}></div>
        </>
    );
};

export default Acessibilidade;