
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import PaymentForm from './Pagamento';  // Importe o formulário de pagamento
import '../css/ModalPag.css'
import { X } from 'lucide-react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import AcessoFuncionarios from '../Pages/AcessoFuncionarios';

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

                <div className='centralizar'>
                    <Tabs
                        defaultActiveKey="profile"
                        id="uncontrolled-tab-example"
                        className="mb-3 tabpag"
                    >
                        <Tab className='tab' eventKey="home" title="Passo 1: Crie suas contas">
                            <AcessoFuncionarios />
                        </Tab>
                        <Tab className='tab' eventKey="profile" title="Passo 2: Pagamento">
                            <PaymentForm selectedPlan={{ name: planName, price: planPrice }} />
                        </Tab>

                    </Tabs>

                </div>


            </Modal.Body>
            <Modal.Footer>
                <Button className='buttonmodal' onClick={onHide}><X /></Button>
            </Modal.Footer>
        </Modal>

    );
};

export default MyVerticallyCenteredModal;
