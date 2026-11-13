const { expect } = require("chai");
const bookingService = require("../business/services/BookingService");
const {
  getToken,
  createBooking,
  deleteBooking,
} = require("../helpers/bookingHelper");
const bookings = require("../fixtures/bookings.json");
const messages = require("../fixtures/messages.json");

describe("Booking Negative Scenarios", function () {
  let token;
  let bookingId;

  before(async function () {
    token = await getToken();
    bookingId = await createBooking();
  });

  // Cleanup: the booking is created once, so delete it at the end
  after(async function () {
    await deleteBooking(bookingId, token);
  });

  it("NEG-01 Get non-existent booking by ID returns 404", async function () {
    const response = await bookingService.getBookingById(999999999);
    const body = await response.text();

    expect(response.status).to.equal(404);
    expect(body).to.equal(messages.notFound);
  });

  it("NEG-02 Update booking without auth token returns 403", async function () {
    const response = await bookingService.updateBooking(
      bookingId,
      bookings.updatedBooking
    );
    const body = await response.text();

    expect(response.status).to.equal(403);
    expect(body).to.equal(messages.forbidden);
  });

  it("NEG-03 Delete booking with invalid auth token returns 403", async function () {
    const response = await bookingService.deleteBooking(
      bookingId,
      "invalid_token_123"
    );
    const body = await response.text();

    expect(response.status).to.equal(403);
    expect(body).to.equal(messages.forbidden);
  });

  it("NEG-04 Create booking with incomplete payload returns 500", async function () {
    const response = await bookingService.createBooking(
      bookings.invalidBooking
    );
    const body = await response.text();

    expect(response.status).to.equal(500);
    expect(body).to.equal(messages.internalServerError);
  });

  it("NEG-05 Partial update booking without auth token returns 403", async function () {
    const response = await bookingService.partialUpdateBooking(
      bookingId,
      bookings.partialUpdate
    );
    const body = await response.text();

    expect(response.status).to.equal(403);
    expect(body).to.equal(messages.forbidden);
  });

  it("NEG-06 Update non-existent booking returns 405", async function () {
    const response = await bookingService.updateBooking(
      999999999,
      bookings.updatedBooking,
      token
    );
    const body = await response.text();

    expect(response.status).to.equal(405);
    expect(body).to.equal(messages.methodNotAllowed);
  });
});
