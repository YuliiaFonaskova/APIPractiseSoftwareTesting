const BASE_URL = "https://restful-booker.herokuapp.com";

const ENDPOINTS = {
  AUTH: "/auth",
  BOOKING: "/booking",
  BOOKING_BY_ID: function (bookingId) {
    return `/booking/${bookingId}`;
  },
};
module.exports = {
  BASE_URL,
  ENDPOINTS,
};
