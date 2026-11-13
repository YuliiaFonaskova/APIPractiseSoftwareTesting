# Test Cases & Coverage Documentation

Application Under Test (AUT): **Restful Booker API** (`https://restful-booker.herokuapp.com`)

---

## 1. Coverage Matrix

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

## 2. Detailed Test Cases

### Suite 1: Authentication (`tests/auth.test.js`)

#### `AUTH-01` — Successful token creation with valid credentials

- **Priority:** P1 (Critical)
- **Automation Status:** Automated (`tests/auth.test.js`)
- **Preconditions:** Valid `API_USERNAME` and `API_PASSWORD` are configured in `.env`.

**Steps:**

| #   | Action                                                      | Expected result                                                                              |
| :-- | :---------------------------------------------------------- | :------------------------------------------------------------------------------------------- |
| 1   | Send `POST /auth` request with valid username and password. | Response status code is `200 OK`.                                                            |
| 2   | Verify response headers and JSON body.                      | `Content-Type` includes `application/json`; body contains non-empty string property `token`. |

---

#### `AUTH-02` — Token creation fails with invalid password

- **Priority:** P1 (High)
- **Automation Status:** Automated (`tests/auth.test.js`)
- **Preconditions:** Invalid password fixture (`fixtures/users.json` → `invalidPassword`).

**Steps:**

| #   | Action                                                            | Expected result                                                      |
| :-- | :---------------------------------------------------------------- | :------------------------------------------------------------------- |
| 1   | Send `POST /auth` request with valid username and wrong password. | Response status code is `200 OK` (per Restful Booker specification). |
| 2   | Inspect JSON response body.                                       | Body does not contain `token`; `reason` equals `"Bad credentials"`.  |

---

#### `AUTH-03` — Token creation fails with non-existent username

- **Priority:** P2 (Medium)
- **Automation Status:** Automated (`tests/auth.test.js`)
- **Preconditions:** Non-existent username fixture (`fixtures/users.json` → `invalidUsername`).

**Steps:**

| #   | Action                                                | Expected result                                                     |
| :-- | :---------------------------------------------------- | :------------------------------------------------------------------ |
| 1   | Send `POST /auth` request with unregistered username. | Response status code is `200 OK`.                                   |
| 2   | Inspect JSON response body.                           | Body does not contain `token`; `reason` equals `"Bad credentials"`. |

---

#### `AUTH-04` — Token creation fails with empty credentials

- **Priority:** P2 (Medium)
- **Automation Status:** Automated (`tests/auth.test.js`)
- **Preconditions:** Empty strings for username and password (`fixtures/users.json` → `emptyCredentials`).

**Steps:**

| #   | Action                                                          | Expected result                                                     |
| :-- | :-------------------------------------------------------------- | :------------------------------------------------------------------ |
| 1   | Send `POST /auth` request with empty `username` and `password`. | Response status code is `200 OK`.                                   |
| 2   | Inspect JSON response body.                                     | Body does not contain `token`; `reason` equals `"Bad credentials"`. |

---

### Suite 2: Booking CRUD Operations (`tests/booking.crud.test.js`)

#### `BKG-01` — Create a new booking with valid data

- **Priority:** P1 (Critical)
- **Automation Status:** Automated (`tests/booking.crud.test.js`)
- **Preconditions:** Valid booking payload in `fixtures/bookings.json` (`validBooking`).

**Steps:**

| #   | Action                                                      | Expected result                                                             |
| :-- | :---------------------------------------------------------- | :-------------------------------------------------------------------------- |
| 1   | Send `POST /booking` with `validBooking` payload.           | Response status is `200 OK` and `Content-Type` includes `application/json`. |
| 2   | Verify `bookingid` and nested `booking` object in response. | `bookingid` is a number; `booking` object deeply equals `validBooking`.     |

---

#### `BKG-02` — Get created booking details by ID

