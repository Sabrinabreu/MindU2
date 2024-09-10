
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import PaymentForm from './Pagamento';  // Importe o formulário de pagamento
import '../css/ModalPag.css'

const MyVerticallyCenteredModal = ({ show, onHide, planName, planPrice }) => {
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header
                closeButton
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    textAlign: 'center',
                    position: 'relative'
                }}
            >
                <Modal.Title
                    id="contained-modal-title-vcenter"
                    style={{ flex: 1, textAlign: 'center' }}
                >
                    Plano Selecionado: {planName}
                    <br />
                    Preço total: R$ {planPrice}
                </Modal.Title>

            </Modal.Header>
            <Modal.Body>
                <PaymentForm selectedPlan={{ name: planName, price: planPrice }} />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}>Fechar</Button>
            </Modal.Footer>
        </Modal>

    );
};

export default MyVerticallyCenteredModal;
