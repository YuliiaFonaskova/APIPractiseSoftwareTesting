const { expect } = require("chai");
const { bookingData, updatedBookingData } = require("../data/bookingData");
const authService = require("../business/services/AuthService");
const bookingService = require("../business/services/BookingService");

describe("Restful Booker API tests", function () {
  let token;
  let bookingId;

  it("should create auth token", async function () {
    const response = await authService.createToken({
      username: process.env.API_USERNAME,
      password: process.env.API_PASSWORD,
    });
    const body = await response.json();

    expect(response.status).to.equal(200);
    expect(response.headers.get("content-type")).to.include("application/json");
    expect(body).to.have.property("token");
    expect(body.token).to.be.a("string");

    token = body.token;
  });

  it("should create a booking", async function () {
    const response = await bookingService.createBooking(bookingData);
    const body = await response.json();

    expect(response.status).to.equal(200);
    expect(response.headers.get("content-type")).to.include("application/json");
    expect(body).to.have.property("bookingid");
    expect(body.booking).to.deep.equal(bookingData);

    bookingId = body.bookingid;
  });

  it("should get created booking by id", async function () {
    const response = await bookingService.getBookingById(bookingId);
    const body = await response.json();

    expect(response.status).to.equal(200);
    expect(response.headers.get("content-type")).to.include("application/json");
    expect(body.firstname).to.equal(bookingData.firstname);
    expect(body.lastname).to.equal(bookingData.lastname);
    expect(body.totalprice).to.equal(bookingData.totalprice);
    expect(body.depositpaid).to.equal(bookingData.depositpaid);
  });

  it("should update created booking", async function () {
    const response = await bookingService.updateBooking(
      bookingId,
      updatedBookingData,
      token
    );

    const body = await response.json();

    expect(response.status).to.equal(200);
    expect(response.headers.get("content-type")).to.include("application/json");
    expect(body).to.deep.equal(updatedBookingData);
  });

  it("should delete created booking", async function () {
    const response = await bookingService.deleteBooking(bookingId, token);
    const body = await response.text();

    expect(response.status).to.equal(201);
    expect(response.headers.get("content-type")).to.include("text/plain");
    expect(body).to.equal("Created");
  });
});
