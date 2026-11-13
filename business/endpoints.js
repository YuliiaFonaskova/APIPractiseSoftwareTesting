const endpoints = {
  auth: "/auth",
  booking: "/booking",
  bookingById: (id) => `/booking/${id}`,
  ping: "/ping",
};

module.exports = endpoints;
