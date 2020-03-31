# http-client

HTTP client for Allied REST api.

Public / Private Key Required.

## Usage

```js
const config = {
  publicKey: 'PUBLICKEY',
  privateKey: 'PRIVATEKEY',
  api: 'https://api.demo.alliedpayment.com',
  domain: 'ALLIED',
  username: 'support',
  onBehalfOf: undefined, // optional
  useProxy: true,
  proxy: {
    host: 'localhost',
    port: 8888,
    protocol: 'http'
  }
};

const HttpClient = require('@alliedpayment/http-client');
const client = new HttpClient(config);

const main = async () => {
  try {
    const res = await client.get('url/to/resource');
    console.log(`response status code ${res.status}`);
    return res.data; // response body
  } catch (error) {
    console.log('failed to get version', error);
  }
};

main();
```
