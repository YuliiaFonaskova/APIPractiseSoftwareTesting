const { expect } = require("chai");
const authService = require("../business/services/AuthService");
const users = require("../fixtures/users.json");
const messages = require("../fixtures/messages.json");

describe("Authentication API", function () {
  it("AUTH-01 Successful token creation with valid credentials", async function () {
    const response = await authService.createToken({
      username: process.env.API_USERNAME,
      password: process.env.API_PASSWORD,
    });
    const body = await response.json();

    expect(response.status).to.equal(200);
    expect(response.headers.get("content-type")).to.include("application/json");
    expect(body).to.have.property("token");
    expect(body.token).to.be.a("string").and.not.be.empty;
  });

  it("AUTH-02 Token creation fails with invalid password", async function () {
    const response = await authService.createToken(users.invalidPassword);
    const body = await response.json();

    expect(response.status).to.equal(200);
    expect(body).to.not.have.property("token");
    expect(body.reason).to.equal(messages.badCredentials);
  });

  it("AUTH-03 Token creation fails with non-existent username", async function () {
    const response = await authService.createToken(users.invalidUsername);
    const body = await response.json();

    expect(response.status).to.equal(200);
    expect(body).to.not.have.property("token");
    expect(body.reason).to.equal(messages.badCredentials);
  });

  it("AUTH-04 Token creation fails with empty credentials", async function () {
    const response = await authService.createToken(users.emptyCredentials);
    const body = await response.json();

    expect(response.status).to.equal(200);
    expect(body).to.not.have.property("token");
    expect(body.reason).to.equal(messages.badCredentials);
  });
});
