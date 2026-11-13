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

  async createBooking(bookingData) {
    return this.post(endpoints.booking, bookingData);
  }

  async updateBooking(bookingId, updatedBookingData, token) {
    const headers = token ? { Cookie: `token=${token}` } : {};
    return this.put(
      endpoints.bookingById(bookingId),
      updatedBookingData,
      headers
    );
  }

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
