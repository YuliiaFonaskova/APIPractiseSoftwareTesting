const authService = require("../business/services/AuthService");
const bookingService = require("../business/services/BookingService");
const bookings = require("../fixtures/bookings.json");

async function getToken() {
  const response = await authService.createToken({
    username: process.env.API_USERNAME,
    password: process.env.API_PASSWORD,
  });
  const body = await response.json();
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
