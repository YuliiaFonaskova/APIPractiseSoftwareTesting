const { expect } = require("chai");
const bookingService = require("../business/services/BookingService");
const {
  getToken,
  createBooking,
  deleteBooking,
} = require("../helpers/bookingHelper");
const bookings = require("../fixtures/bookings.json");
const messages = require("../fixtures/messages.json");

describe("Booking CRUD Operations", function () {
  let token;
  let booking;
  let bookingId;
  let extraBookingIds = [];

  before(async function () {
    token = await getToken();
  });

  // Unique lastname per test, so filtering by name cannot match other bookings
  beforeEach(async function () {
    booking = { ...bookings.validBooking, lastname: `Fonaskova${Date.now()}` };
    bookingId = await createBooking(booking);
  });

  // Cleanup: delete every booking created by the test (already deleted ones are ignored)
  afterEach(async function () {
    for (const id of [bookingId, ...extraBookingIds]) {
      await deleteBooking(id, token);
    }
    extraBookingIds = [];
  });

  it("BKG-01 Create a new booking with valid data", async function () {
    const response = await bookingService.createBooking(bookings.validBooking);
    const body = await response.json();
    extraBookingIds.push(body.bookingid);

    expect(response.status).to.equal(200);
    expect(response.headers.get("content-type")).to.include("application/json");
    expect(body).to.have.property("bookingid").that.is.a("number");
    expect(body.booking).to.deep.equal(bookings.validBooking);
  });

  it("BKG-02 Get created booking details by ID", async function () {
    const response = await bookingService.getBookingById(bookingId);
    const body = await response.json();

    expect(response.status).to.equal(200);
    expect(response.headers.get("content-type")).to.include("application/json");
    expect(body).to.deep.equal(booking);
  });

  it("BKG-03 Filter bookings list by firstname and lastname", async function () {
    const response = await bookingService.getBookings({
      firstname: booking.firstname,
      lastname: booking.lastname,
    });
    const body = await response.json();

    expect(response.status).to.equal(200);
    expect(body).to.be.an("array");
    const ids = body.map((item) => item.bookingid);
    expect(ids).to.include(bookingId);
  });

  it("BKG-04 Full update of existing booking (PUT)", async function () {
    const response = await bookingService.updateBooking(
      bookingId,
      bookings.updatedBooking,
      token
    );
    const body = await response.json();

    expect(response.status).to.equal(200);
    expect(response.headers.get("content-type")).to.include("application/json");
    expect(body).to.deep.equal(bookings.updatedBooking);
  });

  it("BKG-05 Partial update of existing booking (PATCH)", async function () {
    const response = await bookingService.partialUpdateBooking(
      bookingId,
      bookings.partialUpdate,
      token
    );
    const body = await response.json();

    expect(response.status).to.equal(200);
    expect(body.firstname).to.equal(bookings.partialUpdate.firstname);
    expect(body.totalprice).to.equal(bookings.partialUpdate.totalprice);
    expect(body.lastname).to.equal(booking.lastname);
  });

  it("BKG-06 Delete existing booking and verify 404 on subsequent GET", async function () {
    const deleteResponse = await bookingService.deleteBooking(bookingId, token);
    const deleteBody = await deleteResponse.text();

    expect(deleteResponse.status).to.equal(201);
    expect(deleteBody).to.equal(messages.created);

    const getResponse = await bookingService.getBookingById(bookingId);
    expect(getResponse.status).to.equal(404);
  });
});
