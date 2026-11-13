# Restful Booker API Tests

API test automation project created with JavaScript, Native Fetch API, Mocha, and Chai for the **Restful Booker** application (https://restful-booker.herokuapp.com).

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

| ID        | Suite              | Title                                                 | Method & Endpoint     | Priority | Automation Status | Spec File                        |
| :-------- | :----------------- | :---------------------------------------------------- | :-------------------- | :------- | :---------------- | :------------------------------- |
| `AUTH-01` | Authentication     | Successful token creation with valid credentials      | `POST /auth`          | P1       | Automated         | `tests/auth.test.js`             |
| `AUTH-02` | Authentication     | Token creation fails with invalid password            | `POST /auth`          | P1       | Automated         | `tests/auth.test.js`             |
| `AUTH-03` | Authentication     | Token creation fails with non-existent username       | `POST /auth`          | P2       | Automated         | `tests/auth.test.js`             |
| `AUTH-04` | Authentication     | Token creation fails with empty credentials           | `POST /auth`          | P2       | Automated         | `tests/auth.test.js`             |
| `BKG-01`  | Booking CRUD       | Create a new booking with valid data                  | `POST /booking`       | P1       | Automated         | `tests/booking.crud.test.js`     |
| `BKG-02`  | Booking CRUD       | Get created booking details by ID                     | `GET /booking/:id`    | P1       | Automated         | `tests/booking.crud.test.js`     |
| `BKG-03`  | Booking CRUD       | Filter bookings list by firstname and lastname        | `GET /booking`        | P2       | Automated         | `tests/booking.crud.test.js`     |
| `BKG-04`  | Booking CRUD       | Full update of existing booking                       | `PUT /booking/:id`    | P1       | Automated         | `tests/booking.crud.test.js`     |
| `BKG-05`  | Booking CRUD       | Partial update of existing booking                    | `PATCH /booking/:id`  | P2       | Automated         | `tests/booking.crud.test.js`     |
| `BKG-06`  | Booking CRUD       | Delete existing booking and verify removal            | `DELETE /booking/:id` | P1       | Automated         | `tests/booking.crud.test.js`     |
| `NEG-01`  | Negative Scenarios | Get non-existent booking by ID returns 404            | `GET /booking/:id`    | P2       | Automated         | `tests/booking.negative.test.js` |
| `NEG-02`  | Negative Scenarios | Update booking without auth token returns 403         | `PUT /booking/:id`    | P1       | Automated         | `tests/booking.negative.test.js` |
| `NEG-03`  | Negative Scenarios | Delete booking with invalid auth token returns 403    | `DELETE /booking/:id` | P1       | Automated         | `tests/booking.negative.test.js` |
| `NEG-04`  | Negative Scenarios | Create booking with incomplete payload returns 500    | `POST /booking`       | P2       | Automated         | `tests/booking.negative.test.js` |
| `NEG-05`  | Negative Scenarios | Partial update booking without auth token returns 403 | `PATCH /booking/:id`  | P1       | Automated         | `tests/booking.negative.test.js` |
| `NEG-06`  | Negative Scenarios | Update non-existent booking returns 405               | `PUT /booking/:id`    | P2       | Automated         | `tests/booking.negative.test.js` |

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
- Automatic retry (`retries: 2`) for transient network issues
- Environment variables configured via `.env` and `dotenv`
- HTML and JSON test reports generated via `mochawesome`
- CI/CD integration with **GitHub Actions** and **Jenkins**

---

## Installation

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
# or
npm run test:api
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
