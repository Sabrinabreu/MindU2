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
   Execute o script SQL fornecido abaixo para criar a tabela cadastros.
   ````
   CREATE TABLE `cadastro` ( 
     `idCadastro` INT AUTO_INCREMENT NOT NULL,
     `nome` VARCHAR(150) NOT NULL,
     `email` VARCHAR(150) NOT NULL,
     `telefone` VARCHAR(20) NOT NULL,
     `cpf` VARCHAR(20) NOT NULL,
     `endereco` VARCHAR(250) NOT NULL,
     `senha` VARCHAR(45) NOT NULL,
     CONSTRAINT `PRIMARY` PRIMARY KEY (`idCadastro`)
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

    sistema-de-cadastro/
    ├── backend/
    │   ├── db.js
    │   ├── routes.js
    │   └── server.js
    ├── frontend/
    │   ├── public/
    │   ├── src/
    │   │   ├── components/
    │   │   │   ├── CadastroForm.jsx
    │   │   │   ├── CadastroItem.jsx
    |   |   |   ├── Navegacao.jsx
    │   │   │   └── TabelaCadastro.jsx
    │   │   ├── App.js
    │   │   ├── index.js
    │   │   └── Routes.js
    │   └── ...
    └── README.md

## Criado e idealizado por:
> William Reis, Rodrigo Alvarez e Enzo Patti

## Contribuição:
> Contribuições são bem-vindas! Se encontrar algum problema ou tiver sugestões de melhorias, por favor, abra uma issue ou envie um pull request.

## Licença:
> Este projeto está licenciado sob a Licença MIT - consulte o arquivo LICENSE.md para mais detalhes.

