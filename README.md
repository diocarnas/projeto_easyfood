# 🍕 EasyFood

API e aplicação web para cadastro, organização e avaliação de restaurantes, com autenticação de usuários via JWT.

Projeto desenvolvido como atividade da disciplina de Arquitetura de Software, evoluindo progressivamente de um array em memória até uma aplicação em camadas com persistência em banco de dados e autenticação.

## ✨ Funcionalidades

- 🔐 Registro e login de usuários com autenticação JWT
- 🍽️ Cadastro de restaurantes (nome, categoria, endereço, telefone e avaliação)
- 📋 Catálogo pessoal de restaurantes por usuário
- ✏️ Edição e exclusão de restaurantes
- 🔎 Filtro por categoria
- 📊 Estatísticas (total de restaurantes, categorias e avaliação média)
- 💻 Front-end integrado (HTML/CSS/JS puro)

## 🛠️ Tecnologias

- [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [MySQL](https://www.mysql.com/)
- [JWT](https://jwt.io/) (`jsonwebtoken`) para autenticação
- [bcryptjs](https://www.npmjs.com/package/bcryptjs) para hash de senhas
- HTML, CSS e JavaScript puro no front-end

## 📁 Estrutura do projeto

```
projeto-easyfood/
├── prisma/
│   ├── migrations/
│   └── schema.prisma
├── public/
│   └── index.html
├── src/
│   ├── database/
│   │   └── prisma.js
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── auth.service.js
│   │   │   ├── auth.controller.js
│   │   │   ├── auth.middleware.js
│   │   │   └── auth.routes.js
│   │   └── restaurants/
│   │       ├── restaurant.service.js
│   │       ├── restaurant.controller.js
│   │       └── restaurant.routes.js
│   └── app.js
├── server.js
├── package.json
└── .env
```

A aplicação segue uma arquitetura em camadas:

```
Requisição HTTP → Routes → Controller → Service → Database (Prisma) → MySQL
```

## 🚀 Como rodar localmente

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão LTS)
- [MySQL](https://dev.mysql.com/downloads/installer/) instalado e rodando

### 1. Clone o repositório

```bash
git clone https://github.com/SEU_USUARIO/projeto-easyfood.git
cd projeto-easyfood
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com base no `.env.example`:

```env
DATABASE_URL="mysql://usuario:senha@localhost:3306/easyfood"
JWT_SECRET="troque-por-uma-chave-longa-e-aleatoria"
```

### 4. Crie o banco de dados

No MySQL, crie o banco:

```sql
CREATE DATABASE easyfood;
```

### 5. Rode as migrations

```bash
npx prisma migrate dev
```

Isso cria as tabelas `User` e `Restaurant` no banco.

### 6. Inicie o servidor

```bash
node server.js
```

Acesse `http://localhost:3000` no navegador.

## 📡 Endpoints da API

### Autenticação

| Método | Rota             | Descrição                         | Protegida |
|--------|------------------|------------------------------------|-----------|
| POST   | `/auth/register` | Cria um novo usuário               | Não       |
| POST   | `/auth/login`    | Autentica e retorna um token JWT   | Não       |
| GET    | `/auth/me`        | Retorna os dados do usuário logado | Sim       |

### Restaurantes

| Método | Rota                          | Descrição                              | Protegida |
|--------|-------------------------------|------------------------------------------|-----------|
| GET    | `/restaurants`                | Lista restaurantes (filtro `?category=`) | Não       |
| GET    | `/restaurants/stats`          | Estatísticas gerais                      | Não       |
| POST   | `/restaurants`                | Cadastra um novo restaurante             | Sim       |
| PUT    | `/restaurants/:id`            | Atualiza um restaurante                  | Sim       |
| DELETE | `/restaurants/:id`            | Remove um restaurante                    | Sim       |

Rotas protegidas exigem o header:

```
Authorization: Bearer SEU_TOKEN
```

## 📝 Licença

Projeto acadêmico, desenvolvido para fins de estudo.
