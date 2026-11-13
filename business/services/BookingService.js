const BaseApiClient = require("../../core/BaseApiClient");
const endpoints = require("../endpoints");

class BookingService extends BaseApiClient {
  async getBookings(queryParams = "") {
    const query = queryParams
      ? `?${new URLSearchParams(queryParams).toString()}`
      : "";
    return this.get(`${endpoints.booking}${query}`);
  }

  async getBookingById(bookingId) {
    return this.get(endpoints.bookingById(bookingId));
  }

  // No token needed: anyone can create a booking
  async createBooking(bookingData) {
    return this.post(endpoints.booking, bookingData);
  }

  // PUT
  async updateBooking(bookingId, updatedBookingData, token) {
    const headers = token ? { Cookie: `token=${token}` } : {};
    return this.put(
      endpoints.bookingById(bookingId),
      updatedBookingData,
      headers
    );
  }

  // PATCH
  async partialUpdateBooking(bookingId, partialData, token) {
    const headers = token ? { Cookie: `token=${token}` } : {};
    return this.patch(endpoints.bookingById(bookingId), partialData, headers);
  }

  async deleteBooking(bookingId, token) {
    const headers = token ? { Cookie: `token=${token}` } : {};
    return this.delete(endpoints.bookingById(bookingId), headers);
  }
}

module.exports = new BookingService();
