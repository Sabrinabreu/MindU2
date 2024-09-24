import React, { useEffect, useState, useRef } from "react";

const Lupa = () => {
    const [magnifiedText, setMagnifiedText] = useState('');
    const [isMagnifierVisible, setIsMagnifierVisible] = useState(false); // Controla se a lupa está ativa ou não
    const magnifierRef = useRef(null);

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
            const windowWidth = window.innerWidth;
            const offsetX = 20; // Distância entre o mouse e a lupa
            const offsetY = 20;

            // Ajusta a posição da lupa com base na proximidade com a borda da janela
            if (windowWidth - e.pageX < 300) {
                magnifierRef.current.style.left = `${e.pageX - magnifierRef.current.offsetWidth - offsetX}px`;
            } else {
                magnifierRef.current.style.left = `${e.pageX + offsetX}px`;
            }

            magnifierRef.current.style.top = `${e.pageY + offsetY}px`;
        }
    };

    useEffect(() => {
        if (isMagnifierVisible) {
            // Adiciona eventos quando a lupa está ativa
            const allTextAndImages = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, img, a, button, input');

            allTextAndImages.forEach((element) => {
                element.addEventListener('mouseenter', handleMouseEnter);
                element.addEventListener('mouseleave', handleMouseLeave);
                element.addEventListener('mousemove', handleMouseMove);
            });

            // Remove os eventos quando a lupa é desativada
            return () => {
                allTextAndImages.forEach((element) => {
                    element.removeEventListener('mouseenter', handleMouseEnter);
                    element.removeEventListener('mouseleave', handleMouseLeave);
                    element.removeEventListener('mousemove', handleMouseMove);
                });
            };
        }
    }, [isMagnifierVisible]); // Roda quando o estado de visibilidade da lupa muda

    return (
        <div>
            <button
                onClick={() => setIsMagnifierVisible(!isMagnifierVisible)}
                aria-label="Alternar Lupa"
            >
                {isMagnifierVisible ? 'Desativar Lupa' : 'Ativar Lupa'}
            </button>

            {/* Div que mostra o texto ampliado */}
            {isMagnifierVisible && (
                <div
                    ref={magnifierRef}
                    style={{
                        position: 'absolute',
                        border: '1px solid black',
                        backgroundColor: 'white',
                        padding: '10px',
                        display: magnifiedText ? 'block' : 'none',
                        zIndex: 9999 // Certifica-se de que a lupa esteja acima de outros elementos
                    }}
                >
                    {magnifiedText}
                </div>
            )}
        </div>
    );
};

export default Lupa;
