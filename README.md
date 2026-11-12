# 🍽️ EasyFood

API REST para gerenciamento de restaurantes e pratos, desenvolvida com
**Node.js, Express, Prisma ORM e MySQL**.

## 🚀 Tecnologias utilizadas

-   Node.js
-   Express
-   MySQL
-   Prisma ORM
-   JWT
-   Bcrypt
-   Multer
-   Sharp

## ⚙️ Funcionalidades

### Autenticação e usuários

-   Cadastro e login de usuários.
-   Autenticação com JWT.
-   Consulta do usuário autenticado.
-   Upload de foto de perfil.

### Restaurantes

-   Cadastro, listagem, atualização e exclusão.
-   Consulta de estatísticas.

### Pratos

-   Cadastro de pratos vinculados a restaurantes.
-   Listagem por restaurante e consulta individual.
-   Atualização e exclusão.
-   Upload de imagens.
-   Controle de acesso baseado na propriedade do restaurante.

### Upload e processamento de imagens

-   Multer para gerenciamento dos uploads.
-   Formatos aceitos: JPG, PNG, WEBP e GIF.
-   Limite de 5 MB por arquivo.
-   Conversão para WebP utilizando Sharp.

## 🛠️ Instalação e configuração

### Pré-requisitos

-   Node.js 20 ou superior.
-   MySQL 8 ou compatível.
-   npm.

### 1. Clone o repositório

``` bash
git clone https://github.com/diocarnas/projeto_easyfood.git
cd projeto_easyfood
```

### 2. Instale as dependências

``` bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` com base no `.env.example`:

``` env
DATABASE_URL="mysql://usuario:senha@localhost:3306/easyfood"
JWT_SECRET="sua_chave_secreta"
```

Configure os dados conforme seu ambiente MySQL.

### 4. Execute as migrations e gere o Prisma Client

``` bash
npx prisma migrate deploy
npx prisma generate
```

### 5. Inicie a aplicação

``` bash
npm start
```

Para desenvolvimento, se o script estiver disponível:

``` bash
npm run dev
```

A API estará disponível em `http://localhost:3000`.

## 📌 Principais rotas

  Método   Endpoint                              Descrição
  -------- ------------------------------------- ----------------------
  POST     `/auth/register`                      Cadastro de usuário
  POST     `/auth/login`                         Login
  GET      `/auth/me`                            Consulta sessão
  POST     `/auth/me/avatar`                     Upload de avatar
  GET      `/restaurants`                        Lista restaurantes
  GET      `/restaurants/stats`                  Estatísticas
  POST     `/restaurants`                        Cria restaurante
  PUT      `/restaurants/:id`                    Atualiza restaurante
  DELETE   `/restaurants/:id`                    Exclui restaurante
  POST     `/restaurants/:restaurantId/dishes`   Cadastra prato
  GET      `/restaurants/:restaurantId/dishes`   Lista pratos
  GET      `/dishes/:dishId`                     Consulta prato
  PUT      `/dishes/:dishId`                     Atualiza prato
  POST     `/dishes/:dishId/image`               Upload de imagem
  DELETE   `/dishes/:dishId`                     Exclui prato

Rotas protegidas exigem o cabeçalho:

``` http
Authorization: Bearer SEU_TOKEN
```

Os uploads utilizam `multipart/form-data`, com o campo `image`.

## 🗄️ Banco de dados

A aplicação utiliza MySQL como banco de dados relacional e Prisma ORM
para acesso aos dados.

As migrations controlam a evolução do banco. A migration incremental
adiciona o campo `avatarUrl` em `User` e a tabela `Dish`.

> Faça backup do banco antes de aplicar migrations em ambientes com
> dados importantes. Não utilize `prisma migrate reset` em bancos que
> precisam preservar seus dados.

## 🔒 Segurança

-   Senhas armazenadas com hash usando Bcrypt.
-   Autenticação baseada em JWT.
-   Rotas protegidas por middleware.
-   Verificação de propriedade dos restaurantes.
-   Validação dos arquivos enviados.
-   Credenciais mantidas no `.env`, que não deve ser versionado.

## ☁️ Deploy

Os uploads são armazenados localmente em `public/uploads/`. Em
plataformas com filesystem efêmero, configure armazenamento persistente
ou um serviço externo, como Amazon S3 ou Cloudinary.

## 👨‍💻 Desenvolvedor

**Diogo Carvalho**\
Estudante de Engenharia da Computação, com interesse em desenvolvimento
de software, arquitetura de sistemas, banco de dados e tecnologias
backend.

## 📄 Licença

Projeto desenvolvido para fins acadêmicos e de aprendizado.
