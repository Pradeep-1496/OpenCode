# voice-lm — AGENTS.md

## Commands

```bash
npm run start:dev    # dev server with watch
npm run build        # nest build (output: dist/)
npm run lint         # eslint flat config (eslint.config.mjs) + --fix
npm run format       # prettier --write src/ test/
npm test             # jest (rootDir: src, match: *.spec.ts)
npm run test:e2e     # jest --config ./test/jest-e2e.json
npm run test:cov     # jest --coverage
```

## Architecture

- **NestJS 11** + **Express** + **TypeScript** (ES2023 target, `nodenext` module/moduleResolution)
- **LangChain** (`@langchain/core`, `@langchain/ollama`) for LLM calls
- Requires a local **Ollama** server at `http://localhost:11434` with model `gemma3:1b`
- Swagger docs served at `/api/docs` (configured in `src/swagger.config.ts`)
- `src/voice/` exists but is **empty** — voice features not yet implemented

## Key endpoints

| Route | Method | Purpose |
|---|---|---|
| `/` | GET | Hello World |
| `/ai/ollama/generate` | POST | Generic prompt → LLM (`body: { prompt }`) |
| `/ai/ollama/alita` | POST | Alita hospital assistant chat (`body: { message }`) |

## Testing quirks

- Unit tests live next to source (`*.spec.ts`) — jest `rootDir: src` in `package.json`
- E2E tests in `test/` with separate jest config at `test/jest-e2e.json`
- `@nestjs/testing` + `supertest` for integration tests

## Tooling quirks

- ESLint flat config (`eslint.config.mjs`) — not `.eslintrc`
- `noImplicitAny: false` in `tsconfig.json` — `any` is allowed implicitly
- `endOfLine: "auto"` for prettier (configured inside ESLint rules, not `.prettierrc`)
- Prettier: `singleQuote: true`, `trailingComma: "all"`

## Setup

```bash
npm install
# ensure Ollama is running with: ollama pull gemma3:1b
npm run start:dev
```

- `process.env.PORT ?? 3000` — no `.env` required, server defaults to port 3000
- `.env` files are gitignored but not otherwise configured

## OpenCode config

- `opencode.json` registers an `"ask"` agent (read-only, no edit/bash)
- `__opencode-config.md` and `opencode-config_impact.md` are reference docs for OpenCode itself — not project instructions
