import React, { useState, useEffect } from 'react';
import {Button, Col, Container, Row } from 'react-bootstrap';
import CreditCards from 'react-credit-cards-2';
import { QRCodeSVG } from 'qrcode.react';
import '../css/Payment.css';  // Aqui você pode adicionar suas estilizações
import { CopyIcon } from 'lucide-react';

const PaymentForm = ({ selectedPlan }) => {
    const [paymentType, setPaymentType] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cardExpiry, setCardExpiry] = useState('');
    const [cardCVC, setCardCVC] = useState('');
    const [cardName, setCardName] = useState('');
    const [issuer, setIssuer] = useState('');
    const [isCVCVisible, setIsCVCVisible] = useState(false);
    const [installments, setInstallments] = useState(1);
    const [showInstallments, setShowInstallments] = useState(false);
    const [totalPrice, setTotalPrice] = useState(selectedPlan.price || 0);

    const handleParcelarClick = () => {
        setShowInstallments(!showInstallments);
    };

    const pixKey = '12.345.678/0001-95';
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
    });

    useEffect(() => {
        if (selectedPlan) {
            let price = selectedPlan.price;
            if (typeof price === 'string') {
                price = parseFloat(price.replace(',', '.'));
            }
            setTotalPrice(price);
        }
    }, [selectedPlan]);

    const handlePaymentTypeChange = (e) => {
        setPaymentType(e.target.value);
    };

    const handleCardNumberChange = (e) => {
        const value = e.target.value;
        setCardNumber(value);
        if (/^4/.test(value)) setIssuer('visa');
        else if (/^5[1-5]/.test(value)) setIssuer('mastercard');
        else if (/^3[47]/.test(value)) setIssuer('amex');
        else setIssuer('');
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => { });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const amountPerInstallment = (totalPrice / installments).toFixed(2);
        console.log('Processando pagamento para o plano:', selectedPlan.name);
        console.log('Detalhes do pagamento:', { cardName, cardNumber, cardExpiry, cardCVC });
        console.log('Dados do usuário:', formData);
        alert(`Pagamento de R$${amountPerInstallment} por parcela para o plano ${selectedPlan.name} foi processado com sucesso!`);
    };

    const amountPerInstallment = (totalPrice / installments).toFixed(2);

    return (
        <Container className="formContainer">
            <Row>
                <form className="payment-form" onSubmit={handleSubmit}>
                    {/* Dados Pessoais */}
                    <div className="form-group">
                        <label className="formlabel" htmlFor="name">Nome:</label>
                        <input
                            className="forminput"
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Seu nome completo"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="formlabel" htmlFor="email">E-mail:</label>
                        <input
                            className="forminput"
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Seu e-mail"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="formlabel" htmlFor="phone">Telefone:</label>
                        <input
                            className="forminput"
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="Seu telefone"
                            required
                        />
                    </div>

                    {/* Escolha de Tipo de Pagamento */}
                    <div className="form-group">
                        <label className="formlabel">Escolha o Tipo de Pagamento:</label>
                        <div className="payment-options">
                            <div className="payment-option-container">
                                <label className={`payment-option ${paymentType === 'boleto' ? 'active' : ''}`}>
                                    <input
                                        className='formradio'
                                        type="radio"
                                        name="paymentType"
                                        value="boleto"
                                        checked={paymentType === 'boleto'}
                                        onChange={handlePaymentTypeChange}
                                    />
                                    Boleto
                                </label>
                            </div>
                            <div className="payment-option-container">
                                <label className={`payment-option ${paymentType === 'pix' ? 'active' : ''}`}>
                                    <input
                                        className='formradio'
                                        type="radio"
                                        name="paymentType"
                                        value="pix"
                                        checked={paymentType === 'pix'}
                                        onChange={handlePaymentTypeChange}
                                    />
                                    PIX
                                </label>
                            </div>
                            <div className="payment-option-container">
                                <label className={`payment-option ${paymentType === 'cartao' ? 'active' : ''}`}>
                                    <input
                                        className='formradio'
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
                    </div>

                    {/* Detalhes do Pagamento */}
                    {paymentType && (
                        <div id="paymentDetails" className="payment-details">
                            {paymentType === 'boleto' && (
                                <div className="form-group">
                                    <label className="formlabel" htmlFor="boletoNumber">Número do Boleto:</label>
                                    <input className="forminput" type="text" id="boletoNumber" name="boletoNumber" />
                                </div>
                            )}
                            {paymentType === 'pix' && (
                                <div className="pix-section">
                                    <div className="qr-code-container">
                                        <p>Escaneie o QR Code com seu aplicativo de banco</p>
                                        <QRCodeSVG value={pixKey} size={256} level="H" />
                                    </div>
                                    <br />
                                    <p>ou</p>
                                    <p>Chave PIX da Empresa:</p>
                                    <div className="form-group">
                                        <div className="pix-key d-flex">
                                            <input readOnly value={pixKey} />
                                            <CopyIcon onClick={() => copyToClipboard(pixKey)} />
                                        </div>
                                    </div>
                                </div>
                            )}
                            {paymentType === 'cartao' && (
                                <div className="credit-card-container">
                                    <div className="credit-card-preview">
                                        <CreditCards
                                            number={cardNumber}
                                            name={cardName}
                                            expiry={cardExpiry}
                                            cvc={isCVCVisible ? cardCVC : ''}
                                            focused={isCVCVisible ? 'cvc' : ''}
                                            issuer={issuer}
                                        />
                                    </div>

                                    <div className="credit-card-form">
                                        <Row>
                                            <Col md="12" sm="12">
                                                <div className="form-group">
                                                    <label className="formlabel" htmlFor="cardName">Nome do Titular:</label>
                                                    <input
                                                        className="forminput"
                                                        type="text"
                                                        id="cardName"
                                                        name="cardName"
                                                        value={cardName}
                                                        onChange={(e) => setCardName(e.target.value)}
                                                        placeholder="Nome no Cartão"
                                                    />
                                                </div>
                                            </Col>
                                            <Col md="12" sm="12">
                                                <div className="form-group">
                                                    <label className="formlabel" htmlFor="cardNumber">Número do Cartão:</label>
                                                    <input
                                                        className="forminput"
                                                        type="text"
                                                        id="cardNumber"
                                                        name="cardNumber"
                                                        value={cardNumber}
                                                        onChange={handleCardNumberChange}
                                                        placeholder="Número do Cartão"
                                                    />
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="6" sm="6">
                                                <div className="form-group">
                                                    <label className="formlabel" htmlFor="cardExpiry">Data de Expiração:</label>
                                                    <input
                                                        className="forminput"
                                                        type="text"
                                                        id="cardExpiry"
                                                        name="cardExpiry"
                                                        value={cardExpiry}
                                                        onChange={(e) => setCardExpiry(e.target.value)}
                                                        placeholder="MM/AA"
                                                        style={{ width: '100%' }}
                                                    />
                                                </div>
                                            </Col>
                                            <Col md="6" sm="6">
                                                <div className="form-group">
                                                    <label className="formlabel" htmlFor="cardCVC">Código de Segurança:</label>
                                                    <input
                                                        className="forminput"
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
                                                        placeholder="CVV"
                                                        style={{ width: '100%' }}
                                                    />
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            )}

                            {/* Parcelamento */}
                            {paymentType === "cartao" && (
                                <Col md="12" sm="12">
                                    <div className="installments-container">
                                        <label className="formlabel" htmlFor="parcelasCartao">Escolha o número de parcelas:</label>
                                        <br />
                                        <select
                                            className="formselect"
                                            id="parcelasCartao"
                                            name="parcelas"
                                            value={installments}
                                            onChange={(e) => setInstallments(Number(e.target.value))}
                                        >
                                            {[1, 2, 3, 4, 5, 6].map(n => (
                                                <option key={n} value={n}>
                                                    {n}x de R${(totalPrice / n).toFixed(2)} sem juros
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </Col>
                            )}
                        </div>
                    )}

                    {/* Total e Botão de Pagamento */}
                    {paymentType !== 'pix' && (
                        <div>
                            <p className="text-center">Total: R${amountPerInstallment} </p>
                        </div>
                    )}
                    {paymentType !== 'pix' && (
                        <Button className="formbutton" variant="primary" type="submit">
                            Pagar
                        </Button>
                    )}
                </form>
            </Row>
        </Container>
    );
};

export default PaymentForm;
