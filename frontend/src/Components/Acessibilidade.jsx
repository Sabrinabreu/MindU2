import React, { useState, useEffect, useRef } from 'react';
import '../css/Acessibilidade.css';
import { PersonStanding, X, AArrowDown, AArrowUp, Pointer, Contrast, RefreshCw, Search, LetterText, Images, Space, ArrowDownAZ, Focus, MousePointerClick, Fullscreen, Keyboard } from 'lucide-react';
import Button from 'react-bootstrap/Button';
import classNames from 'classnames';
import { useLocation } from 'react-router-dom';

// // teclado virtual
// import Keyboard from 'react-simple-keyboard';
// import 'react-simple-keyboard/build/css/index.css';

const Acessibilidade = ({ toggleTheme }) => {
    const [fontSize, setFontSize] = useState(1);  // 1 significa 100% (nenhuma escala)
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [activeButtons, setActiveButtons] = useState({});
    const [isHighlightActive, setIsHighlightActive] = useState(false);
    const highlightLineRef = useRef(null);
    const [isLineVisible, setIsLineVisible] = useState(false);
    const highlightOverlayTopRef = useRef(null);
    const highlightOverlayBottomRef = useRef(null);
    const [isTDHAFriendly, setIsTDHAFriendly] = useState(false);

    const [magnifiedText, setMagnifiedText] = useState('');
    const [isMagnifierVisible, setIsMagnifierVisible] = useState(false);
    const magnifierRef = useRef(null);

    const location = useLocation();

    const highlightBackground = useRef(null);
    const highlightOverlay = useRef(null);

    const handleTogglePanel = () => setIsPanelOpen(prevState => !prevState);
    
    const adjustFontSize = (scaleFactor) => {
        document.body.style.transform = `scale(${scaleFactor})`;
        document.body.style.transformOrigin = 'top left';
        document.body.style.width = `${100 / scaleFactor}%`;
        setFontSize(scaleFactor);
    };
    
    const increaseFontSize = () => {
        const newSize = Math.min(fontSize + 0.1, 1.5);  // Limitar o zoom máximo para 1.5x (150%)
        adjustFontSize(newSize);
    };
    
    const decreaseFontSize = () => {
        const newSize = Math.max(fontSize - 0.1, 0.5);  // Limitar o zoom mínimo para 0.5x (50%)
        adjustFontSize(newSize);
    };
    

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

    // destacar linha 
    const toggleHighlight = () => {
        setIsHighlightActive(prevState => !prevState);
        setIsLineVisible(prevState => !prevState);
        setActiveButtons(prevState => ({
            ...prevState,
            highlight: !prevState.highlight
        }));
    };

    useEffect(() => {
        const handleMouseMove = (event) => {
            if (isHighlightActive) {
                const cursorY = event.clientY;
                const overlayHeight = 550;
                const spacing = 120; // espaço entre as sobreposições

                if (highlightOverlayTopRef.current && highlightOverlayBottomRef.current) {
                    highlightOverlayTopRef.current.style.top = `${cursorY - overlayHeight - spacing / 2}px`; // posição acima
                    highlightOverlayBottomRef.current.style.top = `${cursorY + spacing / 2}px`; // posição abaixo
                    highlightOverlayTopRef.current.style.display = 'block';
                    highlightOverlayBottomRef.current.style.display = 'block';
                }
            }
        };

        if (isHighlightActive) {
            window.addEventListener('mousemove', handleMouseMove);
        } else {
            window.removeEventListener('mousemove', handleMouseMove);
            if (highlightOverlayTopRef.current) {
                highlightOverlayTopRef.current.style.display = 'none';
            }
            if (highlightOverlayBottomRef.current) {
                highlightOverlayBottomRef.current.style.display = 'none';
            }
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [isHighlightActive]);
    

    const updateHighlightPosition = (e) => {
        if (highlightBackground.current && isHighlightActive) {
            const { clientY } = e;
            
            // Calculo pra posicionar o mouse no centro
            const lineHeight = highlightBackground.current.offsetHeight;
            const offset = lineHeight / 2;
            highlightBackground.current.style.top = `${clientY - offset}px`;
        }
    };
    

    const toggleTDHAFriendly = () => {
        setIsTDHAFriendly(prevState => !prevState);
        document.body.classList.toggle('perfil-tdah');
        setActiveButtons(prevState => ({
            ...prevState,
            tdahFriendly: !prevState.tdahFriendly
        }));
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


    // lupa de texto
    const handleMouseEnter = (e) => {
        const target = e.target;
        if (target.closest('.accessibility-button')) {
            return;
        }
    
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
            magnifierRef.current.style.top = `${e.pageY + 20}px`; 
            magnifierRef.current.style.left = `${e.pageX + 20}px`;
        }
    };


   // Atualiza os listeners ao trocar de rota (lupa)
   useEffect(() => {
    const allTextAndImages = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, img, a, button, input, label');

    if (document.body.classList.contains('text-magnifier')) {
        allTextAndImages.forEach((element) => {
            element.addEventListener('mouseenter', handleMouseEnter);
            element.addEventListener('mouseleave', handleMouseLeave);
            element.addEventListener('mousemove', handleMouseMove);
        });
    }

    return () => {
        allTextAndImages.forEach((element) => {
            element.removeEventListener('mouseenter', handleMouseEnter);
            element.removeEventListener('mouseleave', handleMouseLeave);
            element.removeEventListener('mousemove', handleMouseMove);
        });
    };
}, [location, activeButtons['textMagnifier']]);
    

// foco dinâmico
useEffect(() => {
    const allElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, a, button, input');

    const handleMouseEnter = (e) => {
        e.target.classList.add('highlight-hover');
    };

    const handleMouseLeave = (e) => {
        e.target.classList.remove('highlight-hover');
    };

    if (activeButtons['dynamicFocus']) {
        allElements.forEach((element) => {
            element.addEventListener('mouseenter', handleMouseEnter);
            element.addEventListener('mouseleave', handleMouseLeave);
        });
    } else {
        allElements.forEach((element) => {
            element.removeEventListener('mouseenter', handleMouseEnter);
            element.removeEventListener('mouseleave', handleMouseLeave);
            element.classList.remove('highlight-hover');
        });
    }

    return () => {
        allElements.forEach((element) => {
            element.removeEventListener('mouseenter', handleMouseEnter);
            element.removeEventListener('mouseleave', handleMouseLeave);
        });
    };
    // Atualiza os listeners ao trocar de rota (foco dinamico)
}, [activeButtons['dynamicFocus'], location]);

const handleDynamicFocusToggle = () => {
    setActiveButtons((prevState) => ({
        ...prevState,
        dynamicFocus: !prevState.dynamicFocus,
    }));
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
                            <div className="accessibility-section font-adjustment">
                                <h5>Ajustar Tamanho da Fonte</h5>
                                <div className="font-size-controls">
                                    <div className="font-size-btn" onClick={decreaseFontSize} aria-label="Diminuir tamanho da fonte"><AArrowDown /></div>
                                    <span className="font-size-display">{(fontSize * 100).toFixed(0)}%</span>
                                    <div className="font-size-btn" onClick={increaseFontSize} aria-label="Aumentar tamanho da fonte"><AArrowUp /></div>
                                </div>
                            </div>
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
                                     <Fullscreen /> Destacar Linha
                                </Button>

                                <Button
                                    className={classNames('accessibility-button', { 'active': activeButtons['tdahFriendly'] })}
                                    onClick={toggleTDHAFriendly}
                                    aria-label="Perfil TDAH"
                                >
                                    <MousePointerClick /> Perfil TDAH
                                </Button>
                                <Button
                                    className={classNames('accessibility-button', { 'active': activeButtons['dynamicFocus'] })}
                                    onClick={handleDynamicFocusToggle}
                                    aria-label="Foco Dinâmico"
                                >
                                    <Focus /> Foco Dinâmico
                                </Button>
                                <Button
                                    className={classNames('accessibility-button', { 'active': activeButtons['virtualKeyboard'] })}
                                    onClick={toggleTDHAFriendly}
                                    aria-label="Teclado digital"
                                >
                                    <Keyboard /> Teclado digital
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
            

            {/* sobreposição de cima  */}
            <div
                ref={highlightOverlayTopRef}
                className="highlight-overlay"
                style={{
                    position: 'fixed',
                    height: '90%',
                    width: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'none',
                    pointerEvents: 'none',
                    zIndex: 1000,
                    top: '0',
                    left: '0',
                }}
            />

            {/* sobreposição de baixo  */}
            <div
                ref={highlightOverlayBottomRef}
                className="highlight-overlay"
                style={{
                    position: 'fixed',
                    height: '100%',
                    width: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'none',
                    pointerEvents: 'none',
                    zIndex: 1000,
                    top: '0',
                    left: '0',
                }}
            />


            <div className={classNames('highlight-background', { 'show': isHighlightActive })} ref={highlightBackground}></div>
            <div className={classNames('highlight-overlay', { 'show': isHighlightActive })} ref={highlightOverlay}></div>
        </>
    );
};

export default Acessibilidade;