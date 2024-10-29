import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import CreditCards from 'react-credit-cards-2';
import { QRCodeSVG } from 'qrcode.react';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import '../css/Payment.css';
import { CopyIcon } from 'lucide-react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { PDFDocument, rgb } from 'pdf-lib';
import JsBarcode from 'jsbarcode';

const PaymentForm = ({ selectedPlan, completeStep }) => {
    const [paymentType, setPaymentType] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cardExpiry, setCardExpiry] = useState('');
    const [cardCVC, setCardCVC] = useState('');
    const [cardName, setCardName] = useState('');
    const [issuer, setIssuer] = useState('');
    const [isCVCVisible, setIsCVCVisible] = useState(false);
    const [installments, setInstallments] = useState(1);
    const [nContas] = useState(1);
    const initialPrice = parseFloat(selectedPlan?.price) || 0;
    const [totalPrice, setTotalPrice] = useState(initialPrice * nContas);

    useEffect(() => {
        // Recalcula o preço total quando o número de contas ou preço do plano muda
        const price = parseFloat(selectedPlan?.price) || 0;
        setTotalPrice(price * nContas);
    }, [nContas, selectedPlan]);

    // Função para formatar o número e substituir vírgulas por ponto
    const formatCurrency = (value) => {
        const formattedValue = parseFloat(value).toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
        return formattedValue;
    };

    const amountPerInstallment = installments > 0 ? formatCurrency(totalPrice / installments) : '0,00';
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
    const [showPopover, setShowPopover] = useState(false);

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            setShowPopover(true);
            setTimeout(() => setShowPopover(false), 2000);
        });
    };

    const popover = (
        <Popover id="popover-basic">
            <Popover.Body>Chave PIX copiada!</Popover.Body>
        </Popover>
    );

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

        let input = e.target.value.replace(/\D/g, ''); // Remove tudo que não for número
        if (input.length > 16) {
            input = input.slice(0, 16);
        }

        // Adiciona espaços a cada 4 dígitos
        const formattedInput = input.replace(/(.{4})/g, '$1 ').trim();
        setCardNumber(formattedInput);


    };

    const handleCardExpiryChange = (e) => {
        let input = e.target.value.replace(/\D/g, ''); // Remove tudo que não for número
        if (input.length > 4) {
            input = input.slice(0, 4); // Limita a 4 dígitos
        }

        // Adiciona barra após o segundo dígito 
        if (input.length >= 3) {
            input = `${input.slice(0, 2)}/${input.slice(2, 4)}`;
        }
        setCardExpiry(input);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }))
        if (name === 'cpf') {
            let input = value.replace(/\D/g, ''); // Remove tudo que não for número
            if (input.length > 11) {
                input = input.slice(0, 11);
            }

            // Formata o CPF 
            if (input.length > 9) {
                input = `${input.slice(0, 3)}.${input.slice(3, 6)}.${input.slice(6, 9)}-${input.slice(9, 11)}`;
            } else if (input.length > 6) {
                input = `${input.slice(0, 3)}.${input.slice(3, 6)}.${input.slice(6, 9)}`;
            } else if (input.length > 3) {
                input = `${input.slice(0, 3)}.${input.slice(3, 6)}`;
            }

            setFormData({
                ...formData,
                [name]: input
            });
        }
        else if (name === 'CEP') {
            let input = value.replace(/\D/g, ''); // Remove tudo que não for número
            if (input.length > 8) {
                input = input.slice(0, 8);
            }
            if (input.length > 5) {
                input = `${input.slice(0, 5)}-${input.slice(5, 8)}`;
            }

            setFormData({
                ...formData,
                [name]: input
            });
        }
    };
    const generateBoletoPDF = async () => {
        if (!formData) {
            console.error("formData está indefinido.");
            return;
        }

        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([595, 400]);
        const { height } = page.getSize();

        const fontBold = await pdfDoc.embedFont('Helvetica-Bold');
        const fontRegular = await pdfDoc.embedFont('Helvetica');

        const { bankName, agencyNumber, accountNumber, name, cpf, address, city, state, zipCode, phone } = formData;

        // Dados do boleto
        const today = new Date();
        const todayFormatted = today.toLocaleDateString('pt-BR');
        const dueDate = new Date(today.setDate(today.getDate() + 7));
        const dueDateFormatted = dueDate.toLocaleDateString('pt-BR');
        const boletoNumber = '23791.12345 54321.678901 23456.789012 3 87640000050000';

        // Cálculo de multa e juros
        const amount = totalPrice.toFixed(2);

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
        drawSection(0, height - 1, 595, 40);
        page.drawText(`${bankName} `, { x: 30, y: height - 26, size: 12, font: fontRegular });
        drawSection(200, height - 1, 595, 40);
        page.drawText(`${agencyNumber} `, { x: 130, y: height - 26, size: 12, font: fontRegular });
        drawSection(200, height - 1, 595, 40);
        page.drawText(`${boletoNumber}`, { x: 220, y: height - 26, size: 12, font: fontRegular });
        drawSection(100, height - 1, 595, 40);

        drawSection(0, height - 41, 200, 120);
        drawSection(410, height - 41, 185, 120);
        drawSection(200, height - 41, 210, 120);

        drawSection(410, height - 41, 185, 30);
        drawSection(410, height - 102, 185, 30);
        page.drawText(`Data do Documento: ${todayFormatted}`, { x: 421, y: height - 60, size: 12, font: fontRegular });
        page.drawText(`Vencimento: ${dueDateFormatted}`, { x: 422, y: height - 90, size: 12, font: fontRegular });
        page.drawText(`Num Conta: ${accountNumber}`, { x: 422, y: height - 120, size: 12, font: fontRegular });
        page.drawText(`Valor: R$ ${amount}`, { x: 422, y: height - 150, size: 12, font: fontRegular });

        drawSection(200, height - 41, 210, 30);
        drawSection(200, height - 102, 210, 30);
        // Informações da coluna esquerda
        page.drawText(`Nome: ${name}`, { x: 10, y: height - 63, size: 12, font: fontRegular });
        drawSection(0, height - 41, 200, 35);
        page.drawText(`CPF: ${cpf}`, { x: 10, y: height - 98, size: 12, font: fontRegular });
        drawSection(0, height - 111, 200, 50);
        page.drawText(`Endereço: ${address}`, { x: 10, y: height - 130, size: 12, font: fontRegular });

        // Informações da coluna direita
        page.drawText(`Cidade: ${city} `, { x: 215, y: height - 60, size: 12, font: fontRegular });
        page.drawText(`Estado:  ${state} `, { x: 215, y: height - 90, size: 12, font: fontRegular });
        page.drawText(`CEP: ${zipCode} `, { x: 215, y: height - 120, size: 12, font: fontRegular });
        page.drawText(`Telefone: ${phone}`, { x: 215, y: height - 150, size: 12, font: fontRegular });

        // Seção de multa
        drawSection(0, height - 161, 595, 135);
        page.drawText('Instruções de Pagamento:', {
            x: 20,
            y: height - 180,
            size: 12,
            font: fontBold,
            color: rgb(0, 0, 0)
        });
        drawSection(410, height - 161, 405, 135);
        page.drawText('Desconto / Abatimentos:', { x: 421, y: height - 182, size: 12, font: fontRegular });
        page.drawText('Outras deduções:', { x: 422, y: height - 216, size: 12, font: fontRegular });
        page.drawText('Multa:', { x: 422, y: height - 252, size: 12, font: fontRegular });
        page.drawText('Outros acréscimos:', { x: 422, y: height - 285, size: 12, font: fontRegular });

        drawSection(410, height - 195, 405, 35);
        drawSection(410, height - 230, 405, 35);

        page.drawText('Após o vencimento, multa de 2% e juros de 1% ao mês.', {
            x: 20,
            y: height - 200,
            size: 10,
            font: fontRegular,
            color: rgb(0, 0, 0)
        });

        // Gerar código de barras
        const barcodeCanvas = document.createElement('canvas');
        JsBarcode(barcodeCanvas, boletoNumber, { format: 'CODE128', displayValue: false });
        const barcodeImageData = barcodeCanvas.toDataURL('image/png');
        const barcodeImage = await pdfDoc.embedPng(barcodeImageData);
        page.drawText('Sacado: ', {
            x: 10, y: height - 310, size: 12, font: fontRegular
        })
        page.drawImage(barcodeImage, {
            x: 20,
            y: height - 390,
            width: 405,
            height: 70,
        });

        // Seção do código de barras
        drawSection(0, height - 296, 595, 120);

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

        if (paymentType === 'boleto') {
            generateBoletoPDF();
        } else {
            alert(`Pagamento de R$${amountPerInstallment} para o plano ${selectedPlan.name} foi processado com sucesso!`);
        }
    };


    const handleProceed = () => {
        // Lógica para prosseguir
        console.log("Prosseguindo com o pagamento...");
        if (completeStep) completeStep(); // Chama a função de callback passada por props
    };
    return (
        <Container className="formContainer">
            <Row>
                <form className="payment-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="formlabel">Escolha o Tipo de Pagamento:</label>
                        <div className="payment-options">
                            <div className="payment-option-container">
                                <label
                                    className={`payment-option ${paymentType === 'boleto' ? 'active' : ''}`}
                                    htmlFor="boleto"
                                    tabIndex={0} 
                                    onClick={() => handlePaymentTypeChange({ target: { value: 'boleto' } })} // Chama a mudança de pagamento ao clicar com o mouse
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            handlePaymentTypeChange({ target: { value: 'boleto' } }); // Chama a mudança de pagamento com o teclado
                                        }
                                    }}
                                >
                                    Boleto
                                </label>
                            </div>

                            <div className="payment-option-container">
                                <label
                                    className={`payment-option ${paymentType === 'pix' ? 'active' : ''}`}
                                    htmlFor="pix"
                                    tabIndex={0} 
                                    onClick={() => handlePaymentTypeChange({ target: { value: 'pix' } })} // Chama a mudança de pagamento ao clicar com o mouse
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            handlePaymentTypeChange({ target: { value: 'pix' } }); // Chama a mudança de pagamento com o teclado
                                        }
                                    }}
                                >
                                    PIX
                                </label>
                            </div>

                            <div className="payment-option-container">
                                <label
                                    className={`payment-option ${paymentType === 'cartao' ? 'active' : ''}`}
                                    htmlFor="cartao"
                                    tabIndex={0}
                                    onClick={() => handlePaymentTypeChange({ target: { value: 'cartao' } })} // Chama a mudança de pagamento ao clicar com o mouse
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            handlePaymentTypeChange({ target: { value: 'cartao' } }); // Chama a mudança de pagamento com o teclado
                                        }
                                    }}
                                >
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
                                                    placeholder='Nome:'
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
                                                    placeholder='CPF:'
                                                    className='forminput'
                                                    id="cpf"
                                                    name="cpf"
                                                    type="text"
                                                    maxLength={14}
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
                                                    placeholder='Nome do banco'
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
                                            <OverlayTrigger show={showPopover} placement="right" overlay={popover}>
                                                <span onClick={() => copyToClipboard(pixKey)} style={{ cursor: 'pointer' }}>
                                                    <CopyIcon />
                                                </span>
                                            </OverlayTrigger>
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
                                                        maxLength="19"
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
                                                        onChange={handleCardExpiryChange}
                                                        placeholder="MM/AA"
                                                        style={{ width: '100%' }}
                                                        maxLength="5"
                                                    />
                                                </div>
                                            </Col>
                                            <Col md="6" sm="6">
                                                <div className="form-group">
                                                    <label className="formlabel" htmlFor="cardCVC">Código de Segurança:</label>
                                                    <input
                                                        className="forminput"
                                                        type="password"
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
                                                        maxLength="4"
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
                                                        {n}x de R${formatCurrency(totalPrice / n)} sem juros
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
                            <p className="text-center">
                                Total: R${formatCurrency(totalPrice)} (ou {installments}x de R${amountPerInstallment} sem juros)
                            </p>
                            <Button className="formbutton" variant="primary" type="submit">
                                Pagar
                            </Button>
                        </div>
                    )}

                    {paymentType !== 'pix' && paymentType !== 'boleto' && paymentType !== 'cartao' && (
                        <p className="text-center">Total: R${totalPrice.toFixed(2)}</p>
                    )}


                    {paymentType === 'boleto' && (
                        <div className="button-container">
                            <Button className='my-2 mt-4 buttonboleto' onClick={generateBoletoPDF}>Gerar Boleto</Button>
                        </div>
                    )}
                </form>

            </Row>
            <Button
                onClick={handleProceed}
                disabled={!paymentType}
                className="mt-3 btnCreate"
            >
                Prosseguir
            </Button>
        </Container>
    );
};

export default PaymentForm;


