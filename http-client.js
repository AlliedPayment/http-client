const axios = require('axios');
const Authenticator = require('@alliedpayment/authenticator');
const log = require('@alliedpayment/colorized-logger');

class HttpClient {
  constructor(config, logging = false) {
    this.logging = logging;
    if (!config) {
      throw new Error('http client config missing');
    }
    this.opts = {
      timeout: 1000000
    };
    this.opts.proxy = config.useProxy ? config.proxy : undefined;
    this.authenticator = new Authenticator(config);
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    axios.defaults.headers.common['Accept'] = 'application/json';
  }

  setAuthHeader(url) {
    const authHeader = this.authenticator.sign(url);
    if (this.logging) log.info('setting auth headeer', authHeader);
    axios.defaults.headers.common['Authorization'] = authHeader;
  }

  get(url) {
    if (this.logging) log.info(`GET ${url}`, this.opts);
    this.setAuthHeader(url);
    return axios.get(url, this.opts);
  }

  post(url, payload) {
    if (this.logging) log.info(`POST ${url}`, payload, this.opts);
    this.setAuthHeader(url);
    return axios.post(url, payload, this.opts);
  }

  patch(url, payload) {
    if (this.logging) log.info(`PATCH ${url}`, payload, this.opts);
    this.setAuthHeader(url);
    return axios.patch(url, payload, this.opts);
  }

  put(url, payload) {
    if (this.logging) log.info(`PUT ${url}`, payload, this.opts);
    this.setAuthHeader(url);
    return axios.put(url, payload, this.opts);
  }

  delete(url) {
    if (this.logging) log.info(`DELETE ${url}`);
    this.setAuthHeader(url);
    return axios.delete(url);
  }
}

module.exports = HttpClient;
