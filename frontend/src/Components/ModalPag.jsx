
import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import PaymentForm from './Pagamento';

const planPrices = {
    'Bem-Estar': 5199,
    'Equilíbrio': 10349,
    'Transformação': 16499,
};

const MyVerticallyCenteredModal = (props) => {
    const [selectedPlan, setSelectedPlan] = useState(props.plan || '');

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
                <PaymentForm plan={selectedPlan} planPrices={planPrices} />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Fechar</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default MyVerticallyCenteredModal;
