# Sistema MindU

Este é um sistema da empresa MindU desenvolvido em React no frontend e Node.js no backend, utilizando MySQL como banco de dados.

## Funcionalidades

- **Cadastro de Usuários:** Permite adicionar novos usuários ao sistema.
- **Listagem de Usuários:** Exibe uma lista de todos os usuários cadastrados.
- **Atualização de Usuários:** Permite atualizar as informações de um usuário existente.
- **Exclusão de Usuários:** Permite excluir um usuário do sistema.

## Pré-requisitos

Antes de iniciar, você precisa ter o Node.js e o MySQL instalados na sua máquina.

## Instalação

1. Clone este repositório:

   ```bash
   git clone https://github.com/Sabrinabreu/MindU2.git

   ```

2. Navegue até o diretório do projeto:
    ````
   cd sistema-de-cadastro
   ````

4. Instale as dependências do frontend e do backend:
   ````
   cd frontend
   npm install
   ````
   Após
   ````
   cd ../backend
   npm install
   ````

6. Configuração do Banco de Dados:
   Execute o script SQL fornecido abaixo para criar o banco de dados
   ````
   create database bancomindu;
   use bancomindu;
   CREATE TABLE planos (
       id INT AUTO_INCREMENT PRIMARY KEY,
       nome VARCHAR(100) NOT NULL,
       preco_por_funcionario DECIMAL(10, 2) NOT NULL,
       duracao INT NOT NULL,
       CONSTRAINT UNIQUE (nome)
   );
   CREATE TABLE `cadastroempresa` (
       `ID` INT AUTO_INCREMENT PRIMARY KEY,
       `nome` VARCHAR(255) NOT NULL,
       `email` VARCHAR(255) NOT NULL,
       `telefone` VARCHAR(20) NOT NULL,
       `empresa` varchar(100) not null,
       `departamento` VARCHAR(100) NOT NULL,
       `qtdfuncionarios` INT NOT NULL,	
       `planosaude` VARCHAR(100) NOT NULL,
       `contato` VARCHAR(100) NOT NULL,
       `foto_perfil` VARCHAR(255),
       `pergunta_seguranca` VARCHAR(300) NULL,
       `resposta_seguranca` VARCHAR(100) NULL,
       `senha` VARCHAR(255) NOT NULL
   );
   CREATE TABLE `contaFuncionarios` (
       `id` INT AUTO_INCREMENT PRIMARY KEY,
       `login` VARCHAR(100) NOT NULL,
       `senha` VARCHAR(255) NOT NULL,
       `empresa_id` INT NOT NULL,
       `nomePlano` VARCHAR(100) NOT NULL,
       `cpf` VARCHAR(11) NULL,
       `nome` VARCHAR(75) NULL,
       `cargo` VARCHAR(50) NULL,
       `telefone` VARCHAR(20) NULL,
       `pergunta_seguranca` VARCHAR(300) NULL,
       `resposta_seguranca` VARCHAR(100) NULL,
       `foto_perfil` VARCHAR(255),
       `loginMethod` ENUM('login_temporario', 'email') NOT NULL DEFAULT 'login_temporario',
       CONSTRAINT `fk_empresa` FOREIGN KEY (`empresa_id`) REFERENCES `cadastroempresa`(`ID`) ON DELETE CASCADE,
       CONSTRAINT `fk_plano` FOREIGN KEY (`nomePlano`) REFERENCES `planos`(`nome`) ON DELETE CASCADE ON UPDATE CASCADE
   );
   
   CREATE TABLE `psicologos` (
       `psicologo_id` INT AUTO_INCREMENT PRIMARY KEY,
       `nome` VARCHAR(255) NOT NULL,
       `dataNascimento` DATE NOT NULL,
       `genero` ENUM('Masculino', 'Feminino', 'Outro') NOT NULL,
       `telefone` VARCHAR(20),
       `email` VARCHAR(255) NOT NULL,
       `cpf` VARCHAR(11) NOT NULL,
       `senha` VARCHAR(255) NOT NULL,
       `endereco` TEXT,
       `crp` VARCHAR(255),
       `certificados` BLOB,
       `especialidade` TEXT,
       `preferenciaHorario` VARCHAR(255),
       `disponibilidade` ENUM('Remoto', 'Presencial', 'Híbrido') NOT NULL,
       `localizacao` TEXT,
       `motivacao` TEXT,
       `objetivos` TEXT,
       `foto_perfil` VARCHAR(255) NULL, 
   	`biografia` VARCHAR(355) NULL, 
   	`especificidade` VARCHAR(255) NULL, 
       `pergunta_seguranca` VARCHAR(300) NULL,
       `resposta_seguranca` VARCHAR(100) NULL
   );

   CREATE TABLE `usuarios` (
       `id` INT AUTO_INCREMENT PRIMARY KEY,
       `login` VARCHAR(50) NOT NULL,
       `senha` VARCHAR(255) NOT NULL,
       `tipo_usuario` ENUM('psicologo', 'empresa', 'funcionario') NOT NULL,
       `id_referencia` INT NOT NULL,  -- ID na tabela de referência (psicologos, empresas ou contaFuncionarios)
       UNIQUE(`login`)
   );
   DELIMITER //
   CREATE TRIGGER before_insert_contaFuncionarios
   BEFORE INSERT ON contaFuncionarios
   FOR EACH ROW
   BEGIN
       -- Gera o UUID para o campo login
       SET NEW.login = SUBSTRING(UUID(), 1, 23);
       -- Gera uma senha aleatória de 12 caracteres
       SET NEW.senha = CONCAT(
           SUBSTRING(MD5(RAND()), 1, 6), 
           SUBSTRING(MD5(RAND()), 1, 6)
       );
   END; //
   DELIMITER ;
   DELIMITER //
   CREATE TRIGGER after_psicologo_insert
   AFTER INSERT ON `psicologos`
   FOR EACH ROW
   BEGIN
       INSERT INTO `usuarios` (`login`, `senha`, `tipo_usuario`, `id_referencia`)
       VALUES (NEW.email, NEW.senha, 'psicologo', NEW.psicologo_id);
   END; //
   DELIMITER ;
   DELIMITER //
   CREATE TRIGGER after_cadastroempresa_insert
   AFTER INSERT ON `cadastroempresa`
   FOR EACH ROW
   BEGIN
       INSERT INTO `usuarios` (`login`, `senha`, `tipo_usuario`, `id_referencia`)
       VALUES (NEW.email, NEW.senha, 'empresa', NEW.ID);
   END; //
   DELIMITER ;
   DELIMITER //
   CREATE TRIGGER after_funcionario_insert
   AFTER INSERT ON `contaFuncionarios`
   FOR EACH ROW
   BEGIN
       INSERT INTO `usuarios` (`login`, `senha`, `tipo_usuario`, `id_referencia`)
       VALUES (NEW.login, NEW.senha, 'funcionario', NEW.ID);
   END; //
   DELIMITER ;
   
   INSERT INTO psicologos (nome, dataNascimento, especialidade, localizacao, crp, telefone, email, CPF, senha, endereco, certificados, preferenciaHorario, disponibilidade, motivacao, objetivos, foto_perfil, biografia, especificidade)
   VALUES
   ('Marina Romeo da Silva', '1985-04-10', 'Psicólogo Psicanalista', 'São Paulo - SP', '928327 / CRP - 4ª Região', '11987654321', 'marina@gmail.com', '12345678900', 'senha123', 'Rua A, 123', NULL, '08:00-12:00', 'Remoto', 'Ajudar as pessoas', 'Ajudar meus pacientes a se desenvolverem.', 'perfilPsicologa.jfif', 'Sou Psicóloga pela Universidade Paulista, atuo com a abordagem Psicanalítica. Tenho experiência com atendimento psicológico de pessoas que estão passando pela depressão, transtorno de ansiedade, conflitos amorosos, conflitos familiares e problemas de autoestima.', NULL),
   ('Flávio Monteiro', '1990-08-15', 'Psicólogo Cognitivo', 'Cornélio Procópio - PR', '214579 / CRP - 4ª Região', '11987654322', 'flavio@gmail.com', '23456789001', 'senha123', 'Rua B, 456', NULL, '09:00-13:00', 'Presencial', 'Trabalhar com a mente', 'Ajudar a melhorar o desempenho.', 'perfilPsicologo.jfif', 'Sou formado na Pontifícia Universidade Católica (PUC), atuo com a abordagem Humanista. Experiência com atendimento psicológico de pessoas que estão passando por perdas, luto, estresse, ansiedade e problemas de autoconfiança.', NULL),
   ('Cris da Silva de Brázino', '1988-12-22', 'Psicóloga Clínica', 'São Bernardo - SP', '606129 / CRP-SP 6ª Região', '11987654323', 'cris@gmail.com', '34567890102', 'senha123', 'Rua C, 789', NULL, '10:00-14:00', 'Híbrido', 'Apoiar emocionalmente', 'Criar um ambiente seguro.', 'perfilPsicologaclinica.png', 'Sou Psicólogo pela Universidade Federal do Rio de Janeiro e atuo com a abordagem Sistêmica. Minha experiência inclui atendimento a famílias e indivíduos que enfrentam conflitos familiares, problemas de relacionamento, estresse e ansiedade. Meu objetivo é ajudar meus pacientes a encontrar soluções duradouras e melhorar sua qualidade de vida.', NULL),
   ('Roberto Freitas Dias', '1982-07-30', 'Psicólogo Psicanalista', 'Salvador - BA', '847382 / CRP-BA 3ª Região', '11987654324', 'roberto@gmail.com', '45678901203', 'senha123', 'Rua D, 101', NULL, '08:00-12:00', 'Remoto', 'Entender o inconsciente', 'Facilitar o autoconhecimento.', 'perfilPsicanalista.jpeg', 'Com formação pela Universidade Estadual de Campinas e abordagem Psicodinâmica, meu foco é ajudar meus pacientes a entender e superar seus padrões de pensamento e comportamento negativos. Tenho experiência em atendimento a pessoas que enfrentam depressão, ansiedade, conflitos amorosos e problemas de autoestima.', NULL),
   ('Lidiane Moraes Costa', '1995-01-05', 'Psicóloga Escolar', 'Brumadinho - MG', '102837 / CRP-MG 4ª Região', '11987654325', 'lidiane@gmail.com', '56789012304', 'senha123', 'Rua E, 202', NULL, '09:00-13:00', 'Presencial', 'Apoiar o desenvolvimento infantil', 'Focar na educação emocional.',  'perfilEscolar.avif', 'Com formação pela Universidade Estadual de Campinas e abordagem Psicodinâmica, meu foco é ajudar meus pacientes a entender e superar seus padrões de pensamento e comportamento negativos. Tenho experiência em atendimento a pessoas que enfrentam depressão, ansiedade, conflitos amorosos e problemas de autoestima.', NULL),
   ('Marilia Souza', '1980-11-17', 'Psicóloga Organizacional', 'Niterói - RJ', '413825 / CRP-RJ 5ª Região', '11987654326', 'marilia@gmail.com', '67890123405', 'senha123', 'Rua F, 303', NULL, '10:00-14:00', 'Híbrido', 'Melhorar ambientes de trabalho', 'Aumentar a satisfação profissional.', 'perfilOrganizacional.avif', 'Sou Psicólog pela Universidade Federal do ABC e atuo com a abordagem Existencial. Meu trabalho é ajudar meus pacientes a encontrar significado e propósito na vida, superando crises existenciais, estresse, ansiedade, depressão e problemas de autoconhecimento. Meu objetivo é ajudar meus pacientes a viver uma vida mais autêntica e plena.', NULL),
   ('Caio Muniz de Almeida', '1992-03-25', 'Psicólogo Clínico', 'Manaus - AM', '293820 / CRP-20 20ª Região', '11987654327', 'caio@gmail.com', '78901234506', 'senha123', 'Rua G, 404', NULL, '08:00-12:00', 'Remoto', 'Promover bem-estar mental', 'Ajudar a encontrar soluções.', 'perfilClinico.jpg', 'Sou Psicólogo pela Universidade USP e atuo com a abordagem Humanista. Meu trabalho é ajudar meus pacientes a encontrar significado e propósito na vida, superando crises existenciais, estresse, ansiedade, depressão e problemas de autoconhecimento. Meu objetivo é ajudar meus pacientes a viver uma vida mais autêntica e plena.', NULL);
   
   SELECT * FROM psicologos
   WHERE 
        (nome LIKE CONCAT('%', 'Marina', '%') OR 'Marina' IS NULL) AND
        (especialidade LIKE CONCAT('%', 'Psicólogo%', '%') OR 'Psicólogo%' IS NULL) AND
        (localizacao LIKE CONCAT('%', 'Cornélio Procópio - PR', '%') OR 'Cornélio Procópio - PR' IS NULL);
   CREATE TABLE disponibilidadepsico (
       disponibilidade_id INT AUTO_INCREMENT PRIMARY KEY,
       psicologo_id INT NOT NULL,
       data DATE NOT NULL,
       horario_inicio TIME NOT NULL,
       horario_fim TIME NULL
   );
   
   INSERT INTO disponibilidadepsico (psicologo_id, data, horario_inicio)
   VALUES 
       (1, '2024-11-15', '17:00:00'),
       (1, '2024-11-30', '14:00:00'),
       (1, '2024-11-20', '12:00:00'),
       (1, '2024-11-24', '14:00:00'),
   	(2, '2024-11-17', '17:00:00'),
       (2, '2024-11-30', '14:00:00'),
       (2, '2024-11-20', '12:00:00'),
       (2, '2024-11-28', '14:00:00'),
       (3, '2024-11-22', '17:00:00'),
       (3, '2024-11-29', '14:00:00'),
       (3, '2024-11-27', '12:00:00'),
       (3, '2024-11-28', '14:00:00'),
   	(4, '2024-11-22', '17:00:00'),
       (4, '2024-11-30', '14:00:00'),
       (4, '2024-11-20', '12:00:00'),
       (4, '2024-11-24', '14:00:00'),
   	(5, '2024-11-16', '17:00:00'),
       (5, '2024-11-30', '14:00:00'),
       (5, '2024-11-19', '12:00:00'),
       (5, '2024-11-28', '14:00:00'),
       (6, '2024-11-22', '17:00:00'),
       (6, '2024-11-30', '14:00:00'),
       (6, '2024-11-16', '12:00:00'),
       (6, '2024-11-24', '14:00:00'),
   	(7, '2024-11-21', '17:00:00'),
       (7, '2024-11-30', '14:00:00'),
       (7, '2024-11-20', '12:00:00'),
       (7, '2024-11-24', '14:00:00');

       CREATE TABLE agendamentos (
       `id` INT AUTO_INCREMENT PRIMARY KEY,
       `usuario_id` INT NULL,
       `psicologo_id` INT NOT NULL,
       `data` DATE NOT NULL,
       `horario_inicio` TIME NOT NULL,
       `tipo` VARCHAR(50), 
       `assunto` TEXT,
   	`nome_paciente` VARCHAR(255) NOT NULL,
       FOREIGN KEY (psicologo_id) REFERENCES psicologos(psicologo_id)
   );
   DELIMITER //
   CREATE TRIGGER after_delete_cadastroempresa
   AFTER DELETE ON `cadastroempresa`
   FOR EACH ROW
   BEGIN
       DELETE FROM `usuarios` WHERE `tipo_usuario` = 'empresa' AND `id_referencia` = OLD.ID;
   END; //
   DELIMITER ;
   DELIMITER //
   CREATE TRIGGER after_delete_psicologo
   AFTER DELETE ON `psicologos`
   FOR EACH ROW
   BEGIN
       DELETE FROM `usuarios` WHERE `tipo_usuario` = 'psicologo' AND `id_referencia` = OLD.psicologo_id;
   END; //
   DELIMITER ;
   DELIMITER //
   CREATE TRIGGER after_delete_contaFuncionarios
   AFTER DELETE ON `contaFuncionarios`
   FOR EACH ROW
   BEGIN
       DELETE FROM `usuarios` WHERE `tipo_usuario` = 'funcionario' AND `id_referencia` = OLD.id;
   END; //
   DELIMITER ;
   DELIMITER //
   CREATE TRIGGER after_update_cadastroempresa
   AFTER UPDATE ON `cadastroempresa`
   FOR EACH ROW
   BEGIN
       UPDATE `usuarios`
       SET `login` = NEW.email, `senha` = NEW.senha
       WHERE `tipo_usuario` = 'empresa' AND `id_referencia` = NEW.ID;
   END; //
   DELIMITER ;
   DELIMITER //
   CREATE TRIGGER after_update_psicologos
   AFTER UPDATE ON `psicologos`
   FOR EACH ROW
   BEGIN
       UPDATE `usuarios`
       SET `login` = NEW.email, `senha` = NEW.senha
       WHERE `tipo_usuario` = 'psicologo' AND `id_referencia` = NEW.psicologo_id;
   END; //
   DELIMITER ;
   DELIMITER //
   CREATE TRIGGER after_update_contaFuncionarios
   AFTER UPDATE ON `contaFuncionarios`
   FOR EACH ROW
   BEGIN
       UPDATE `usuarios`
       SET `login` = NEW.login, `senha` = NEW.senha
       WHERE `tipo_usuario` = 'funcionario' AND `id_referencia` = NEW.id;
   END; //
   DELIMITER ;
   INSERT INTO planos (nome, preco_por_funcionario, duracao) VALUES
   ('Bem-Estar', 250.00, 1),   
   ('Equilíbrio', 310.00, 1),
   ('Transformação', 600.00, 1);
   CREATE TABLE compras (
       id INT AUTO_INCREMENT PRIMARY KEY,
       id_empresa INT NOT NULL,
       id_plano INT NOT NULL,
       data_compra DATETIME DEFAULT CURRENT_TIMESTAMP,
       qtd_funcionarios INT NOT NULL, 
       FOREIGN KEY (id_plano) REFERENCES planos(id)
   );
   ````

7. Inicie o servidor backend:
   ````
   cd backend
   node server.js
   ````

9. Inicie o servidor frontend:
   ````
   cd frontend
   npm start
   ````

11. Acesse o sistema em http://localhost:3000.

## Tecnologias Utilizadas
   > - React
   > - Node.js
   > - Express
   > - MySQL
   > - Axios

## Estrutura de Arquivos

    mindU2/
    ├── backend/
    │   ├── db.js
    │   ├── routesAgendamento
    |   ├── routesDelete
    │   └── ...
    ├── frontend/
    │   ├── public/
    │   ├── src/
    │   │   ├── components/
    │   │   │   ├── ...
    │   │   ├── App.js
    │   │   ├── index.js
    │   │   └── Routes.js
    │   └── ...
    └── README.md

## Criado e idealizado por:
> Jessica Arruda, Carollini Simplicio, Emily Andrade, Sabrina Abreu e Manuela Ramalho, com a contribuição de

## Contribuição:
>  William Reis e Rodrigo Alvarez

## Licença:
> Este projeto está licenciado sob a Licença MIT - consulte o arquivo LICENSE.md para mais detalhes.

