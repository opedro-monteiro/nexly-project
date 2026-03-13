# Nexly Project

Plataforma de campanhas de comunicação com clientes via Email e WhatsApp.

## Estrutura

```
nexly-project/
├── app/
│   ├── api/        # Back-end: Fastify + Prisma + PostgreSQL (porta 3333)
│   └── web/        # Front-end: Next.js 16 + shadcn/ui (porta 3000)
├── infra/          # Dockerfiles (api e web)
├── docker-compose.yaml
└── .env.example
```

## Pré-requisitos

- [Docker](https://docs.docker.com/get-docker/) e Docker Compose v2

## Rodar com Docker (recomendado)

```bash
docker compose up --build
```

Aguarde todos os serviços subirem (postgres → api → web) e acesse:

| Serviço | URL |
|---------|-----|
| Web     | http://localhost:3000 |
| API     | http://localhost:3333 |
| Swagger | http://localhost:3333/docs |

As migrações do banco de dados são aplicadas automaticamente na inicialização da API.

Para parar:

```bash
docker compose down
```

Para parar e remover o volume do banco (reset completo):

```bash
docker compose down -v
```

## Rodar em modo desenvolvimento (local)

### Pré-requisitos adicionais

- Node.js 22+

### 1. Banco de dados

Suba apenas o PostgreSQL via Docker:

```bash
docker compose up postgres -d
```

### 2. Back-end

```bash
cd app/api
# O arquivo .env já existe com os valores padrão
npx prisma migrate deploy
npm run dev
```

API disponível em http://localhost:3333

### 3. Front-end

```bash
cd app/web
# O arquivo .env já existe com os valores padrão
npm run dev
```

Web disponível em http://localhost:3000

## Variáveis de ambiente

Consulte `.env.example` na raiz para a lista completa com descrição de cada variável.

| Variável | Onde usar | Valor padrão (dev local) |
|----------|-----------|--------------------------|
| `PORT` | `app/api/.env` | `3333` |
| `DATABASE_URL` | `app/api/.env` | `postgresql://nexly:postgres@localhost:5432/nexly-db` |
| `NEXT_PUBLIC_API_URL` | `app/web/.env` | `http://localhost:3333` |
| `API_URL` | `app/web/.env` | `http://localhost:3333` |

## 📬 Contato

[![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/opedro-monteiro/)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:pedro.oliveira@monteirodev.com)