- **Priority:** P1 (Critical)
- **Automation Status:** Automated (`tests/booking.crud.test.js`)
- **Preconditions:** A booking is created in `beforeEach` hook with known `bookingId`.

**Steps:**

| #   | Action                                           | Expected result                             |
| :-- | :----------------------------------------------- | :------------------------------------------ |
| 1   | Send `GET /booking/:id` using `bookingId`.       | Response status code is `200 OK`.           |
| 2   | Compare response body with created booking data. | Response body deeply equals `validBooking`. |

---

#### `BKG-03` — Filter bookings list by firstname and lastname

- **Priority:** P2 (Medium)
- **Automation Status:** Automated (`tests/booking.crud.test.js`)
- **Preconditions:** A booking exists with known `firstname`, `lastname`, and `bookingId`.

**Steps:**

| #   | Action                                                   | Expected result                                        |
| :-- | :------------------------------------------------------- | :----------------------------------------------------- |
| 1   | Send `GET /booking?firstname=Yuliia&lastname=Fonaskova`. | Response status is `200 OK` and body is a JSON array.  |
| 2   | Search returned array for `{ bookingid }`.               | Array of booking IDs includes the created `bookingId`. |

---

#### `BKG-04` — Full update of existing booking (PUT)

- **Priority:** P1 (Critical)
- **Automation Status:** Automated (`tests/booking.crud.test.js`)
- **Preconditions:** Valid auth `token` and existing `bookingId`.

**Steps:**

| #   | Action                                                                             | Expected result                               |
| :-- | :--------------------------------------------------------------------------------- | :-------------------------------------------- |
| 1   | Send `PUT /booking/:id` with `Cookie: token=<token>` and `updatedBooking` payload. | Response status code is `200 OK`.             |
| 2   | Verify updated fields in response body.                                            | Response body deeply equals `updatedBooking`. |

---

#### `BKG-05` — Partial update of existing booking (PATCH)

- **Priority:** P2 (Medium)
- **Automation Status:** Automated (`tests/booking.crud.test.js`)
- **Preconditions:** Valid auth `token` and existing `bookingId`.

**Steps:**

| #   | Action                                                                                                  | Expected result                                                                            |
| :-- | :------------------------------------------------------------------------------------------------------ | :----------------------------------------------------------------------------------------- |
| 1   | Send `PATCH /booking/:id` with `Cookie: token=<token>` and `partialUpdate` (`firstname`, `totalprice`). | Response status code is `200 OK`.                                                          |
| 2   | Verify modified and unchanged fields.                                                                   | `firstname` and `totalprice` are updated; other fields (e.g. `lastname`) remain unchanged. |

---

#### `BKG-06` — Delete existing booking and verify 404 on subsequent GET

- **Priority:** P1 (Critical)
- **Automation Status:** Automated (`tests/booking.crud.test.js`)
- **Preconditions:** Valid auth `token` and existing `bookingId`.

**Steps:**

| #   | Action                                                   | Expected result                                                |
| :-- | :------------------------------------------------------- | :------------------------------------------------------------- |
| 1   | Send `DELETE /booking/:id` with `Cookie: token=<token>`. | Response status code is `201 Created` and body is `"Created"`. |
| 2   | Send `GET /booking/:id` for the deleted `bookingId`.     | Response status code is `404 Not Found`.                       |

---

### Suite 3: Negative Scenarios (`tests/booking.negative.test.js`)

#### `NEG-01` — Get non-existent booking by ID returns 404

- **Priority:** P2 (Medium)
- **Automation Status:** Automated (`tests/booking.negative.test.js`)
- **Preconditions:** None.

**Steps:**

| #   | Action                                          | Expected result                                       |
| :-- | :---------------------------------------------- | :---------------------------------------------------- |
| 1   | Send `GET /booking/999999999` for a missing ID. | Response status is `404 Not Found`, text `Not Found`. |

---

#### `NEG-02` — Update booking without auth token returns 403

