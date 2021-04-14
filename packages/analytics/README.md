## Analytics

## Install via yarn

```sh
yarn add analytics -S
```

## How to use

```jsx
/* example file src/analytics.js */
import Analytics from '@bna/analytics';
import umamiPlugin from '@bna/analytics-plugin-umami';

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
