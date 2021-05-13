## Analytics

## Install via yarn

```sh
yarn add analytics -S
```

## How to use

```jsx
/* example file src/analytics.js */
import Analytics from '@binance-chain/analytics';
import umamiPlugin from '@binance-chain/analytics-plugin-umami';

const analytics = Analytics({
  app: 'your-app-name',
  plugins: [
    // ... your analytics integrations
    umamiPlugin({
      id: '',
      reportUri: '',
    });
  ],
});

/* export the instance for usage in your app */
export default analytics;
```