- **Priority:** P1 (High)
- **Automation Status:** Automated (`tests/booking.negative.test.js`)
- **Preconditions:** An existing `bookingId`.

**Steps:**

| #   | Action                                                    | Expected result                                       |
| :-- | :-------------------------------------------------------- | :---------------------------------------------------- |
| 1   | Send `PUT /booking/:id` with a body but without `Cookie`. | Response status is `403 Forbidden`, text `Forbidden`. |

---

#### `NEG-03` — Delete booking with invalid auth token returns 403

- **Priority:** P1 (High)
- **Automation Status:** Automated (`tests/booking.negative.test.js`)
- **Preconditions:** An existing `bookingId`.

**Steps:**

| #   | Action                                                             | Expected result                                       |
| :-- | :----------------------------------------------------------------- | :---------------------------------------------------- |
| 1   | Send `DELETE /booking/:id` with `Cookie: token=invalid_token_123`. | Response status is `403 Forbidden`, text `Forbidden`. |

---

#### `NEG-04` — Create booking with incomplete payload returns 500

- **Priority:** P2 (Medium)
- **Automation Status:** Automated (`tests/booking.negative.test.js`)
- **Preconditions:** Incomplete booking object (`fixtures/bookings.json` → `invalidBooking`).

**Steps:**

| #   | Action                                                 | Expected result                                                               |
| :-- | :----------------------------------------------------- | :---------------------------------------------------------------------------- |
| 1   | Send `POST /booking` with `{ "firstname": "Yuliia" }`. | Response status is `500 Internal Server Error`, text `Internal Server Error`. |

---

#### `NEG-05` — Partial update booking without auth token returns 403

- **Priority:** P1 (High)
- **Automation Status:** Automated (`tests/booking.negative.test.js`)
- **Preconditions:** An existing `bookingId`; `partialUpdate` payload (`fixtures/bookings.json`).

**Steps:**

| #   | Action                                                      | Expected result                                       |
| :-- | :---------------------------------------------------------- | :---------------------------------------------------- |
| 1   | Send `PATCH /booking/:id` with a body but without `Cookie`. | Response status is `403 Forbidden`, text `Forbidden`. |

---

#### `NEG-06` — Update non-existent booking returns 405

- **Priority:** P2 (Medium)
- **Automation Status:** Automated (`tests/booking.negative.test.js`)
- **Preconditions:** Valid auth `token`.

**Steps:**

| #   | Action                                                                       | Expected result                                                         |
| :-- | :--------------------------------------------------------------------------- | :---------------------------------------------------------------------- |
| 1   | Send `PUT /booking/999999999` with `Cookie: token=<token>` and a valid body. | Response status is `405 Method Not Allowed`, text `Method Not Allowed`. |

---

## 3. Known Issues and Gaps

1. **Public Demo API Specifics:**
   - Restful Booker returns `200 OK` (instead of `401 Unauthorized`) on failed authentication with `{"reason": "Bad credentials"}`.
   - `DELETE /booking/:id` returns `201 Created` (instead of `200 OK` or `204 No Content`).
   - Missing required fields in `POST /booking` trigger `500 Internal Server Error` instead of `400 Bad Request`.
   - `PUT` for a non-existent booking returns `405 Method Not Allowed` instead of `404 Not Found`.
2. **Shared Public State:**
   - The database at `https://restful-booker.herokuapp.com` is shared publicly and resets every 10 minutes. Each test creates its own booking in `before`/`beforeEach` hooks and removes it afterwards to avoid collisions.

---

## 4. What to Automate Next

1. **Date Range Filtering:**
   - Cover `GET /booking?checkin=...&checkout=...` query parameters.
2. **Alternative Auth Header:**
   - Cover `Authorization: Basic YWRtaW46cGFzc3dvcmQxMjM=` header in addition to `Cookie: token=<token>`.
3. **Invalid Data Types:**
   - Check API behaviour for wrong field types (e.g. `totalprice: "abc"`).
