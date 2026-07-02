const bookingData = {
  firstname: "Yuliia",
  lastname: "Fonaskova",
  totalprice: 150,
  depositpaid: true,
  bookingdates: {
    checkin: "2026-07-01",
    checkout: "2026-07-05",
  },
  additionalneeds: "Breakfast",
};

const updatedBookingData = {
  firstname: "Asya",
  lastname: "Fonaskova",
  totalprice: 250,
  depositpaid: false,
  bookingdates: {
    checkin: "2026-08-01",
    checkout: "2026-08-05",
  },
  additionalneeds: "Dinner",
};

module.exports = {
  bookingData,
  updatedBookingData,
};
