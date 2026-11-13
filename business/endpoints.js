const endpoints = {
  auth: "/auth",
  booking: "/booking",
  bookingById: (id) => `/booking/${id}`,
};

module.exports = endpoints;
