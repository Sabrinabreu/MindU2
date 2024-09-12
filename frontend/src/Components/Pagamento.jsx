import React, { useState, useEffect } from 'react';
import {Button, Col, Container, Row } from 'react-bootstrap';
import CreditCards from 'react-credit-cards-2';
import { QRCodeSVG } from 'qrcode.react';
import '../css/Payment.css';  // Aqui você pode adicionar suas estilizações
import { CopyIcon } from 'lucide-react';
import { PDFDocument, rgb } from 'pdf-lib';
import JsBarcode from 'jsbarcode';
const PaymentForm = ({ selectedPlan }) => {
    const [paymentType, setPaymentType] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cardExpiry, setCardExpiry] = useState('');
    const [cardCVC, setCardCVC] = useState('');
    const [cardName, setCardName] = useState('');
    const [issuer, setIssuer] = useState('');
    const [isCVCVisible, setIsCVCVisible] = useState(false);
    const [installments, setInstallments] = useState(1);
    const [totalPrice, setTotalPrice] = useState(selectedPlan.price || 0);
    const [boletoURL, setBoletoURL] = useState(''); // Para armazenar a URL do boleto gerado

    const pixKey = '12.345.678/0001-95';
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        cpf: '' // Adicionado para CPF no boleto
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
    const generateBoletoPDF = async () => {
        // Dados fictícios do boleto
        const boletoNumber = '12345678901234567890123456789012345678901234';
        const dueDate = '30/09/2024';
        const amount = 'R$ 100,00';
        const bankName = 'Banco Bradesco';
        const agencyNumber = '1234';
        const accountNumber = '56789-0';
        const ourNumber = '12345678901234';
        const customerName = 'Cliente Exemplo';
        const documentNumber = '12345678900';

        // Criar um novo documento PDF
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([600, 300]);

        // Adicionar logo do Banco Bradesco
        // Nota: Você pode carregar uma imagem com pdfDoc.embedPng ou pdfDoc.embedJpg se tiver o logo em formato de imagem.
        // Exemplo: const logoImage = await pdfDoc.embedPng(logoImageData);

        // Adicionar o texto e informações do boleto
        const { width, height } = page.getSize();

        // Cabeçalho
        page.drawText('Banco Bradesco', { x: 50, y: height - 50, size: 20, color: rgb(0, 0, 0), font: await pdfDoc.embedFont('Helvetica-Bold') });
        page.drawText('BOLETO BANCÁRIO', { x: 50, y: height - 80, size: 16, color: rgb(0, 0, 0) });

        // Informações do beneficiário
        page.drawText(`Nome: ${customerName}`, { x: 50, y: height - 110, size: 14, color: rgb(0, 0, 0) });
        page.drawText(`CNPJ/CPF: ${documentNumber}`, { x: 50, y: height - 130, size: 14, color: rgb(0, 0, 0) });
        page.drawText(`Agência: ${agencyNumber} / Conta: ${accountNumber}`, { x: 50, y: height - 150, size: 14, color: rgb(0, 0, 0) });
        page.drawText(`Nosso Número: ${ourNumber}`, { x: 50, y: height - 170, size: 14, color: rgb(0, 0, 0) });

        // Informações do pagamento
        page.drawText(`Data de Vencimento: ${dueDate}`, { x: 50, y: height - 200, size: 14, color: rgb(0, 0, 0) });
        page.drawText(`Valor: ${amount}`, { x: 50, y: height - 220, size: 14, color: rgb(0, 0, 0) });

        // Gerar código de barras
        const barcodeCanvas = document.createElement('canvas');
        JsBarcode(barcodeCanvas, boletoNumber, { format: 'CODE128', displayValue: false });
        const barcodeImageData = barcodeCanvas.toDataURL('image/png');

        // Adicionar código de barras ao PDF
        const barcodeImage = await pdfDoc.embedPng(barcodeImageData);
        page.drawImage(barcodeImage, { x: 50, y: height - 260, width: 500, height: 80 });

        // Linha Digitável
        page.drawText('Linha Digitável:', { x: 50, y: height - 340, size: 14, color: rgb(0, 0, 0) });
        page.drawText(boletoNumber, { x: 50, y: height - 360, size: 14, color: rgb(0, 0, 0) });

        // Rodapé
        page.drawText('Instruções de Pagamento:', { x: 50, y: 30, size: 12, color: rgb(0, 0, 0) });
        page.drawText('Após o vencimento, multa de 2% e juros de 1% ao mês.', { x: 50, y: 10, size: 12, color: rgb(0, 0, 0) });

        // Salvar o PDF
        const pdfBytes = await pdfDoc.save();

        // Criar um blob e baixar o PDF
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'boleto.pdf';
        link.click();
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        const amountPerInstallment = (totalPrice / installments).toFixed(2);

        if (paymentType === 'boleto') {
            generateBoletoPDF();
        } else {
            alert(`Pagamento de R$${amountPerInstallment} por parcela para o plano ${selectedPlan.name} foi processado com sucesso!`);
        }
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
                    <div className="form-group">
                        <label className="formlabel" htmlFor="cpf">CPF:</label>
                        <input
                            className="forminput"
                            type="text"
                            id="cpf"
                            name="cpf"
                            value={formData.cpf}
                            onChange={handleInputChange}
                            placeholder="Seu CPF"
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
                                <div className="button-container">
                                    <button className='buttonboleto' onClick={generateBoletoPDF}>Gerar Boleto</button>
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

                    {/* Exibição do Boleto */}

                </form>
            </Row>
        </Container>
    );
};

export default PaymentForm;

