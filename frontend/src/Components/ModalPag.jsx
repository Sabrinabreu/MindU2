import { Modal, Button } from 'react-bootstrap';
import PaymentForm from './Pagamento';
import '../css/ModalPag.css';
import { X } from 'lucide-react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import PagFuncionarios from '../Components/PagFuncionários';
import axios from "axios";
import CriarContasFuncionarios from './CriarContasFuncionarios';
import { useState, useEffect } from 'react';

const MyVerticallyCenteredModal = ({ show, onHide, planName, planPrice, selectedPlan, empresaId }) => {
    const [nContas, setNContas] = useState(1);
    const [resultados, setResultados] = useState([]);
    const [activeTab, setActiveTab] = useState("home");
    const [completedSteps, setCompletedSteps] = useState([false, false, false]);
    const [totalPrice, setTotalPrice] = useState(planPrice ? planPrice : 0);
    const [data, setData] = useState(null);

    console.log("plano selecionado: ", selectedPlan)

    // Atualiza o preço total sempre que o número de contas mudar
    useEffect(() => {
        setTotalPrice(planPrice * nContas);
    }, [nContas, planPrice]);

    const formatCurrency = (value) => {
        return parseFloat(value).toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    };

    const handleTabSelect = (key) => {
        const tabIndex = key === "home" ? 0 : key === "profile" ? 1 : 2;

        if (tabIndex > 0 && !completedSteps[tabIndex - 1]) {
            return;
        }
        setActiveTab(key);
    };

    const handleSubmitPurchase = async () => {
        const purchaseData = {
            id_empresa: empresaId, 
            id_plano: selectedPlan?.id, 
            qtd_funcionarios: nContas,
        };

        try {
            const response = await axios.post('http://localhost:3001/api/compras', purchaseData);
            console.log('Compra salva com sucesso:', response.data);
            setData(response.data);
        } catch (error) {
            console.error('Erro ao enviar a compra:', error);
        }
    };

    const completeStep = (stepIndex) => {
        const updatedSteps = [...completedSteps];
        updatedSteps[stepIndex] = true;
        setCompletedSteps(updatedSteps);

        if (stepIndex === 1) {
            handleSubmitPurchase();
        }

        if (stepIndex < 2) {
            setActiveTab(stepIndex === 0 ? "profile" : "contact");
        }
    };

    const resetSteps = () => {
        setCompletedSteps([false, false, false]); // Reinicia as fases
        setActiveTab("home"); // Volta para a primeira aba
    };    

    return (
        <Modal
            show={show}
            onHide={() => {
                resetSteps();
                onHide();
            }}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter" style={{ flex: 1, textAlign: 'center' }}>
              Plano Selecionado: {selectedPlan?.nome || "Nenhum Plano"}
              <br />
              Preço total: R$ {formatCurrency(totalPrice)}
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='centralizar'>
                    <Tabs
                        activeKey={activeTab}
                        onSelect={handleTabSelect}
                        id="controlled-tab-example"
                        className="mb-3 tabpag"
                    >
                        <Tab className='tab' eventKey="home" title="Passo 1: Escolha a qnt de contas">
                            <PagFuncionarios setNContas={setNContas} nContas={nContas} completeStep={() => completeStep(0)} />
                        </Tab>
                        <Tab className='tab' eventKey="profile" title="Passo 2: Pagamento" disabled={!completedSteps[0]}>
                            <PaymentForm selectedPlan={{ name: planName, price: totalPrice }} completeStep={() => completeStep(1)} />
                        </Tab>
                        <Tab className='tab' eventKey="contact" title="Passo 3: Criar Contas" disabled={!completedSteps[1]}>
                            <CriarContasFuncionarios
                            nContas={nContas}
                            empresaId={empresaId}
                            planoSelecionado={selectedPlan}
                            setResultados={setResultados}
                            onHide={() => {
                                resetSteps(); // Reinicia as fases
                                onHide(); // Fecha o modal
                            }}
                            />
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