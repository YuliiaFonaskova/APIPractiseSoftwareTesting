class BaseApiClient {
  constructor(
    baseUrl = process.env.BASE_URL || "https://restful-booker.herokuapp.com"
  ) {
    this.baseUrl = baseUrl;
    this.defaultHeaders = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
  }

  async request(endpoint, options = {}) {
    const { method = "GET", headers = {}, body } = options;

    const config = {
      method,
      headers: {
        ...this.defaultHeaders,
        ...headers,
      },
    };

    if (body !== undefined) {
      config.body = JSON.stringify(body);
    }

    return fetch(`${this.baseUrl}${endpoint}`, config);
  }

  async get(endpoint, headers = {}) {
    return this.request(endpoint, { method: "GET", headers });
  }

  async post(endpoint, body, headers = {}) {
    return this.request(endpoint, { method: "POST", body, headers });
  }

  async put(endpoint, body, headers = {}) {
    return this.request(endpoint, { method: "PUT", body, headers });
  }

  async patch(endpoint, body, headers = {}) {
    return this.request(endpoint, { method: "PATCH", body, headers });
  }

  async delete(endpoint, headers = {}) {
    return this.request(endpoint, { method: "DELETE", headers });
  }
}

module.exports = BaseApiClient;
