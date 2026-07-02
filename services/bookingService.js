const { BASE_URL, ENDPOINTS } = require("../config/apiConfig");
const { userData } = require("../data/userData");

class BookingService {
  async createToken() {
    return fetch(`${BASE_URL}${ENDPOINTS.AUTH}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(userData),
    });
  }

  async createBooking(bookingData) {
    return fetch(`${BASE_URL}${ENDPOINTS.BOOKING}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(bookingData),
    });
  }

  async getBookingById(bookingId) {
    return fetch(`${BASE_URL}${ENDPOINTS.BOOKING_BY_ID(bookingId)}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
  }

  async updateBooking(bookingId, token, updatedBookingData) {
    return fetch(`${BASE_URL}${ENDPOINTS.BOOKING_BY_ID(bookingId)}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Cookie: `token=${token}`,
      },
      body: JSON.stringify(updatedBookingData),
    });
  }

  async deleteBooking(bookingId, token) {
    return fetch(`${BASE_URL}${ENDPOINTS.BOOKING_BY_ID(bookingId)}`, {
      method: "DELETE",
      headers: {
        Cookie: `token=${token}`,
      },
    });
  }
}

module.exports = new BookingService();
