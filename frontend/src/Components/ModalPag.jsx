import { Modal, Button } from 'react-bootstrap';
import PaymentForm from './Pagamento'; 
import '../css/ModalPag.css'
import { X } from 'lucide-react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import PagFuncionarios from '../Components/PagFuncionários';
import CriarContasFuncionarios from './CriarContasFuncionarios';
import { useState, useEffect } from 'react';

const MyVerticallyCenteredModal = ({ show, onHide, planName, planPrice }) => {
    const [nContas, setNContas] = useState(1);
    const [resultados, setResultados] = useState([]);
    const [activeTab, setActiveTab] = useState("home"); // Estado para controlar a aba ativa
    const [completedSteps, setCompletedSteps] = useState([false, false, false]); // Estado para controlar quais passos foram completados
    const [totalPrice, setTotalPrice] = useState(planPrice ? planPrice : 0); // Estado para o preço total

    // Atualiza o preço total sempre que o número de contas ou o preço do plano mudar
    useEffect(() => {
        const price = planPrice || 0; // Garante que planPrice não seja indefinido
        setTotalPrice(price * nContas);
    }, [nContas, planPrice]);
    // Função para formatar o número e substituir vírgulas por pontos no input
    const formatCurrency = (value) => {
        // Converte o valor para float e depois formata para moeda brasileira
        const formattedValue = parseFloat(value).toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
        return formattedValue;
    };

    // Converte o valor formatado em string (com vírgulas) para um número parseável
    const parseCurrency = (value) => {
        return parseFloat(value.replace(/\./g, '').replace(',', '.')) || 0;
    };

    const handleTabSelect = (key) => {
        const tabIndex = key === "home" ? 0 : key === "profile" ? 1 : 2;

        // Permite mudar para a próxima aba apenas se o passo anterior foi completado
        if (tabIndex > 0 && !completedSteps[tabIndex - 1]) {
            return; // Não faz nada se a aba não está habilitada
        }
        setActiveTab(key);
    };

    const completeStep = (stepIndex) => {
        const updatedSteps = [...completedSteps];
        updatedSteps[stepIndex] = true; // Marca o passo como completado
        setCompletedSteps(updatedSteps);

        // Muda para a próxima aba automaticamente
        if (stepIndex < 2) {
            setActiveTab(stepIndex === 0 ? "profile" : "contact");
        }
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title
                    id="contained-modal-title-vcenter"
                    style={{ flex: 1, textAlign: 'center' }}
                >
                    Plano Selecionado: {planName}
                    <br />
                    Preço total: R$ {formatCurrency(totalPrice.toFixed(2))} {/* Atualizando para o preço total */}
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
                        {/* Primeiro passo: PagFuncionarios */}
                        <Tab className='tab' eventKey="home" title="Passo 1: Escolha a qnt de contas">
                            <PagFuncionarios setNContas={setNContas} nContas={nContas} completeStep={() => completeStep(0)} />
                        </Tab>

                        {/* Segundo passo: Pagamento */}
                        <Tab className='tab' eventKey="profile" title="Passo 2: Pagamento" disabled={!completedSteps[0]}>
                            <PaymentForm selectedPlan={{ name: planName, price: totalPrice }} completeStep={() => completeStep(1)} />
                        </Tab>

                        {/* Terceiro passo: Criar Contas */}
                        <Tab className='tab' eventKey="contact" title="Passo 3: Criar Contas" disabled={!completedSteps[1]}>
                            <CriarContasFuncionarios nContas={nContas} setResultados={setResultados} />
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

