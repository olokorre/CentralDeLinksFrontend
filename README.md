# central-de-links-frontend

Frontend da Central de Links, feito com Vue 3 + Vite + TypeScript, integrado à [CentralDeLinksAPI](https://github.com/olokorre/CentralDeLinksAPI).

## Setup

```sh
npm install
```

### Variáveis de ambiente

Copie o arquivo de exemplo e ajuste a URL da API conforme o seu ambiente:

```sh
cp .env.exemple .env
```

| Variável       | Descrição                                          | Padrão                              |
| -------------- | -------------------------------------------------- | ----------------------------------- |
| `VITE_API_URL` | URL base da API consumida pelo front               | `https://api.centraldelinks.xyz`    |

Sem `VITE_API_URL` definida, o front usa o fallback `https://api.centraldelinks.xyz`.

## Integração com a API

- **Autenticação**: `POST /auth/login`, `POST /auth/register` e `POST /auth/me` retornam `{ accessToken }` (login/register) e `{ id, nick }` (me). O token é salvo no localStorage (`accessToken`) via Pinia (`src/stores/auth.ts`) e enviado em todas as requisições pelo header `access-token` (interceptor em `src/http.ts`).
- **Links**: `GET /links/get` (com `page`/`limit` para paginação), `GET /links/get/:id`, `POST /links/add`, `PUT /links/change-description`, `DELETE /links/delete` e `POST /links/share`.
- **Usuários**: `POST /user/search` para buscar usuários por nick.
- **Sessão expirada**: qualquer resposta `401` limpa o token e redireciona para `/login`.
- **Rotas protegidas**: `/links`, `/link`, `/link/:id` e `/about` exigem token (navigation guards em `src/router/index.ts`); `/login` e `/register` redirecionam para `/links` quando já autenticado.

## Desenvolvimento

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
npm run build

# Runs the end-to-end tests
npm run test:e2e
# Runs the tests only on Chromium
npm run test:e2e -- --project=chromium
# Runs the tests in debug mode
npm run test:e2e -- --debug
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
