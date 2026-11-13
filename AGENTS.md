# AGENTS.md

## Quick Start

```bash
npm install           # install Node dependencies
cp .env.example .env  # .env is gitignored
npm test              # run all Mocha API tests
```

## Architecture

Three layers, import style is CommonJS (`require`/`module.exports`):

| Layer    | Directory                                         | Purpose                                                                                |
| :------- | :------------------------------------------------ | :------------------------------------------------------------------------------------- |
| Core     | `core/BaseApiClient.js`                           | Reusable HTTP client wrapping native `fetch` (`get`, `post`, `put`, `patch`, `delete`) |
| Business | `business/services/*.js`, `business/endpoints.js` | Domain API services (`AuthService`, `BookingService`) and endpoint routes              |
| Fixtures | `fixtures/*.json`                                 | Static booking payloads, invalid credentials, and expected messages                    |
| Helpers  | `helpers/bookingHelper.js`                        | Shared setup/cleanup for tests: `getToken`, `createBooking`, `deleteBooking`           |
| Tests    | `tests/*.test.js`                                 | Mocha + Chai API test suites                                                           |

Every service in `business/services/` extends `BaseApiClient`.

## Commands

| Action            | Command                        |
| :---------------- | :----------------------------- |
| Run all tests     | `npm test`                     |
| Run one spec      | `npx mocha tests/auth.test.js` |
| Open HTML report  | `npm run report`               |
| Lint              | `npm run lint`                 |
| Format (write)    | `npm run format`               |
| Check format (CI) | `npx prettier --check .`       |

## CI Order

`.github/workflows/api.yml` runs two jobs:

1. `lint`: `npm run lint` → `npx prettier --check .`
2. `api-tests`: `npm test` → uploads `mochawesome-report/` artifact.

## Test Data

Valid user credentials (`API_USERNAME`, `API_PASSWORD`) and `BASE_URL` come from environment variables loaded via `dotenv/config` in `.mocharc.json`. Static payloads, invalid credentials, and response messages live in `fixtures/*.json`.
