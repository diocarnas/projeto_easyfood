# EasyFood

API da EasyFood desenvolvida com Node.js, Express, Prisma e **MySQL**.

## Requisitos
- Node.js 20 ou superior
- MySQL 8 ou compatível

## Configuração
1. Instale as dependências: `npm install`
2. Copie `.env.example` para `.env` e configure `DATABASE_URL` e `JWT_SECRET`.
3. Aplique a migration incremental: `npx prisma migrate deploy`
4. Gere o Prisma Client: `npx prisma generate`
5. Inicie a API: `npm start` (ou `npm run dev` durante o desenvolvimento).

> A migration nova apenas adiciona `User.avatarUrl` e a tabela `Dish`. Ela não recria nem apaga as tabelas atuais. Faça backup do banco antes de aplicar qualquer migration em ambiente com dados importantes.

## Rotas principais

### Autenticação
- `POST /auth/register` — cadastro `{ "name", "email", "password" }`
- `POST /auth/login` — login `{ "email", "password" }`
- `GET /auth/me` — consulta sessão (Bearer token)
- `POST /auth/me/avatar` — envia foto de perfil (multipart/form-data, campo `image`, Bearer token)

### Restaurantes
- `GET /restaurants` — lista restaurantes
- `GET /restaurants/stats` — estatísticas
- `POST /restaurants` — cria restaurante (autenticado)
- `PUT /restaurants/:id` — atualiza restaurante (autenticado)
- `DELETE /restaurants/:id` — exclui restaurante (autenticado)

### Pratos
- `POST /restaurants/:restaurantId/dishes` — cadastra prato (autenticado; dono do restaurante)
- `GET /restaurants/:restaurantId/dishes` — lista pratos do restaurante
- `GET /dishes/:dishId` — consulta prato
- `PUT /dishes/:dishId` — atualiza prato (autenticado; dono do restaurante)
- `POST /dishes/:dishId/image` — envia imagem do prato (multipart/form-data, campo `image`, autenticado; dono do restaurante)
- `DELETE /dishes/:dishId` — exclui prato (autenticado; dono do restaurante)

## Upload de imagens
Os uploads aceitam JPG, PNG, WEBP e GIF, com limite de 5 MB. As imagens são validadas e convertidas para WebP pelo Sharp. Os arquivos ficam em `public/uploads/` e são servidos estaticamente pelo Express.

**Importante para deploy:** armazenamento local pode ser apagado em plataformas com filesystem efêmero. Em produção, configure armazenamento persistente ou um serviço de objetos (por exemplo, S3/Cloudinary) antes de depender dessas imagens.
