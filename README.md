# 📘 API de Financiamento Estudantil

API desenvolvida com **Fastify**, **TypeScript**, **Prisma** e **JWT**, para simular e registrar financiamentos de estudantes.

---

## 🚀 Tecnologias utilizadas

- [Fastify](https://fastify.dev/) — framework web rápido e moderno
- [TypeScript](https://www.typescriptlang.org/) — tipagem estática segura
- [Prisma](https://www.prisma.io/) — ORM para banco de dados PostgreSQL
- [Zod](https://zod.dev/) — validação de dados e schemas
- [JWT](https://jwt.io/) — autenticação segura por token
- Swagger (via `@fastify/swagger`) — documentação interativa da API

## ⚙️ Pré-requisitos

- Node.js `^18.x`
- PostgreSQL rodando localmente ou em container
- [pnpm](https://pnpm.io/) ou `npm` ou `yarn`

---

## 🔧 Variáveis de ambiente

Crie um arquivo `.env` com:

```
DATABASE_URL="postgresql://<user>:<password>@localhost:5432/finance"
JWT_SECRET="sua-chave-secreta"
```
---

## 📦 Instalação

```bash
pnpm install
# ou npm install
```

---

## 🧱 Rodar as migrations e gerar o client

```bash
npx prisma migrate dev --name init
npx prisma generate
```

---

## 🚀 Iniciar o servidor

```bash
pnpm dev
# ou npm run dev
```

A API estará disponível em:  
**http://localhost:3000**

A documentação Swagger estará em:  
**http://localhost:3000/api/docs**

---

## 🔐 Autenticação

- Todas as rotas protegidas usam `JWT` no header:

```
Authorization: Bearer <token>
```

- O token é gerado no login (`POST /auth/login`) e pode ser testado no Swagger via botão "Authorize".

---

## 👨‍💻 Autor

Desenvolvido por **[Victor Angelo]**.