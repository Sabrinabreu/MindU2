import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import CreditCards from 'react-credit-cards-2';
import { QRCodeSVG } from 'qrcode.react';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import '../css/Payment.css';
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
    const documentNumber = '123.456.789-01'; // Número de documento fictício
    const today = new Date();
    const dueDateGenerated = new Date(today.setDate(today.getDate() + 7)).toLocaleDateString('pt-BR'); // Data de vencimento para 7 dias à frente
    const boletoNumber = '23791.12345 54321.678901 23456.789012 3 87640000050000';
    const [selectedAgencyNumber, setSelectedAgencyNumber] = useState('');
    const agencyNumber = selectedAgencyNumber || "Agência não informada";


    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        cpf: '',
        bankName: '',
        agencyNumber: '',
        accountNumber: ''
    });
    const pixKey = '12.345.678/0001-95';
    const handleAgencyNumberChange = (e) => {
        setSelectedAgencyNumber(e.target.value);
    };


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
        if (!formData) {
            console.error("formData está indefinido.");
            return;
        }

        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([595, 842]); // Tamanho A4 padrão
        const { width, height } = page.getSize();


        const { bankName, agencyNumber, name, cpf, address, city, state, zipCode, phone } = formData;

        // Dados do boleto
        const today = new Date();
        const todayFormatted = today.toLocaleDateString('pt-BR'); // Data do documento (hoje)
        const dueDate = new Date(today.setDate(today.getDate() + 7)); // Data de vencimento para 7 dias à frente
        const dueDateFormatted = dueDate.toLocaleDateString('pt-BR');
        const nossoNumero = '123456789012'; // Gerar nosso número aleatório ou conforme a lógica da sua aplicação
        const boletoNumber = '23791.12345 54321.678901 23456.789012 3 87640000050000'; // Exemplo de número do boleto

        const amount = totalPrice.toFixed(2); // Valor total do boleto

        const drawSection = (x, y, width, height, borderWidth = 0.5) => {
            page.drawRectangle({
                x: x,
                y: y - height,
                width: width,
                height: height,
                borderColor: rgb(0, 0, 0),
                borderWidth: borderWidth,
            });
        };

        // Seção do banco
        drawSection(0, height - 100, 595, 40); // Borda sem margem, ajustada para ocupar toda a largura da página
        page.drawText(` ${bankName} ${agencyNumber}  ${boletoNumber}`, { x: 10, y: height - 60, size: 12 });


        // Seção do cedente dividida em duas colunas
        drawSection(0, height - 150, 300, 140); // Coluna esquerda
        drawSection(300, height - 150, 300, 140); // Coluna direita

        // Informações da coluna esquerda
        page.drawText(`Nome: ${name}`, { x: 6, y: height - 220, size: 12 });
        page.drawText(`CPF: ${cpf}`, { x: 6, y: height - 240, size: 12 });
        page.drawText(`Endereço: ${address}`, { x: 6, y: height - 260, size: 12 });

        // Informações da coluna direita
        page.drawText(`Cidade: ${city}`, { x: 310, y: height - 220, size: 12 });
        page.drawText(`Estado: ${state}`, { x: 310, y: height - 240, size: 12 });
        page.drawText(`CEP: ${zipCode}`, { x: 310, y: height - 260, size: 12 });
        page.drawText(`Telefone: ${phone}`, { x: 310, y: height - 280, size: 12 });

        // Seção de vencimento e valores
        drawSection(0, height - 290, 595, 50); // Ajustado para a largura total da página
        page.drawText(`Data do Documento: ${todayFormatted}`, { x: 10, y: height - 295, size: 12 });
        page.drawText(`Vencimento: ${dueDateFormatted}`, { x: 10, y: height - 315, size: 12 });
        page.drawText(`Valor: R$ ${amount}`, { x: 10, y: height - 335, size: 12 });

        // Gerar código de barras ocupando toda a largura da seção
        const barcodeCanvas = document.createElement('canvas');
        JsBarcode(barcodeCanvas, boletoNumber, { format: 'CODE128', displayValue: false });
        const barcodeImageData = barcodeCanvas.toDataURL('image/png');
        const barcodeImage = await pdfDoc.embedPng(barcodeImageData);
        page.drawImage(barcodeImage, {
            x: 0,
            y: height - 430,
            width: 595,
            height: 40,
        });

        // Seção do código de barras
        drawSection(0, height - 470, 595, 40); // Ajustado para a largura total da página

        const pdfBytes = await pdfDoc.save();
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
                                <>
                                    <Row>
                                        <Col md='6'>
                                            <div className="form-group">
                                                <label htmlFor="name">Nome:</label>
                                                <input
                                                    className='forminput'
                                                    id="name"
                                                    name="name"
                                                    type="text"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                        </Col>

                                        <Col md='6'>
                                            <div className="form-group">
                                                <label htmlFor="cpf">CPF:</label>
                                                <input
                                                    className='forminput'
                                                    id="cpf"
                                                    name="cpf"
                                                    type="text"
                                                    value={formData.cpf}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                        </Col>

                                        <Col md='6'>
                                            <div className="form-group">
                                                <label htmlFor="bankName">Nome do Banco:</label>
                                                <input
                                                    className='forminput'
                                                    id="bankName"
                                                    name="bankName"
                                                    type="text"
                                                    value={formData.bankName}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                        </Col>

                                        <Col md='3'>
                                            <div className="form-group">
                                                <label htmlFor="agencyNumber">Número da Agência:</label>
                                                <select
                                                    className='forminput'
                                                    id="agencyNumber"
                                                    name="agencyNumber"
                                                    value={formData.agencyNumber}
                                                    onChange={handleInputChange}
                                                    required
                                                >
                                                    <option value="">Selecione a Agência</option>
                                                    <option value="1234">Agência 1234</option>
                                                    <option value="5678">Agência 5678</option>
                                                    <option value="9101">Agência 9101</option>
                                                    {/* Adicione mais opções conforme necessário */}
                                                </select>
                                            </div>
                                        </Col>

                                        <Col md='3'>
                                            <div className="form-group">
                                                <label htmlFor="accountNumber">Número da Conta:</label>
                                                <input
                                                    className='forminput'
                                                    id="accountNumber"
                                                    name="accountNumber"
                                                    type="text"
                                                    value={formData.accountNumber}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                        </Col>

                                        <Col md='6'>
                                            <div className="form-group">
                                                <label htmlFor="address">Endereço:</label>
                                                <input
                                                    className='forminput'
                                                    id="address"
                                                    name="address"
                                                    type="text"
                                                    value={formData.address}
                                                    onChange={handleInputChange}
                                                    placeholder="Endereço completo"
                                                    required
                                                />
                                            </div>
                                        </Col>

                                        <Col md='6'>
                                            <div className="form-group">
                                                <label htmlFor="city">Cidade:</label>
                                                <input
                                                    className='forminput'
                                                    id="city"
                                                    name="city"
                                                    type="text"
                                                    value={formData.city}
                                                    onChange={handleInputChange}
                                                    placeholder="Cidade"
                                                    required
                                                />
                                            </div>
                                        </Col>

                                        <Col md='4'>
                                            <div className="form-group">
                                                <label htmlFor="state">Estado:</label>
                                                <input
                                                    className='forminput'
                                                    id="state"
                                                    name="state"
                                                    type="text"
                                                    value={formData.state}
                                                    onChange={handleInputChange}
                                                    placeholder="Estado"
                                                    required
                                                />
                                            </div>
                                        </Col>

                                        <Col md='4'>
                                            <div className="form-group">
                                                <label htmlFor="zipCode">CEP:</label>
                                                <input
                                                    className='forminput'
                                                    id="zipCode"
                                                    name="zipCode"
                                                    type="text"
                                                    value={formData.zipCode}
                                                    onChange={handleInputChange}
                                                    placeholder="CEP"
                                                    required
                                                />
                                            </div>
                                        </Col>

                                        <Col md='4'>
                                            <div className="form-group">
                                                <label htmlFor="phone">Telefone:</label>
                                                <input
                                                    className='forminput'
                                                    id="phone"
                                                    name="phone"
                                                    type="text"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    placeholder="Telefone"
                                                    required
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                </>
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
                                <>
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

                             </>
                            )}
                        </div>
                    )}

                    {/* Total e Botão de Pagamento */}
                    {paymentType === 'cartao' && (
                        <div>
                            <p className="text-center">Total: R${amountPerInstallment} </p>
                        <Button className="formbutton" variant="primary" type="submit">
                        Pagar
                    </Button>
                    </div>
                    )}
                    {paymentType !== 'pix' && paymentType !== 'boleto' && paymentType !== 'cartao' &&(
                    <p className="text-center">Total: R${amountPerInstallment} </p>
                    )}
                    {paymentType === 'boleto' && (
                        <div className="button-container">
                            <Button className='my-2 mt-4 buttonboleto' onClick={generateBoletoPDF}>Gerar Boleto</Button>
                        </div>
                    )}
                </form>
            </Row>
        </Container>
    );
};

export default PaymentForm;


