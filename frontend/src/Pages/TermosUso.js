import React from "react";
import "../css/Termos.css"; // Importe o arquivo de estilo

const Termos = () => {
  return (
    <div className="termos-container">
      <h2 className="termos-title">1. Termos</h2>
      <p className="termos-text">
        Ao acessar o site <a href="https://MindU.com/">MindU</a>, concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis e concorda que é responsável pelo cumprimento de todas as leis locais aplicáveis. Se você não concordar com algum desses termos, está proibido de usar ou acessar este site. Os materiais contidos neste site são protegidos pelas leis de direitos autorais e marcas comerciais aplicáveis.
      </p>

      <h2 className="termos-title">2. Uso de Licença</h2>
      <p className="termos-text">
        É concedida permissão para baixar temporariamente uma cópia dos materiais (informações ou software) no site MindU, apenas para visualização transitória pessoal e não comercial. Esta é a concessão de uma licença, não uma transferência de título e, sob esta licença, você não pode:
      </p>
      <ol className="termos-list">
        <li className="termos-text">modificar ou copiar os materiais;</li>
        <li className="termos-text">usar os materiais para qualquer finalidade comercial ou para exibição pública;</li>
        <li className="termos-text">tentar descompilar ou fazer engenharia reversa de qualquer software contido no site MindU;</li>
        <li className="termos-text">remover quaisquer direitos autorais ou outras notações de propriedade dos materiais;</li>
        <li className="termos-text">transferir os materiais para outra pessoa ou 'espelhe' os materiais em qualquer outro servidor.</li>
      </ol>
      <p className="termos-text">
        Esta licença será automaticamente rescindida se você violar alguma dessas restrições e poderá ser rescindida por MindU a qualquer momento. Ao encerrar a visualização desses materiais ou após o término desta licença, você deve apagar todos os materiais baixados em sua posse, seja em formato eletrônico ou impresso.
      </p>

      <h2 className="termos-title">3. Isenção de responsabilidade</h2>
      <ol className="termos-list">
        <li className="termos-text">Os materiais no site da MindU são fornecidos 'como estão'. MindU não oferece garantias, expressas ou implícitas, e, por este meio, isenta e nega todas as outras garantias, incluindo, sem limitação, garantias implícitas ou condições de comercialização, adequação a um fim específico ou não violação de propriedade intelectual ou outra violação de direitos.</li>
        <li className="termos-text">Além disso, o MindU não garante ou faz qualquer representação relativa à precisão, aos resultados prováveis ou à confiabilidade do uso dos materiais em seu site ou de outra forma relacionado a esses materiais ou em sites vinculados a este site.</li>
      </ol>

      <h2 className="termos-title">4. Limitações</h2>
      <p className="termos-text">
        Em nenhum caso o MindU ou seus fornecedores serão responsáveis ​​por quaisquer danos (incluindo, sem limitação, danos por perda de dados ou lucro ou devido a interrupção dos negócios) decorrentes do uso ou da incapacidade de usar os materiais em MindU, mesmo que MindU ou um representante autorizado da MindU tenha sido notificado oralmente ou por escrito da possibilidade de tais danos.
      </p>

      <h2 className="termos-title">5. Precisão dos materiais</h2>
      <p className="termos-text">
        Os materiais exibidos no site da MindU podem incluir erros técnicos, tipográficos ou fotográficos. MindU não garante que qualquer material em seu site seja preciso, completo ou atual. MindU pode fazer alterações nos materiais contidos em seu site a qualquer momento, sem aviso prévio. No entanto, MindU não se compromete a atualizar os materiais.
      </p>

      <h2 className="termos-title">6. Links</h2>
      <p className="termos-text">
        O MindU não analisou todos os sites vinculados ao seu site e não é responsável pelo conteúdo de nenhum site vinculado. A inclusão de qualquer link não implica endosso por MindU do site. O uso de qualquer site vinculado é por conta e risco do usuário.
      </p>

      <h3 className="termos-subtitle">Modificações</h3>
      <p className="termos-text">
        O MindU pode revisar estes termos de serviço do site a qualquer momento, sem aviso prévio. Ao usar este site, você concorda em ficar vinculado à versão atual desses termos de serviço.
      </p>

      <h3 className="termos-subtitle">Lei aplicável</h3>
      <p className="termos-text">
        Estes termos e condições são regidos e interpretados de acordo com as leis do MindU e você se submete irrevogavelmente à jurisdição exclusiva dos tribunais naquele estado ou localidade.
      </p>
    </div>
  );
};

export default Termos;
