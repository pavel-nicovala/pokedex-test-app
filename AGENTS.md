# Agent instructions – PokéDex app

## Project overview

- **Monorepo** with npm workspaces: `client` (React CRA) and `server` (Express).
- **Client** runs on port 3000, **server** on 3001. Client proxies `/api` to the server in dev.
- API: `GET /api/search?query=...` and `GET /api/lookup/:name`. See `openapi.yaml` for the contract.

## Agentic workflows

When making changes, follow these workflows so client and server stay in sync.

### Adding or changing an API endpoint

1. Update **server**: `server/src/index.ts` (route), `server/src/queries.ts` (handler), and types in `server/src` as needed.
2. Update **OpenAPI**: `openapi.yaml` so the spec matches the implementation.
3. Update **client**: add or change calls in `client/src/api/` (e.g. `search.ts`, `details.ts`) and use `API_BASE` from `client/src/api/config.ts` for the base URL. Keep types in `client/src/types.ts` aligned with the API response shapes.
4. Run **API tests**: `cd server && npm test`.
5. If UI is affected, run **E2E**: `npm run test:playwright` (client and server should be running or started by the test setup).

### Changing API request/response shapes

1. Change types in **server** (and handlers) first.
2. Update **client** types and API hooks in `client/src/api/` and `client/src/types.ts`.
3. Run `cd server && npm test` and `npm run test:playwright` if relevant.

### Adding a dependency

- **Client**: add in `client/package.json`; use `npm install --legacy-peer-deps` at repo root if needed.
- **Server**: add in `server/package.json`. Include `@types/*` in devDependencies for TS packages that need them (e.g. `@types/cors`).

## Code style and structure

- **TypeScript** everywhere; no `any` unless necessary and documented.
- **Client**: functional components, hooks in `client/src/api/` for data fetching. Use `REACT_APP_*` env vars for build-time config (e.g. `REACT_APP_API_URL`).
- **Server**: Express router under `/api`, CORS enabled (see `server/src/index.ts`). Use `PORT` env for the port.
- **Tests**: API tests in `server/src/__tests__/api/`, E2E in `playwright/` and `cypress/`. Prefer Playwright for new E2E.

## Cursor Agent (GitHub Actions)

- Workflow: `.github/workflows/cursor-agent.yml` — runs on PRs to `main` / `master` / `develop` and can be triggered with `workflow_dispatch` once the file exists on the default branch.
- **PR comments**: posting the review is done by `.github/scripts/post-cursor-review.sh` (not inline in the YAML) so GitHub’s parser does not mis-read markdown `[links]`, `*emphasis*`, or `---` inside `run:` blocks.
- Secrets: `CURSOR_API_KEY` (Cursor dashboard). `GITHUB_TOKEN` is automatic for `gh pr comment`.

## Commands to remember

- Start app: `npm start`
- Build all: `npm run build`
- API tests: `cd server && npm test`
- E2E: `npm run test:playwright`
- Install (with peer deps): `npm run pre-install` or `npm install --legacy-peer-deps`
