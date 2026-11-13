const authService = require("../business/services/AuthService");
const bookingService = require("../business/services/BookingService");
const bookings = require("../fixtures/bookings.json");

async function getToken() {
  const response = await authService.createToken({
    username: process.env.API_USERNAME,
    password: process.env.API_PASSWORD,
  });
  const body = await response.json();

  // Fail fast: the API answers 200 OK with {"reason":"Bad credentials"} instead
  // of 401, so without this check every protected-endpoint test would fail with
  // a confusing 403 and hide the real cause (broken .env credentials).
  if (!body.token) {
    throw new Error(
      `Failed to obtain auth token (status ${response.status}). ` +
        `Verify API_USERNAME and API_PASSWORD in .env.`
    );
  }

  return body.token;
}

async function createBooking(data = bookings.validBooking) {
  const response = await bookingService.createBooking(data);
  const body = await response.json();
  return body.bookingid;
}

async function deleteBooking(bookingId, token) {
  await bookingService.deleteBooking(bookingId, token);
}

module.exports = { getToken, createBooking, deleteBooking };
