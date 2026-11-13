API test automation project created with JavaScript, Native Fetch API, Mocha, and Chai for the **Restful Booker** application (https://restful-booker.herokuapp.com).

- [Restful Booker API Documentation](https://restful-booker.herokuapp.com/apidoc/index.html)

The project follows a layered architecture:

- **Core layer** — reusable HTTP client functionality independent of endpoint-specific logic.
- **Business layer** — API domain services and application endpoints.
- **Fixtures layer** — static test data payloads, user credentials, and expected messages.
- **Helpers** — shared test setup and cleanup functions (get token, create and delete booking).
- **Tests layer** — automated API test scenarios and Mocha configuration.

---

## Technologies

- JavaScript (CommonJS)
- Native Fetch API (Node.js)
- Mocha Test Runner
- Chai Assertion Library
- Mochawesome HTML Reporter
- Dotenv

---

## Test Scenarios & Coverage Matrix

**Coverage Summary:** **16** automated API test scenarios across **3** functional suites (Authentication, Booking CRUD, Negative Scenarios).

Detailed test cases, preconditions, request/response steps, and expansion roadmaps are documented in [docs/test-cases.md](docs/test-cases.md).

Format: **ID** · Priority · Status — Title — `Method & Endpoint`

#### Authentication (`tests/auth.test.js`)

- **AUTH-01** · P1 · Automated — Successful token creation with valid credentials — `POST /auth`
- **AUTH-02** · P1 · Automated — Token creation fails with invalid password — `POST /auth`
- **AUTH-03** · P2 · Automated — Token creation fails with non-existent username — `POST /auth`
- **AUTH-04** · P2 · Automated — Token creation fails with empty credentials — `POST /auth`

#### Booking CRUD (`tests/booking.crud.test.js`)

- **BKG-01** · P1 · Automated — Create a new booking with valid data — `POST /booking`
- **BKG-02** · P1 · Automated — Get created booking details by ID — `GET /booking/:id`
- **BKG-03** · P2 · Automated — Filter bookings list by firstname and lastname — `GET /booking`
- **BKG-04** · P1 · Automated — Full update of existing booking — `PUT /booking/:id`
- **BKG-05** · P2 · Automated — Partial update of existing booking — `PATCH /booking/:id`
- **BKG-06** · P1 · Automated — Delete existing booking and verify removal — `DELETE /booking/:id`

#### Negative Scenarios (`tests/booking.negative.test.js`)

- **NEG-01** · P2 · Automated — Get non-existent booking by ID returns 404 — `GET /booking/:id`
- **NEG-02** · P1 · Automated — Update booking without auth token returns 403 — `PUT /booking/:id`
- **NEG-03** · P1 · Automated — Delete booking with invalid auth token returns 403 — `DELETE /booking/:id`
- **NEG-04** · P2 · Automated — Create booking with incomplete payload returns 500 — `POST /booking`
- **NEG-05** · P1 · Automated — Partial update booking without auth token returns 403 — `PATCH /booking/:id`
- **NEG-06** · P2 · Automated — Update non-existent booking returns 405 — `PUT /booking/:id`

---

## Project Structure

```text
docs/
└── test-cases.md

fixtures/
├── bookings.json
├── messages.json
└── users.json

core/
└── BaseApiClient.js

business/
├── services/
│   ├── AuthService.js
│   └── BookingService.js
└── endpoints.js

helpers/
└── bookingHelper.js

tests/
├── auth.test.js
├── booking.crud.test.js
└── booking.negative.test.js

.mocharc.json
```

---

## Features

- Layered architecture (`Core` → `Business` → `Tests`)
- Native Node.js `fetch` HTTP client wrapper (`BaseApiClient`)
- Isolated test execution with Mocha hooks (`before` / `beforeEach`)
- Test retries disabled (`retries: 0`) — failures are reported immediately instead of being masked
- Environment variables configured via `.env` and `dotenv`
- HTML and JSON test reports generated via `mochawesome`
- CI integration with **GitHub Actions** (using `API_USERNAME` and `API_PASSWORD` secrets, with default demo fallbacks)

---

## Installation

Requires **Node.js 22.12+** (Chai 6 is published as an ES module and is loaded with `require()`).

```bash
npm install
```

Copy `.env.example` to `.env` and adjust values if needed:

```bash
cp .env.example .env
```

---

## Test Execution

Run all API tests:

```bash
npm test
```

Run a single test suite:

```bash
npx mocha tests/auth.test.js
```

Open Mochawesome HTML report:

```bash
npm run report
```

---

## Code Quality

Run ESLint:

```bash
npm run lint
```

Format code with Prettier:

```bash
npm run format
```
