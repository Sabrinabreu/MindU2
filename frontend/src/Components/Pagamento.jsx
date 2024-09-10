import React, { useState } from 'react';
import CreditCards from 'react-credit-cards';
import { QRCodeSVG } from 'qrcode.react'; // Importar QRCodeSVG
import 'react-credit-cards/es/styles-compiled.css';
import '../css/Payment.css'; // Importar o CSS para o componente
import { CopyIcon } from 'lucide-react';

const PaymentForm = () => {
    const [paymentType, setPaymentType] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cardExpiry, setCardExpiry] = useState('');
    const [cardCVC, setCardCVC] = useState('');
    const [cardName, setCardName] = useState('');
    const [issuer, setIssuer] = useState('');
    const [isCVCVisible, setIsCVCVisible] = useState(false);
    const [installments, setInstallments] = useState(1); // Estado para parcelas

    const handlePaymentTypeChange = (e) => {
        setPaymentType(e.target.value);
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(
    
        );
    };

    // Exemplo do código para o PIX 
    const pixKey = '12.345.678/0001-95';

    const handleCardNumberChange = (e) => {
        const value = e.target.value;
        setCardNumber(value);
        // Detectar o tipo de cartão baseado no número
        if (/^4/.test(value)) setIssuer('visa');
        else if (/^5[1-5]/.test(value)) setIssuer('mastercard');
        else if (/^3[47]/.test(value)) setIssuer('amex');
        else setIssuer('');
    };

    return (
        <div className="formContainer">
            <h1>Formulário de Pagamento</h1>
            <form className="payment-form">
                {/* Dados do Pagador */}
                <div className="form-group">
                    <label htmlFor="name">Nome:</label>
                    <input type="text" id="name" name="name" required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">E-mail:</label>
                    <input type="email" id="email" name="email" required />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Telefone:</label>
                    <input type="tel" id="phone" name="phone" required />
                </div>

                {/* Tipo de Pagamento */}
                <div className="form-group">
                    <label>Escolha o Tipo de Pagamento:</label>
                    <div className="payment-options">
                        <label className={`payment-option ${paymentType === 'boleto' ? 'active' : ''}`}>
                            <input
                                type="radio"
                                name="paymentType"
                                value="boleto"
                                checked={paymentType === 'boleto'}
                                onChange={handlePaymentTypeChange}
                            />
                            Boleto
                        </label>
                        <label className={`payment-option ${paymentType === 'pix' ? 'active' : ''}`}>
                            <input
                                type="radio"
                                name="paymentType"
                                value="pix"
                                checked={paymentType === 'pix'}
                                onChange={handlePaymentTypeChange}
                            />
                            PIX
                        </label>
                        <label className={`payment-option ${paymentType === 'cartao' ? 'active' : ''}`}>
                            <input
                                type="radio"
                                name="paymentType"
                                value="cartao"
                                checked={paymentType === 'cartao'}
                                onChange={handlePaymentTypeChange}
                            />
                            Cartão
                        </label>
                    </div>
                </div>

                {/* Detalhes do Pagamento */}
                {paymentType && (
                    <div id="paymentDetails" className="payment-details">
                        {paymentType === 'boleto' && (
                            <div className="form-group">
                                <label htmlFor="boletoNumber">Número do Boleto:</label>
                                <input type="text" id="boletoNumber" name="boletoNumber" />
                            </div>
                        )}
                        {paymentType === 'pix' && (
                            <div className="pix-section">
                                <div className="qr-code-container">
                                    <QRCodeSVG
                                        value={pixKey}
                                        size={256}
                                        level="H"
                                    />
                                    <p>Escaneie o QR Code com seu aplicativo de banco</p>
                                </div>
                                <p>Chave PIX da Empresa:</p>
                                <div className="form-group">
                                    <div className='pix-key d-flex'>
                                        <input
                                            readOnly
                                            value={pixKey}
                                        />
                                        <CopyIcon onClick={() => copyToClipboard(pixKey)} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="parcelasPix">Parcelas:</label>
                                    <select
                                        id="parcelasPix"
                                        name="parcelas"
                                        value={installments}
                                        onChange={(e) => setInstallments(e.target.value)}
                                    >
                                        {[1, 2, 3, 4, 5, 6].map(n => (
                                            <option key={n} value={n}>
                                                {n} {n > 1 ? 'Parcelas' : 'Parcela'}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        )}
                        {paymentType === 'cartao' && (
                            <div className="credit-card-container">
                                <div className="credit-card-form">
                                    <div className="form-group">
                                        <label htmlFor="cardName">Nome do Titular:</label>
                                        <input
                                            type="text"
                                            id="cardName"
                                            name="cardName"
                                            value={cardName}
                                            onChange={(e) => setCardName(e.target.value)}
                                            placeholder="Nome no Cartão"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="cardNumber">Número do Cartão:</label>
                                        <input
                                            type="text"
                                            id="cardNumber"
                                            name="cardNumber"
                                            value={cardNumber}
                                            onChange={handleCardNumberChange}
                                            placeholder="Número do Cartão"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="cardExpiry">Data de Expiração:</label>
                                        <input
                                            type="text"
                                            id="cardExpiry"
                                            name="cardExpiry"
                                            value={cardExpiry}
                                            onChange={(e) => setCardExpiry(e.target.value)}
                                            placeholder="MM/AA"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="cardCVC">Código de Segurança:</label>
                                        <input
                                            type="text"
                                            id="cardCVC"
                                            name="cardCVC"
                                            value={cardCVC}
                                            onChange={(e) => {
                                                setCardCVC(e.target.value);
                                                setIsCVCVisible(true);
                                            }}
                                            onFocus={() => setIsCVCVisible(true)}
                                            onBlur={() => setIsCVCVisible(false)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="parcelasCartao">Parcelas:</label>
                                        <select
                                            id="parcelasCartao"
                                            name="parcelas"
                                            value={installments}
                                            onChange={(e) => setInstallments(e.target.value)}
                                        >
                                            {[1, 2, 3, 4, 5, 6].map(n => (
                                                <option key={n} value={n}>
                                                    {n} {n > 1 ? 'Parcelas' : 'Parcela'}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="credit-card-preview">
                                    <CreditCards
                                        number={cardNumber}
                                        name={cardName}
                                        expiry={cardExpiry}
                                        cvc={isCVCVisible ? cardCVC : ''}
                                        issuer={issuer}
                                        focused={isCVCVisible ? 'cvc' : 'number'}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                )}

                <button className='formbutton' type="submit">Enviar</button>
            </form>
        </div>
    );
};

export default PaymentForm;

