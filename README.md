# Investec Auth Library

A simple login type component which assists with the Authentication flow for the Investec Programmable Banking API.

![Example](/docs/Example_Auth.png)

You will need to have your Investec API keys at hand.
Specifically, your client ID, client secret and API key. You can learn more about getting your Investec API keys in the [Quick Start Quide](https://offerzen.gitbook.io/programmable-banking-community-wiki/developer-tools/quick-start-guide#how-to-get-your-api-keys).

## 🔑 Getting Started

### Installing

``` bash
npm install investec-auth-library
```

### Example

``` javascript
import { Auth } from 'investec-auth-library';

<Auth
  url='page-to-redirect-to'
  buttonColor='blue'
  buttonText='Login'
  buttonTextColor='white'
/>

```
Note: The form uses Tailwindcss for styling, so you will need to include [Tailwindcss](https://tailwindcss.com/docs/installation) in your project.

### Proxy Server

The auth component form makes a POST request to the Investec Auth Endpoint which is done via a proxy. See the below example of using a proxy with Vite which can be added to your `vite.config.js` or `vite.config.ts` file.

``` javascript
server: {
  proxy: {
    '/api': {
      target: 'https://openapi.investec.com/identity',
      rewrite: path => path.replace('/api', ''),
      changeOrigin: true,
      secure: false,
      ws: true,
    }
  }
}
```

## 🧑‍💻 Contributions

Pull requests and changes are welcome.

## 📄 License

This project is MIT licensed.
