const BaseApiClient = require("../../core/BaseApiClient");
const endpoints = require("../endpoints");

class AuthService extends BaseApiClient {
  async createToken(credentials) {
    return this.post(endpoints.auth, credentials);
  }
}

module.exports = new AuthService();
